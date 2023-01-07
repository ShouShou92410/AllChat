import { IncomingMessage } from 'http';
import { RawData, WebSocket } from 'ws';
import crypto from 'crypto';
import { uniqueNamesGenerator, adjectives, colors, animals, Config } from 'unique-names-generator';
import { putMessage, putClient, getClient } from '../deta/database.js';
import { WebSocketServerSingleton } from './WebSocketServerSingleton.js';
import type { IPayload, IChatPayload, IServerPayload } from './WebSocketServerSingleton.js';

const CHAT_CD = 10000; //10 sec

export const WebSocketSetup = async (ws: WebSocket, req: IncomingMessage) => {
	ws.isAlive = true;
	ws.lastMessageTimestamp = 0;
	ws.ip = req.socket.remoteAddress;

	// Check if client exists in DB
	const client = await getClient(ws.ip);
	if (!client) {
		ws.salt = crypto.randomBytes(16).toString('base64');
		await putClient(ws.ip, ws.salt);
	} else {
		ws.salt = client.salt;
	}

	const config: Config = {
		dictionaries: [adjectives, colors, animals],
		separator: ' ',
		seed: `${ws.ip}${ws.salt}`,
	};
	ws.name = uniqueNamesGenerator(config);

	ws.on('close', onClose);
	ws.on('message', onMessage);
	ws.on('pong', onPong);

	console.log(`${ws.name} has connected.`);
	const payload: IServerPayload = {
		message: `${ws.name} has connected.`,
	};
	WebSocketServerSingleton.getInstance().broadcast('server', payload);
};

async function onClose(this: WebSocket) {
	await putClient(this.ip, this.salt);
	console.log(`${this.name} has disconnected.`);

	const payload: IServerPayload = {
		message: `${this.name} has disconnected.`,
	};
	WebSocketServerSingleton.getInstance().broadcast('server', payload);
}

async function onMessage(this: WebSocket, data: RawData) {
	// Client is on message cooldown
	const messageCooldown = Date.now() - this.lastMessageTimestamp;
	if (messageCooldown < CHAT_CD) {
		const secondsLeft = ((CHAT_CD - messageCooldown) / 1000).toFixed(2);

		const res: IPayload<'server'> = {
			type: 'server',
			data: {
				message: `Please wait ${secondsLeft} seconds before sending another message.`,
			},
		};
		return this.send(JSON.stringify(res));
	}

	const inPayload: IChatPayload = JSON.parse(data.toString());

	// Prevent empty message
	if (inPayload.message.replace(/\n|\s/g, '') === '') {
		const res: IPayload<'server'> = {
			type: 'server',
			data: { message: `Message cannot be empty.` },
		};
		return this.send(JSON.stringify(res));
	}

	// Process client message
	const clientMessage = await putMessage(this.name, inPayload.message);
	this.lastMessageTimestamp = clientMessage.timestamp;

	const outPayload: IChatPayload = {
		timestamp: clientMessage.timestamp,
		from: this.name,
		message: clientMessage.message,
	};
	WebSocketServerSingleton.getInstance().broadcast('client', outPayload);
}

function onPong(this: WebSocket) {
	this.isAlive = true;
}

declare module 'ws' {
	export interface WebSocket {
		name: string;
		lastMessageTimestamp: number;
		ip: string;
		salt: string;
		isAlive: boolean;
	}
}

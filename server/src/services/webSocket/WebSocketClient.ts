import { IncomingMessage } from 'http';
import { RawData, WebSocket } from 'ws';
import crypto from 'crypto';
import { uniqueNamesGenerator, adjectives, colors, animals, Config } from 'unique-names-generator';
import { createMessage, putClient, getClient } from '../database.js';
import { WebSocketServerSingleton } from './WebSocketServerSingleton.js';

const CHAT_CD = 10000; //10 sec

export interface InboundPayload {
	message: string;
}

export interface OutboundPayload {
	timestamp: number;
	from: string;
	message: string;
}

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
};

async function onClose(this: WebSocket) {
	await putClient(this.ip, this.salt);
	console.log(`${this.name} has disconnected.`);
}

async function onMessage(this: WebSocket, data: RawData) {
	// Client is on message cooldown
	const messageCooldown = Date.now() - this.lastMessageTimestamp;
	if (messageCooldown < CHAT_CD) {
		const secondsLeft = ((CHAT_CD - messageCooldown) / 1000).toFixed(2);
		return this.send(`Please wait ${secondsLeft} seconds before sending another message.`);
	}

	// Process client message
	const inPayload: InboundPayload = JSON.parse(data.toString());
	const clientMessage = await createMessage(this.ip, inPayload.message);
	this.lastMessageTimestamp = clientMessage.timestamp;

	const outPayload: OutboundPayload = {
		timestamp: clientMessage.timestamp,
		from: this.name,
		message: clientMessage.message,
	};
	WebSocketServerSingleton.getInstance().broadcast(outPayload);
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

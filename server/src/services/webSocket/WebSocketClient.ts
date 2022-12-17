import { IncomingMessage } from 'http';
import { RawData, WebSocket } from 'ws';
import { uniqueNamesGenerator, adjectives, colors, animals, Config } from 'unique-names-generator';
import { createMessage } from '../database.js';
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

export const WebSocketSetup = (ws: WebSocket, req: IncomingMessage) => {
	// ClientWebSocket init
	ws.isAlive = true;
	ws.lastMessageTimestamp = 0;
	ws.ip = req.socket.remoteAddress;

	const config: Config = {
		dictionaries: [adjectives, colors, animals],
		separator: ' ',
		seed: ws.ip,
	};
	ws.name = uniqueNamesGenerator(config);

	ws.on('close', onClose);
	ws.on('message', onMessage);
	ws.on('pong', onPong);

	console.log(`${ws.name} has connected.`);
};

function onClose(this: WebSocket) {
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
		isAlive: boolean;
	}
}

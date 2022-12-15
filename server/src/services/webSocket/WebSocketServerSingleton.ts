import { IncomingMessage } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { Message } from '../../models/Message.js';
import { OutboundPayload, WebSocketSetup } from './WebSocketClient.js';

export class WebSocketServerSingleton extends WebSocketServer {
	static #instance: WebSocketServerSingleton;

	constructor(...args: any[]) {
		super(...args);

		this.on('connection', this.#onConnection);
	}

	static getInstance(...args: any[]) {
		if (!this.#instance) {
			this.#instance = new WebSocketServerSingleton(...args);
		}

		return this.#instance;
	}

	broadcast(from: string, clientMessage: Message) {
		const payload: OutboundPayload = {
			timestamp: clientMessage.timestamp,
			from: from,
			message: clientMessage.message,
		};
		WebSocketServerSingleton.getInstance().clients.forEach((client: WebSocket) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(JSON.stringify(payload));
			}
		});
	}

	#onConnection(ws: WebSocket, req: IncomingMessage) {
		WebSocketSetup(ws, req);
	}
}

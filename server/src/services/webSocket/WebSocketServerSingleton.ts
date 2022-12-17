import { IncomingMessage } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { OutboundPayload, WebSocketSetup } from './WebSocketClient.js';

const DEAD_CLIENT_CLEANER_INTERVAL = 30000; //30sec

export class WebSocketServerSingleton extends WebSocketServer {
	static #instance: WebSocketServerSingleton;
	#deadClientCleaner: NodeJS.Timer;

	constructor(...args: any[]) {
		super(...args);

		this.on('connection', this.#onConnection);
		this.on('close', this.#onClose);

		this.#deadClientCleaner = setInterval(() => {
			this.clients.forEach((client: WebSocket) => {
				if (!client.isAlive) return client.terminate();

				client.isAlive = false;
				client.ping();
			});
			console.log(this.clients.size);
		}, DEAD_CLIENT_CLEANER_INTERVAL);
	}

	static getInstance(...args: any[]) {
		if (!this.#instance) {
			this.#instance = new WebSocketServerSingleton(...args);
		}

		return this.#instance;
	}

	broadcast(payload: OutboundPayload) {
		this.clients.forEach((client: WebSocket) => {
			if (payload.from !== client.name && client.readyState === WebSocket.OPEN) {
				client.send(JSON.stringify(payload));
			}
		});
	}

	#onConnection(ws: WebSocket, req: IncomingMessage) {
		WebSocketSetup(ws, req);
	}

	#onClose(this: WebSocketServerSingleton) {
		clearInterval(this.#deadClientCleaner);
	}
}

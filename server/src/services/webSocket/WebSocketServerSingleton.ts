import { IncomingMessage } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { WebSocketSetup } from './WebSocketClient.js';

export const MAX_WEBSOCKET_CONNECTION = 10; //10 clients at once
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

	broadcast(type: keyof Omit<Payload, 'setup'>, payload: IServerPayload | IChatPayload) {
		const res = {
			type: type,
			data: payload,
		};
		this.clients.forEach((client: WebSocket) => {
			if (client.readyState === WebSocket.OPEN) client.send(JSON.stringify(res));
		});
	}

	async #onConnection(ws: WebSocket, req: IncomingMessage) {
		await WebSocketSetup(ws, req);

		const res: IPayload<'setup'> = {
			type: 'setup',
			data: { name: ws.name },
		};
		ws.send(JSON.stringify(res));
	}

	#onClose(this: WebSocketServerSingleton) {
		clearInterval(this.#deadClientCleaner);
	}
}

/**
 * setup: Contains the initial setup information
 * server: Contains varies server messages
 * client: Contains messages from other clients
 */
type Payload = {
	setup: ISetupPayload;
	server: IServerPayload;
	client: IChatPayload;
};
interface IPayload<T extends keyof Payload> {
	type: T;
	data: Payload[T];
}
type IPayloadUnion = IPayload<'setup'> | IPayload<'server'> | IPayload<'client'>;

interface ISetupPayload {
	name: string;
}
interface IServerPayload {
	message: string;
}
interface IChatPayload {
	timestamp: number;
	from: string;
	message: string;
}

export type { IPayload, ISetupPayload, IServerPayload, IChatPayload };

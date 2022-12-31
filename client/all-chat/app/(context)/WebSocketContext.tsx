'use client';

import { createContext, useEffect, useRef, useState } from 'react';

// Context
interface IChatSession {
	name: string | null;
	isConnected: boolean;
	payload: IPayloadUnion | null;
	send: ((data: string | ArrayBufferLike | Blob | ArrayBufferView) => void) | undefined;
}
const WebSocketContext = createContext<IChatSession>({
	name: null,
	isConnected: false,
	payload: null,
	send: () => {},
});

// Context provider
interface IProps {
	children: React.ReactNode;
}
const WebsocketProvider = ({ children }: IProps) => {
	const [name, setName] = useState<string | null>(null);
	const [isConnected, setIsConnected] = useState(false);
	const [payload, setPayload] = useState<IPayloadUnion | null>(null);

	const ws = useRef<WebSocket | null>(null);

	useEffect(() => {
		const socket = new WebSocket('ws://localhost:3001');

		socket.onopen = () => {
			setTimeout(() => {
				setIsConnected(true);
			}, 5000);
		};
		socket.onclose = () => {
			setIsConnected(false);
		};
		socket.onerror = () => {
			setIsConnected(false);
		};
		socket.onmessage = (e) => {
			const res: IPayloadUnion = JSON.parse(e.data);

			switch (res.type) {
				case 'setup':
					setName(res.data.name);
				case 'server':
				case 'client':
				case 'self':
					setPayload(res);
			}

			console.log(res);
		};

		ws.current = socket;

		return () => {
			socket.close();
		};
	}, []);

	return (
		<WebSocketContext.Provider
			value={{
				name: name,
				isConnected: isConnected,
				payload: payload,
				send: ws.current?.send.bind(ws.current),
			}}
		>
			{children}
		</WebSocketContext.Provider>
	);
};

export { WebSocketContext, WebsocketProvider };

/**
 * setup: Contains the initial setup information
 * server: Contains varies server messages
 * client: Contains messages from other clients
 * self: Contains message from self (Your own message)
 */
type Payload = {
	setup: ISetupPayload;
	server: IServerPayload;
	client: IChatPayload;
	self: IChatPayload;
};
interface IPayload<T extends keyof Payload> {
	type: T;
	data: Payload[T];
}
type IPayloadUnion = IPayload<'setup'> | IPayload<'server'> | IPayload<'client'> | IPayload<'self'>;

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

export type { ISetupPayload, IServerPayload, IChatPayload };

'use client';

import { createContext, useEffect, useRef, useState } from 'react';

interface IChatSession {
	isConnected: boolean;
	data: any;
	send: ((data: string | ArrayBufferLike | Blob | ArrayBufferView) => void) | undefined;
}
const WebSocketContext = createContext<IChatSession>({
	isConnected: false,
	data: null,
	send: () => {},
});

interface IProps {
	children: React.ReactNode;
}
const WebsocketProvider = ({ children }: IProps) => {
	const [isConnected, setIsConnected] = useState(false);
	const [data, setData] = useState(null);

	const ws = useRef<WebSocket | null>(null);

	useEffect(() => {
		const socket = new WebSocket('ws://localhost:3001');

		socket.onopen = () => {
			setIsConnected(true);
		};
		socket.onclose = () => {
			setIsConnected(false);
		};
		socket.onerror = () => {
			setIsConnected(false);
		};
		socket.onmessage = (e) => {
			setData(e.data);
			console.log(e.data);
		};

		ws.current = socket;

		return () => {
			socket.close();
		};
	}, []);

	return (
		<WebSocketContext.Provider
			value={{
				isConnected: isConnected,
				data: data,
				send: ws.current?.send.bind(ws.current),
			}}
		>
			{children}
		</WebSocketContext.Provider>
	);
};

export { WebSocketContext, WebsocketProvider };

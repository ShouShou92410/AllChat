'use client';

import { useCallback, useContext, useEffect, useState } from 'react';
import { IChatPayload, WebSocketContext } from '../(context)/WebSocketContext';
import MessageItem from './MessageItem';

const MessageLog = () => {
	// Message history
	const { data, isLoading, fetchMessage } = useGetMessage();
	useEffect(() => {
		fetchMessage();
	}, []);
	useEffect(() => {
		if (data && !isLoading) {
			setMessages([...messages, ...data]);
		}
	}, [data, isLoading]);
	const handleScroll = (e) => {
		const scrollPosition = e.target.scrollHeight + e.target.scrollTop - e.target.clientHeight; // Because of flex-col-reverse, scrollTop is negative

		if (scrollPosition === 0) {
			fetchMessage();
		}
	};

	// WS
	const { isConnected, payload } = useContext(WebSocketContext);
	const [messages, setMessages] = useState<IChatPayload[]>([]);
	useEffect(() => {
		if (isConnected) {
			if (payload?.type === 'client') {
				setMessages([payload.data, ...messages]);
				console.log(payload);
			}
		}
	}, [payload]);

	return (
		<div
			className="flex flex-col-reverse gap-y-10 py-5 overflow-y-auto"
			onScroll={handleScroll}
		>
			{messages.map((message: IChatPayload) => (
				<div key={message.timestamp}>
					<MessageItem {...message} />
				</div>
			))}
		</div>
	);
};

export default MessageLog;

const useGetMessage = () => {
	const [limit, setLimit] = useState(Math.ceil(window.innerHeight / 100)); // Approximating the amount of message shown on the screen
	const [last, setLast] = useState('');

	const [data, setData] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(false);

	const fetchMessage = useCallback(async () => {
		if (last !== undefined) {
			setIsLoading(true);
			setData(null);

			const res = await fetch(`http://localhost:3001/message?limit=${limit}&last=${last}`);

			if (!res.ok) {
				// This will activate the closest `error.js` Error Boundary
				throw new Error('Failed to fetch data');
			}

			const result = await res.json();

			setLast(result.last);
			setData(result.items);
			setIsLoading(false);
		}
	}, [limit, last]);

	return { data, isLoading, fetchMessage };
};

'use client';

import React, { useRef, useContext, useEffect, useState } from 'react';
import { WebSocketContext } from '../(context)/WebSocketContext';
import type { IChatPayload } from '../(context)/WebSocketContext';
import useMessage from '../(hook)/useMessage';
import JumpToLatest from './JumpToLatest';
import { MessageItem, MessageItemLoading } from './MessageItem';

const MessageLog = () => {
	// Message history
	const [limit, setLimit] = useState(0);
	const { data, error, isLoading, fetchMessage } = useMessage();
	useEffect(() => {
		const newLimit = Math.ceil(window.innerHeight / 100); // Approximating the amount of message shown on the screen
		fetchMessage(newLimit);
		setLimit(newLimit);
	}, []);
	useEffect(() => {
		if (error) throw new Error(error);
		if (data && !isLoading) {
			setMessages([...messages, ...data]);
		}
	}, [data, error, isLoading]);

	// Scroll
	const messageLogDiv = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (isLoading) {
			// Move scroll to the top to show message skeleton while loading
			messageLogDiv.current!.scrollTo({
				top: -messageLogDiv.current!.scrollHeight,
				behavior: 'smooth',
			});
		}
	}, [isLoading]);
	const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
		const scrollPosition =
			e.currentTarget.scrollHeight + e.currentTarget.scrollTop - e.currentTarget.clientHeight; // Because of flex-col-reverse, scrollTop is negative

		if (!isLoading && scrollPosition === 0) {
			fetchMessage(limit);
		}
	};

	// WS
	const { isConnected, payload } = useContext(WebSocketContext);
	const [messages, setMessages] = useState<IChatPayload[]>([]);
	useEffect(() => {
		if (isConnected && payload?.type === 'client') {
			setMessages([payload.data, ...messages]);
		}
	}, [isConnected, payload]);

	return (
		<div
			ref={messageLogDiv}
			onScroll={handleScroll}
			className="flex flex-col-reverse gap-y-10 py-5 overflow-y-auto overflow-x-hidden"
		>
			{messages.map((message: IChatPayload) => (
				<MessageItem key={message.timestamp} chatPayload={message} />
			))}
			{isLoading && (
				<>
					<MessageItemLoading />
					<MessageItemLoading />
					<MessageItemLoading />
				</>
			)}
			{messageLogDiv.current && <JumpToLatest messageLogDiv={messageLogDiv.current} />}
		</div>
	);
};

export default MessageLog;

'use client';

import { useContext, useEffect, useState } from 'react';
import { IChatPayload, WebSocketContext } from '../(context)/WebSocketContext';
import MessageItem from './MessageItem';

const MessageLog = () => {
	const handleScroll = (e) => {
		const scrollPosition = e.target.scrollHeight + e.target.scrollTop - e.target.clientHeight; // Because of flex-col-reverse, scrollTop is negative

		if (scrollPosition === 0) {
			console.log('fetech');
			e.target.scrollTop = 1000 - e.target.scrollHeight;
		}
	};

	// WS
	const { isConnected, payload } = useContext(WebSocketContext);
	const [messages, setMessages] = useState<IChatPayload[]>([]);
	useEffect(() => {
		if (isConnected) {
			if (payload?.type === 'client') {
				setMessages([...messages, payload.data]);
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

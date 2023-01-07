'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { WebSocketContext } from '../(context)/WebSocketContext';

const MessageInput = () => {
	// Form
	const formElement = useRef<HTMLFormElement>(null);
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Prevent empty message
		if (send && messageValue.replace(/\n|\s/g, '') !== '') {
			send(JSON.stringify({ message: messageValue }));
		}
	};

	// Textarea
	const [messageValue, setMessageValue] = useState('');
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
		setMessageValue(e.target.value);
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			formElement.current?.requestSubmit();
		}
	};

	// WS
	const { isConnected, name, payload, error, send } = useContext(WebSocketContext);
	useEffect(() => {
		// If submitted message made it through, clear the input textarea
		if (isConnected && payload?.type === 'client' && payload.data.from === name) {
			setMessageValue('');
		}
	}, [isConnected, payload]);

	return (
		<form ref={formElement} onSubmit={handleSubmit} className="rounded-lg mr-3 mb-2">
			<textarea
				className="text-lg p-2 outline-none resize-none w-full rounded-lg bg-slate-300 dark:bg-slate-700"
				rows={(messageValue.match(/\n/g) || []).length + 1}
				onKeyDown={handleKeyDown}
				value={isConnected ? messageValue : error!}
				onChange={handleChange}
				disabled={!isConnected}
			/>
		</form>
	);
};

export default MessageInput;

'use client';

import { useEffect, useRef, useState } from 'react';

const MessageInput = () => {
	// Form
	const formElement = useRef<HTMLFormElement>(null);
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('submit', messageValue);
		ws.current?.send(JSON.stringify({ message: messageValue }));
	};

	// Textarea
	const [messageValue, setMessageValue] = useState('');
	const handleChange = (e) => setMessageValue(e.target.value);
	const handleKeyDown = (e) => {
		if (e.keyCode === 13 && !e.shiftKey) {
			e.preventDefault();
			formElement.current?.requestSubmit();
		}
	};

	// WS
	const ws = useRef<WebSocket | null>(null);
	useEffect(() => {
		const socket = new WebSocket('ws://localhost:3001');

		socket.onopen = (e) => {
			console.log('opened', e);
		};
		socket.onclose = (e) => {
			console.log('closed', e);
		};
		socket.onerror = (e) => {
			console.error('error', e);
		};
		socket.onmessage = (e) => {
			console.log('message', e.data);
		};

		ws.current = socket;

		return () => {
			socket.close();
		};
	}, []);

	return (
		<form ref={formElement} onSubmit={handleSubmit} className="rounded-lg mr-3 mb-2">
			<textarea
				className="text-lg p-2 outline-none resize-none w-full rounded-lg bg-slate-300 dark:bg-slate-700 dark:text-slate-300"
				rows={(messageValue.match(/\n/g) || []).length + 1}
				onKeyDown={handleKeyDown}
				value={messageValue}
				onChange={handleChange}
			/>
		</form>
	);
};

export default MessageInput;

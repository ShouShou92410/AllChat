'use client';

import { useContext, useRef, useState } from 'react';
import { WebSocketContext } from '../(context)/WebSocketContext';

const MessageInput = () => {
	// Form
	const formElement = useRef<HTMLFormElement>(null);
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('submit', messageValue);
		send!(JSON.stringify({ message: messageValue }));
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
	const { send } = useContext(WebSocketContext);

	return (
		<form ref={formElement} onSubmit={handleSubmit} className="rounded-lg mr-3 mb-2">
			<textarea
				className="text-lg p-2 outline-none resize-none w-full rounded-lg bg-slate-300 dark:bg-slate-700"
				rows={(messageValue.match(/\n/g) || []).length + 1}
				onKeyDown={handleKeyDown}
				value={messageValue}
				onChange={handleChange}
			/>
		</form>
	);
};

export default MessageInput;

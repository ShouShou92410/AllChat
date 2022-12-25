'use client';

import { useRef, useState } from 'react';

const MessageInput = () => {
	// Form
	const formElement = useRef<HTMLFormElement>(null);
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('submit', messageValue);
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

	return (
		<form ref={formElement} onSubmit={handleSubmit} className="rounded-lg">
			<textarea
				className="text-lg p-2 outline-none resize-none w-full rounded-lg dark:bg-slate-700 dark:text-slate-300"
				rows={(messageValue.match(/\n/g) || []).length + 1}
				onKeyDown={handleKeyDown}
				value={messageValue}
				onChange={handleChange}
			/>
		</form>
	);
};

export default MessageInput;
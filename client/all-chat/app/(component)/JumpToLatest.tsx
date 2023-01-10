'use client';

import React, { useContext, useEffect, useState } from 'react';
import { WebSocketContext } from '../(context)/WebSocketContext';

interface IProps {
	messageLogDiv: HTMLDivElement;
}
const JumpToLatest = ({ messageLogDiv }: IProps) => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		function handleScroll(this: HTMLDivElement) {
			// Hides when scroll is at the bottom of the message log
			if (this.scrollTop === 0) {
				setShow(false);
			}
		}
		messageLogDiv.addEventListener('scroll', handleScroll);

		return () => {
			messageLogDiv.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const handleClick = (e: React.UIEvent<HTMLButtonElement>) => {
		messageLogDiv?.scrollTo({ top: 0, behavior: 'smooth' });
	};

	// WS
	const { isConnected, payload } = useContext(WebSocketContext);
	useEffect(() => {
		// New message came && not at the bottom of the message log
		if (isConnected && payload?.type === 'client' && messageLogDiv?.scrollTop !== 0) {
			setShow(true);
		}
	}, [isConnected, payload]);

	if (!show) return <></>;
	return (
		<button
			className="absolute left-0 right-0 m-auto w-10 animate-bounce"
			onClick={handleClick}
		>
			<div className="z-50 h-10 w-10 rounded-full drop-shadow flex grow items-center p-3 bg-sky-300 dark:bg-sky-700">
				<p className="w-full text-center">↓</p>
			</div>
		</button>
	);
};

export default JumpToLatest;

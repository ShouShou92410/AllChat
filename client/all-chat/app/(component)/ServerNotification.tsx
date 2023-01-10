'use client';

import { useContext, useEffect, useState } from 'react';
import { WebSocketContext } from '../(context)/WebSocketContext';

const SNACKBAR_TIMER = 3000; // 3 sec

const ServerNotification = () => {
	// WS
	const { isConnected, payload } = useContext(WebSocketContext);
	const [serverMessage, setServerMessage] = useState<string[]>([]);
	useEffect(() => {
		if (isConnected && payload?.type === 'server') {
			setServerMessage([...serverMessage, payload.data.message]);
		}
	}, [isConnected, payload]);

	// Snackbar
	const [show, setShow] = useState(false);
	useEffect(() => {
		if (serverMessage.length > 0) {
			setShow(true);

			setTimeout(() => {
				setShow(false);

				const [_, ...rest] = serverMessage; // Remove first item, which has already shown
				setServerMessage([...rest]);
			}, SNACKBAR_TIMER);
		}
	}, [serverMessage]);

	return (
		<div
			className={`absolute left-0 right-0 m-1 md:m-auto md:w-2/5 transition duration-500 ease-in-out ${
				show ? 'translate-y-14' : 'translate-y-[-100px]'
			}`}
		>
			<div className="z-50 h-14 rounded-md drop-shadow flex grow items-center p-3 bg-slate-300 dark:bg-slate-700">
				<p className="w-full text-center">{serverMessage[0]}</p>
			</div>
		</div>
	);
};

export default ServerNotification;

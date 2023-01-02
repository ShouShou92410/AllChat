'use client';

import { useContext, useEffect, useState } from 'react';
import { WebSocketContext } from '../(context)/WebSocketContext';
import Snackbar from './Snackbar';

const SNACKBAR_TIMER = 3000; // 3 sec

const ServerNotification = () => {
	// WS
	const { isConnected, payload } = useContext(WebSocketContext);
	const [serverMessage, setServerMessage] = useState<string | null>(null);
	useEffect(() => {
		if (isConnected) {
			if (payload?.type === 'server') {
				setServerMessage(payload.data.message);
				console.log(payload);
			}
		}
	}, [payload]);

	Snackbar;
	const [show, setShow] = useState(false);
	useEffect(() => {
		if (serverMessage) {
			setShow(true);

			setTimeout(() => {
				setShow(false);
				setServerMessage(null);
			}, SNACKBAR_TIMER);
		}
	}, [serverMessage]);

	return (
		<div
			className={`absolute left-0 right-0 m-auto w-2/5 transition duration-500 ease-in-out ${
				show ? 'translate-y-3' : 'translate-y-[-100px]'
			}`}
		>
			<Snackbar message={serverMessage} />
		</div>
	);
};

export default ServerNotification;

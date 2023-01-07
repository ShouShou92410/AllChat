'use client';

import React, { useContext } from 'react';
import { WebSocketContext } from '../(context)/WebSocketContext';

interface IProps {}
const Navbar = ({}: IProps) => {
	// WS
	const { name, isConnected } = useContext(WebSocketContext);

	return (
		<nav className="absolute w-screen h-12 drop-shadow dark:bg-slate-900">
			{isConnected && (
				<div className="flex h-full justify-center items-center">
					{name}
					<img
						className="w-8 h-8 rounded-full ml-2 bg-slate-300 dark:bg-slate-900"
						src={`https://avatars.dicebear.com/api/identicon/${name}.svg`}
						alt="avatar"
					/>
				</div>
			)}
		</nav>
	);
};

export default Navbar;

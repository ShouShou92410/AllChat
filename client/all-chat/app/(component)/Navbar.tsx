'use client';

import React, { useContext } from 'react';
import { ThemeContext } from '../(context)/ThemeContext';
import { WebSocketContext } from '../(context)/WebSocketContext';
import { FaSun, FaMoon } from 'react-icons/fa';

interface IProps {}
const Navbar = ({}: IProps) => {
	// Theme
	const { theme, themeToggle } = useContext(ThemeContext);

	// WS
	const { name, isConnected } = useContext(WebSocketContext);

	return (
		<nav className="absolute w-screen h-12 drop-shadow bg-slate-200 dark:bg-slate-900">
			<div className="flex h-full w-3/5 justify-between items-center m-auto p-4">
				<button onClick={themeToggle}>
					{theme === 'light' ? (
						<FaSun className="w-6 h-6" />
					) : (
						<FaMoon className="w-6 h-6" />
					)}
				</button>
				{isConnected && (
					<div className="flex items-center">
						{name}
						<img
							className="w-8 h-8 rounded-full ml-2 bg-slate-300 dark:bg-slate-900"
							src={`https://avatars.dicebear.com/api/identicon/${name}.svg`}
							alt="avatar"
						/>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;

import './(styles)/globals.css';

import { WebsocketProvider } from './(context)/WebSocketContext';
import ServerNotification from './(component)/ServerNotification';
import Navbar from './(component)/Navbar';
import { ThemeProvider } from './(context)/ThemeContext';

interface IProps {
	children: React.ReactNode;
}
export default function RootLayout({ children }: IProps) {
	return (
		<ThemeProvider>
			<head />
			<body className="min-h-screen bg-slate-200 dark:bg-slate-900 dark:text-slate-300">
				<WebsocketProvider>
					<ServerNotification />
					<Navbar />
					<main className="min-h-screen max-h-screen w-3/5 m-auto bg-slate-100 dark:bg-slate-800">
						{children}
					</main>
				</WebsocketProvider>
			</body>
		</ThemeProvider>
	);
}

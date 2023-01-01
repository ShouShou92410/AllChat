import './(styles)/globals.css';

import { WebsocketProvider } from './(context)/WebSocketContext';
import Snackbar from './(component)/Snackbar';

interface IProps {
	children: React.ReactNode;
}
export default function RootLayout({ children }: IProps) {
	return (
		<html lang="en" className="dark">
			<head />
			<body className="min-h-screen bg-slate-300 dark:bg-slate-900 dark:text-slate-300">
				<WebsocketProvider>
					<Snackbar />
					<main className="min-h-screen max-h-screen w-3/5 m-auto bg-slate-100 dark:bg-slate-800">
						{children}
					</main>
				</WebsocketProvider>
			</body>
		</html>
	);
}

import './(styles)/globals.css';

import { WebsocketProvider } from './(context)/WebSocketContext';

interface IProps {
	children: React.ReactNode;
}
export default function RootLayout({ children }: IProps) {
	return (
		<html lang="en" className="dark">
			<head />
			<body className="bg-slate-300 dark:bg-slate-900 min-h-screen">
				<WebsocketProvider>{children}</WebsocketProvider>
			</body>
		</html>
	);
}

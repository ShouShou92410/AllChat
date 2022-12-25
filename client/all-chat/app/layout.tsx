import './(styles)/globals.css';

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="dark">
			<head />
			<body className="bg-slate-300 dark:bg-slate-900 min-h-screen">{children}</body>
		</html>
	);
}

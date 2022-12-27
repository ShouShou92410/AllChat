import MessageInput from './(components)/MessageInput';
import MessageLog from './(components)/MessageLog';
import styles from './(styles)/styles.module.css';

export default function Page() {
	return (
		<main className="flex flex-col justify-end min-h-screen max-h-screen w-3/5 m-auto px-3 bg-slate-100 dark:bg-slate-800">
			<MessageLog />
			<MessageInput />
		</main>
	);
}

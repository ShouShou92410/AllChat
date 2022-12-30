import MessageInput from './(component)/MessageInput';
import MessageLog from './(component)/MessageLog';
import styles from './(styles)/styles.module.css';

export default function Page() {
	return (
		<div className="flex flex-col justify-end h-screen px-3">
			<MessageLog />
			<MessageInput />
		</div>
	);
}

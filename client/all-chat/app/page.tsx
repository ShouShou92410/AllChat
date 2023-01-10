import MessageInput from './(component)/MessageInput';
import MessageLog from './(component)/MessageLog';

export default function Page() {
	return (
		<div className="flex flex-col justify-end h-screen px-1 md:px-3 pt-14">
			<MessageLog />
			<MessageInput />
		</div>
	);
}

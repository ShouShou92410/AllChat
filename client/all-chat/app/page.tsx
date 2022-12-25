import MessageInput from './(components)/MessageInput';
import MessageLog from './(components)/MessageLog';
import styles from './(styles)/styles.module.css';

export default function Page() {
	return (
		<main className="flex flex-col justify-end min-h-screen max-h-screen w-3/5 m-auto px-3 bg-slate-100 dark:bg-slate-800">
			<MessageLog>
				<MessageItem />
				<MessageItem />
				<MessageItem />
				<MessageItem />
				<MessageItem />
				<MessageItem />
				<MessageItem />
				<MessageItem />
				<MessageItem />
				<MessageItem />
				<MessageItem />
				<MessageItem />
				<MessageItem />
				<MessageItem />
				<MessageItem />
				<MessageItem />
			</MessageLog>

			<MessageInput />
		</main>
	);
}

const MessageItem = () => {
	const date = new Date();
	return (
		<div className="flex flex-row gap-x-3 pr-5 dark:text-slate-300">
			<img className="w-16 h-16 rounded-full" src="pp.jpg" alt="" />
			<div>
				<p className="text-sm">
					<span className="text-xl font-semibold pr-2 dark:text-slate-100">User123</span>
					{date.toLocaleString()}
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius doloribus rerum
					iste, dolorem odio ipsa, accusamus animi itaque enim atque quisquam minus maxime
					magnam harum ullam ut. Deleniti, nisi molestiae!
				</p>
			</div>
		</div>
	);
};

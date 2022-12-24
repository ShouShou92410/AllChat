import styles from './(styles)/styles.module.css';

export default function Page() {
	return (
		<main>
			<List>
				<MessageItem />
				<MessageItem />
				<MessageItem />
				<MessageItem />
				<MessageItem />
			</List>
		</main>
	);
}

const List = ({ children }) => {
	return <ul>{children}</ul>;
};

const MessageItem = () => {
	const date = new Date();
	return (
		<div className="flex flex-row dark:text-slate-300">
			<img className="w-16 h-16" alt="" />
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

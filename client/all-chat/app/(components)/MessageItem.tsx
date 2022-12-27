interface IProps {
	timestamp: number;
	from: string;
	message: string;
}
const MessageItem = ({ timestamp, from, message }: IProps) => {
	const date = new Date(timestamp);
	return (
		<div className="flex flex-row gap-x-3 pr-5 dark:text-slate-300">
			<img className="w-16 h-16 rounded-full" src="pp.jpg" alt="" />
			<div>
				<p className="text-sm">
					<span className="text-xl font-semibold pr-2 dark:text-slate-100">{from}</span>
					{date.toLocaleString()}
				</p>
				<p>{message}</p>
			</div>
		</div>
	);
};

export default MessageItem;

interface IProps {
	timestamp: number;
	from: string;
	message: string;
}
const MessageItem = ({ timestamp, from, message }: IProps) => {
	const date = new Date(timestamp);

	return (
		<div className="flex flex-row gap-x-3 pr-5">
			<img
				className="w-16 h-16 rounded-full"
				src={`https://avatars.dicebear.com/api/identicon/${from}.svg`}
				alt="avatar"
			/>
			<div>
				<p className="text-xs">
					<span className="text-xl font-semibold pr-2">{from}</span>
					{date.toLocaleString()}
				</p>
				<p>{message}</p>
			</div>
		</div>
	);
};

const MessageItemLoading = () => (
	<div className="animate-pulse flex flex-row gap-x-3 pr-5">
		<div className="w-16 h-16 rounded-full dark:bg-slate-600" />
		<div className="flex flex-col grow space-y-4">
			<div className="flex space-x-4">
				<div className="w-28 h-2 bg-slate-600 rounded" />
				<div className="w-24 h-2 bg-slate-600 rounded" />
			</div>
			<div className="h-2 bg-slate-600 rounded" />
			<div className="h-2 bg-slate-600 rounded" />
		</div>
	</div>
);

export { MessageItem, MessageItemLoading };
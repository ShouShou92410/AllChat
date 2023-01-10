import type { IChatPayload } from '../(context)/WebSocketContext';

interface IProps {
	chatPayload: IChatPayload;
}
const MessageItem = ({ chatPayload }: IProps) => {
	const date = new Date(chatPayload.timestamp);
	const DTFormat = new Intl.DateTimeFormat('en-us', {
		dateStyle: 'short',
		timeStyle: 'short',
		hour12: false,
	});

	return (
		<div className="flex flex-row gap-x-2 md:gap-x-3 pr-5">
			<img
				className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-slate-200 dark:bg-slate-900"
				src={`https://avatars.dicebear.com/api/identicon/${chatPayload.from}.svg`}
				alt="avatar"
			/>
			<div>
				<p className="text-xs">
					<span className="text-base md:text-xl font-semibold pr-1 md:pr-2">
						{chatPayload.from}
					</span>
					{DTFormat.format(date)}
				</p>
				<p>{chatPayload.message}</p>
			</div>
		</div>
	);
};

const MessageItemLoading = () => (
	<div className="animate-pulse flex flex-row gap-x-2 md:gap-x-3 pr-5">
		<div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-slate-400 dark:bg-slate-600" />
		<div className="flex flex-col grow space-y-4">
			<div className="flex space-x-4">
				<div className="w-28 h-2 rounded bg-slate-400 dark:bg-slate-600" />
				<div className="w-24 h-2 rounded bg-slate-400 dark:bg-slate-600" />
			</div>
			<div className="h-2 rounded bg-slate-400 dark:bg-slate-600" />
			<div className="h-2 rounded bg-slate-400 dark:bg-slate-600" />
		</div>
	</div>
);

export { MessageItem, MessageItemLoading };

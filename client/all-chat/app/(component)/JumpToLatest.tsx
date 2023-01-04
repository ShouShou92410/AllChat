const JumpToLatest = () => {
	return (
		<div className={`absolute left-1/2 animate-bounce`}>
			<div className="z-50 h-10 w-10 rounded-full drop-shadow flex grow items-center p-3 bg-slate-300 dark:bg-sky-700">
				<p className="w-full text-center">↓</p>
			</div>
		</div>
	);
};

export default JumpToLatest;

'use client';

const MessageLog = ({ children }) => {
	const handleScroll = (e) => {
		if (e.target.scrollTop === 0) {
			console.log('fetech');
			// e.target.scrollTop = 300;
		}
	};

	return (
		<div
			className="flex flex-col gap-y-10 min-h-screen max-h-screen p-3 overflow-auto"
			onScroll={handleScroll}
		>
			{children}
		</div>
	);
};

export default MessageLog;

'use client';

const MessageLog = ({ children }) => {
	const handleScroll = (e) => {
		const scrollPosition = e.target.scrollHeight + e.target.scrollTop - e.target.clientHeight; // Because of flex-col-reverse, scrollTop is negative

		if (scrollPosition === 0) {
			console.log('fetech');
			e.target.scrollTop = 1000 - e.target.scrollHeight;
		}
	};

	return (
		<div
			className="flex flex-col-reverse gap-y-10 py-5 overflow-y-auto"
			onScroll={handleScroll}
		>
			{children}
		</div>
	);
};

export default MessageLog;

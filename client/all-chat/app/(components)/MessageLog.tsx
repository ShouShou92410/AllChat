'use client';

const MessageLog = ({ children }) => {
	const handleScroll = (e) => {
		console.log(e.target.scrollTop);
		if (e.target.scrollTop === 0) {
			console.log('fetech');
			// e.target.scrollTop = 300;
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

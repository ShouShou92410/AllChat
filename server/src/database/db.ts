const chatLog = [
	{
		timestamp: 1670994005068,
		from: 'green',
		message: 'what is your problem?',
	},
	{
		timestamp: 1670994075068,
		from: 'red',
		message: 'hello',
	},
	{
		timestamp: 1670994156151,
		from: 'blue',
		message: 'welcome',
	},
	{
		timestamp: 1670994456151,
		from: 'red',
		message: 'hello eveyone',
	},
	{
		timestamp: 1670994556151,
		from: 'blue',
		message: 'hi red',
	},
	{
		timestamp: 1670994656151,
		from: 'green',
		message: 'hi guys',
	},
	{
		timestamp: 1670994756151,
		from: 'green',
		message: 'how are you',
	},
	{
		timestamp: 1670994856151,
		from: 'red',
		message: "I'm good",
	},
	{
		timestamp: 1670994956151,
		from: 'blue',
		message: 'im blue',
	},
];

const addMessage = (from: string, message: string) => {
	const newMessage = {
		timestamp: Date.now(),
		from: from,
		message: message,
	};

	chatLog.push(newMessage);
	console.log('New message added: ', newMessage);
};

const getMessages = (timestamp: number, count: number) => {
	return chatLog
		.filter((item) => item.timestamp <= timestamp)
		.slice(-count)
		.map((item) => ({ ...item, timestamp: new Date(item.timestamp) }));
};

export { addMessage, getMessages };

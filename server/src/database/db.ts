import { RawData } from 'ws';

interface Message {
	timestamp: number;
	from: string;
	message: string;
}

const chatLog: Message[] = [
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

const addMessage = (from: string, data: RawData): Message => {
	const newMessage: Message = JSON.parse(data.toString());
	newMessage.from = from;
	newMessage.timestamp = Date.now();

	chatLog.push(newMessage);
	console.log('New message added: ', newMessage);

	return newMessage;
};

const getMessages = (timestamp: number, count: number): Message[] => {
	return chatLog.filter((item) => item.timestamp <= timestamp).slice(-count);
	// .map((item) => ({ ...item, timestamp: new Date(item.timestamp) }));
};

export { Message, addMessage, getMessages };

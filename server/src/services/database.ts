import { Deta } from 'deta';
import { Message } from '../models/Message.js';

const deta = Deta(process.env.DETA_PROJECT_KEY);
const db = deta.Base('Message');

const createMessage = async (ip: string, message: string): Promise<Message> => {
	const newMessage: Message = {
		timestamp: Date.now(),
		ip: ip,
		message: message,
	};

	const res = await db.put({ ...newMessage });
	console.log('New message created: ', res);

	return newMessage;
};

export { createMessage };

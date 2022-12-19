import { Deta } from 'deta';
import { Client } from '../models/Client.js';
import { Message } from '../models/Message.js';

const deta = Deta(process.env.DETA_PROJECT_KEY);
const messageDB = deta.Base('Message');
const clientDB = deta.Base('Client');

const createMessage = async (ip: string, message: string): Promise<Message> => {
	const newMessage: Message = {
		timestamp: Date.now(),
		ip: ip,
		message: message,
	};

	const res = await messageDB.put({ ...newMessage });
	const result: Message = JSON.parse(JSON.stringify(res));
	console.log('createMessage: ', result);

	return result;
};

const putClient = async (ip: string, salt: string): Promise<Client> => {
	const newClient: Client = {
		key: ip,
		salt: salt,
		lastOnlineTimestamp: Date.now(),
	};

	const res = await clientDB.put({ ...newClient });
	const result: Client = JSON.parse(JSON.stringify(res));
	console.log('putClient: ', result);

	return result;
};

const getClient = async (ip: string): Promise<Client> => {
	const res = await clientDB.get(ip);
	const result: Client = JSON.parse(JSON.stringify(res));
	console.log('getClient: ', result);

	return result;
};

export { createMessage, putClient, getClient };

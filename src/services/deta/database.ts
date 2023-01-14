import { Deta } from 'deta';
import { Client } from './models/Client.js';
import { Message } from './models/Message.js';

const deta = Deta(process.env.DETA_PROJECT_KEY);
const messageDB = deta.Base('Message');
const clientDB = deta.Base('Client');

const putMessage = async (from: string, message: string): Promise<Message> => {
	const now = Date.now();
	const newMessage: Message = {
		key: `${Number.MAX_SAFE_INTEGER - now}`,
		timestamp: now,
		from: from,
		message: message,
	};

	const res = await messageDB.put({ ...newMessage });
	const result: Message = JSON.parse(JSON.stringify(res));

	return result;
};

const fetchMessage = (limit: number, last: string) =>
	messageDB.fetch(null, { limit: limit, last: last });

const putClient = async (ip: string, salt: string): Promise<Client> => {
	const newClient: Client = {
		key: ip,
		salt: salt,
		lastOnlineTimestamp: Date.now(),
	};

	const res = await clientDB.put({ ...newClient });
	const result: Client = JSON.parse(JSON.stringify(res));

	return result;
};

const getClient = async (ip: string): Promise<Client> => {
	const res = await clientDB.get(ip);
	const result: Client = JSON.parse(JSON.stringify(res));

	return result;
};

export { putMessage, fetchMessage, putClient, getClient };

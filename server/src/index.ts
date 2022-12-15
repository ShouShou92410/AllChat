console.log(`NODE_ENV=${process.env.NODE_ENV}`);
console.log(`DETA_PROJECT_KEY=${process.env.DETA_PROJECT_KEY}`);
console.log(`PORT=${process.env.PORT}`);

import express from 'express';
import WebSocket, { WebSocketServer, RawData } from 'ws';
import { IncomingMessage } from 'http';
import { uniqueNamesGenerator, adjectives, colors, animals, Config } from 'unique-names-generator';
import chatRouter from './routes/chat.js';
import { Message, addMessage } from './database/db.js';
import { createMessage } from './services/database.js';

//Express
const app = express();
const port = parseInt(process.env.PORT);

app.use(express.json());
app.use('/chat', chatRouter);
const server = app.listen(port, () => {
	console.log(`Express server running on port ${port}.`);
});

//WebSocket
const CHAT_CD = 10000; //10 sec

interface ClientWebSocket extends WebSocket {
	name: string;
	lastMessageTimestamp: number;
	ip: string;
}

const wss = new WebSocketServer({ server });

wss.on('connection', (ws: ClientWebSocket, req: IncomingMessage) => {
	// ClientWebSocket init
	ws.lastMessageTimestamp = 0;
	ws.ip = req.socket.remoteAddress;

	const config: Config = {
		dictionaries: [adjectives, colors, animals],
		separator: ' ',
		seed: ws.ip,
	};
	ws.name = uniqueNamesGenerator(config);

	console.log(`${ws.name} has connected.`);

	ws.on('close', function close() {
		console.log(`${ws.name} has disconnected.`);
	});

	ws.on('message', async (data: RawData) => {
		// Client is on message cooldown
		const messageCooldown = Date.now() - ws.lastMessageTimestamp;
		if (messageCooldown < CHAT_CD) {
			const secondsLeft = ((CHAT_CD - messageCooldown) / 1000).toFixed(2);
			return ws.send(`Please wait ${secondsLeft} seconds before sending another message.`);
		}

		// Process client message
		const clientMessage = await createMessage(ws.ip, JSON.parse(data.toString()).message);
		ws.lastMessageTimestamp = clientMessage.timestamp;

		wss.clients.forEach((client: WebSocket) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(JSON.stringify(clientMessage));
			}
		});
	});
});

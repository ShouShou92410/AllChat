import express from 'express';
import WebSocket, { WebSocketServer, RawData } from 'ws';
import { IncomingMessage } from 'http';
import chatRouter from './routes/chat.js';
import { addMessage } from './database/db.js';

//Express
const app = express();
const port = 3000;

app.use('/chat', chatRouter);
const server = app.listen(port, () => {
	console.log(`Express server running on port ${port}.`);
});

//WebSocket
interface ExtWebSocket extends WebSocket {
	id: number;
}

let id = 0;
const wss = new WebSocketServer({ server });

wss.on('connection', (ws: ExtWebSocket, req: IncomingMessage) => {
	ws.id = ++id;
	console.log(`Client${ws.id} has connected.`);

	ws.on('close', function close() {
		console.log(`Client${ws.id} has disconnected.`);
	});

	ws.on('message', (data: RawData) => {
		const jsonData = JSON.parse(data.toString());
		console.log(`Client${ws.id}: ${jsonData.data}`);

		addMessage(`Client${ws.id}`, jsonData.data);

		wss.clients.forEach((client: WebSocket) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(`Client${ws.id}: ${jsonData.data}`);
			}
		});
	});
});

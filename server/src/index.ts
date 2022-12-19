console.log(`NODE_ENV=${process.env.NODE_ENV}`);
console.log(`DETA_PROJECT_KEY=${process.env.DETA_PROJECT_KEY}`);
console.log(`PORT=${process.env.PORT}`);

import express from 'express';
import chatRouter from './routes/chat.js';
import {
	WebSocketServerSingleton,
	MAX_WEBSOCKET_CONNECTION,
} from './services/webSocket/WebSocketServerSingleton.js';

//Express
const app = express();
const port = parseInt(process.env.PORT);

app.use(express.json());
app.use('/chat', chatRouter);
const server = app.listen(port, () => {
	console.log(`Express server running on port ${port}.`);
});

// server.maxConnections = 1;

server.on('upgrade', async (req, socket) => {
	// If server already has too many connections
	if (WebSocketServerSingleton.getInstance().clients.size >= MAX_WEBSOCKET_CONNECTION) {
		socket.write(
			'HTTP/1.1 503 Service Unavailable\r\n' +
				'Upgrade: WebSocket\r\n' +
				'Connection: Upgrade\r\n' +
				'\r\n'
		);
		socket.destroy();
		return;
	}

	// If already connected
	let alreadyConnected = false;
	for (const client of WebSocketServerSingleton.getInstance().clients) {
		if (client.ip === req.socket.remoteAddress) {
			alreadyConnected = true;
			break;
		}
	}

	if (alreadyConnected) {
		socket.write(
			'HTTP/1.1 409 Conflict\r\n' +
				'Upgrade: WebSocket\r\n' +
				'Connection: Upgrade\r\n' +
				'\r\n'
		);
		socket.destroy();
		return;
	}
});

//WebSocket
WebSocketServerSingleton.getInstance({ server });

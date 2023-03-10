import './config.js';

import express from 'express';
import cors from 'cors';
import messageRouter from './routes/message.js';
import {
	WebSocketServerSingleton,
	MAX_WEBSOCKET_CONNECTION,
} from './services/webSocket/WebSocketServerSingleton.js';

//Express
const app = express();
const port = parseInt(process.env.PORT);

app.use(
	cors({
		origin: '*',
	})
);
app.use(express.json());
app.use('/message', messageRouter);
const server = app.listen(port, () => {
	console.log(`Express server running on port ${port}.`);
});

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
		if (client.ip === `${req.socket.remoteAddress}:${req.socket.remotePort}`) {
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

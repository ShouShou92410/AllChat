import express from 'express';
import WebSocket, { WebSocketServer, RawData } from 'ws';
import { IncomingMessage } from 'http';

//Express
const app = express();
const router = express.Router();
const port = 3000;

// GET /info/status
router.get('/status', (req, res) => {
	res.json({ status: 'Server is running.' });
});

app.use('/info', router);
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

		wss.clients.forEach((client: WebSocket) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(`Client${ws.id}: ${jsonData.data}`);
			}
		});
	});
});

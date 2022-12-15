console.log(`NODE_ENV=${process.env.NODE_ENV}`);
console.log(`DETA_PROJECT_KEY=${process.env.DETA_PROJECT_KEY}`);
console.log(`PORT=${process.env.PORT}`);

import express from 'express';
import chatRouter from './routes/chat.js';
import { WebSocketServerSingleton } from './services/webSocket/WebSocketServerSingleton.js';

//Express
const app = express();
const port = parseInt(process.env.PORT);

app.use(express.json());
app.use('/chat', chatRouter);
const server = app.listen(port, () => {
	console.log(`Express server running on port ${port}.`);
});

//WebSocket
WebSocketServerSingleton.getInstance({ server });

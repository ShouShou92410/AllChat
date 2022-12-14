import express, { Request, Response } from 'express';
import { getMessages } from '../database/db.js';

const router = express.Router();

interface Query {
	timestamp: number;
	count: number;
}

router.get('/', (req: Request<{}, {}, {}, Query>, res: Response) => {
	const timestamp = req.query.timestamp;
	const count = req.query.count;

	console.log('timestamp: ', timestamp);
	console.log('count: ', count);

	res.json(getMessages(timestamp, count));
});

export default router;

import express, { Request, Response } from 'express';

const router = express.Router();

interface query {
	timestamp: number;
	count: number;
}

router.get('/', (req: Request<{}, {}, {}, query>, res: Response) => {
	const timestamp = req.query.timestamp;
	const count = req.query.count;

	console.log('timestamp: ', timestamp);
	console.log('count: ', count);

	res.json(chatHistory.filter((item) => item.timestamp <= timestamp).slice(-count));
});

export default router;

const chatHistory = [
	{
		timestamp: 1670994005068,
		from: 'green',
		message: 'what is your problem?',
	},
	{
		timestamp: 1670994075068,
		from: 'red',
		message: 'hello',
	},
	{
		timestamp: 1670994156151,
		from: 'blue',
		message: 'welcome',
	},
];

import express, { Request, Response } from 'express';
import { fetchMessage } from '../services/deta/database.js';

const router = express.Router();

interface Query {
	limit: string;
	last: string;
}

router.get('/', async (req: Request<unknown, unknown, unknown, Query>, res: Response) => {
	const limit = parseInt(req.query.limit);
	const last = req.query.last;

	res.json(await fetchMessage(limit, last));
});

export default router;

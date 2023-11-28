import { type Response } from 'express';

const handleHttp = (res: Response, error: string, errorRaw?: any) => {
	res.status(500);
	res.json({ error, errorRaw });
};

export { handleHttp };

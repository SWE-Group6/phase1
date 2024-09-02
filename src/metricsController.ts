import { Request, Response } from 'express';
import { Package } from './Package';

export const getMetrics = (req: Request, res: Response): void => {
    const { url, version } = req.query;

    if (typeof url !== 'string' || typeof version !== 'string') {
        res.status(400).json({ error: 'Invalid query parameters' });
        return;
    }

    const pkg = new Package(url, version);
    const metrics = pkg.getMetrics();

    res.json(metrics);
};

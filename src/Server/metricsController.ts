import { Request, Response } from 'express';
import { Package } from '../Models/Package';

export const getMetrics = (req: Request, res: Response): void => {
    //make version optional in query params
    const { url, version } = req.query;
    // print the type of url and version
    console.log(typeof url, typeof version);
    //print url and version
    console.log(url, version);

    if (typeof url !== 'string') {
        res.status(400).json({ error: 'Invalid query parameters' });
        return;
    }

    const pkg = new Package(url);
    const metrics = pkg.getMetrics();

    // return the JSON
    res.send(metrics);
};

import * as express from 'express-promise-router';
import { Request, Response } from 'express';
import { getAirports } from '../repo/airports';
import * as geoLib from 'geo-lib';
const router = express();

router.get('/airports', async (req: Request, res: Response) => {
    let data = await getAirports(req.query.query);
    res.json(data);
});

router.post('/distance', (req: Request, res: Response) => {
    let result = geoLib.distance({
        p1: req.body.from,
        p2: req.body.to
    });
    res.json(result);
});

export {
    router
};
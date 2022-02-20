import express, { Request, Response } from 'express';
import api from './api';

const router = express.Router();

router.get('/', (req: Request, res: Response): void => {
  res.send('<img src="/api/images?filename=fjord&width=200&height=200">');
});

router.use('/api', api);

export default router;

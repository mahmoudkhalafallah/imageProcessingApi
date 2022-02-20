import express, { Request, Response } from 'express';
import images from './images';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('API route');
});

router.use('/images', images);

export default router;

import express from 'express';
import images from './images';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('API route');
});

router.use('/images', images);

export default router;

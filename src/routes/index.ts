import express from 'express';
import api from './api';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('<img src="/api/images?filename=fjord&width=200&height=200">');
});

router.use('/api', api);

export default router;

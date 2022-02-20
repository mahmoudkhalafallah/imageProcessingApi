import express from 'express';
import morgan from 'morgan';
import router from './routes';

const app = express();
const port = '3000';

const middlewares = [morgan('tiny')];

app.use(middlewares);
app.use('/', router);

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});

export default app;

import express from 'express';
import morgan from 'morgan';

const app = express();
const port = '3000';

const middlewares = [morgan('tiny')];
app.use(middlewares);

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});

import supertest from 'supertest';
import app from '../../..';

describe('GET /api/images endpoint', () => {
  it('responds with 200 status code and the correct Content-Type', async () => {
    const request = await supertest(app);

    request
      .get('/api/images?filename=fjord&width=200&height=200')
      .expect('Content-Type', /image\/jpg/)
      .expect(200)
      .end(function (err) {
        if (err) throw err;
      });
  });
});

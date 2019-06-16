const expect = require("chai").expect;
const request = require('supertest');

describe('list-http', () => {
  
  const server = request('http://localhost:3000');

  describe('GET /prices', function() {

    it('responds with json', (done) => {
      server.get('/prices')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((error, result) => {
          if (error) return done(error);
          //expect(result.body).to.deep.eq();
          return done();
        });
    });
  
  });

});
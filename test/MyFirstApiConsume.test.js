const agent = require('superagent-promise')(require('superagent'), Promise);
const statusCode = require('http-status-codes');
const chai = require('chai');

const expect = chai.expect;

describe('First Api Tests', () => {

    it('Consume GET Service', () => {
        return agent.get('https://httpbin.org/ip').then((response) => {
          expect(response.status).to.equal(statusCode.OK);
          expect(response.body).to.have.property('origin');
        });
    });

    it('Consume GET Service with query parameters', () => {
        const query = {
          name: 'John',
          age: '31',
          city: 'New York'
    };
      
        return agent.get('https://httpbin.org/get')
          .query(query)
          .then((response) => {
            expect(response.status).to.equal(statusCode.OK);
            expect(response.body.args).to.eql(query);
          });
    });

    it('Consume HEAD Service', () => {
        const query = {
            Host: 'httpbin.org' 
        };

        return agent.head('https://httpbin.org/headers')        
        .query(query)
        .then(function(response) {
            expect(response.status).to.equal(statusCode.OK);
        });
    });

    it('Consume PATCH Service', () => {
        return agent.patch('https://httpbin.org/patch')               
        .then(function(response) {
            expect(response.status).to.equal(statusCode.OK);
        });
    });

    it('Consume PUT Service', () => {
        return agent.put('https://httpbin.org/put')     
        .set('Content-Type', 'application/json')
        .send('{"name":"tj","pet":"tobi"}')          
        .then(function(response) {
            expect(response.status).to.equal(statusCode.OK);
        });
    });

    it('Consume DELETE Service', () => {
        return agent.del('https://httpbin.org/delete')   
        .set('Content-Type', 'application/json')
        .send('{"name":"tj","pet":"tobi"}')          
        .then(function(response) {
            expect(response.status).to.equal(statusCode.OK);
        });
    });

});

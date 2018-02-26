const agent = require('superagent-promise')(require('superagent'), Promise);
const statusCode = require('http-status-codes');

const { expect } = require('chai');

describe('Getting repository info', () => {
  
  it('Consume GET GitHUB User Service', () => agent.get('https://api.github.com/users/victorhugojt')
   .auth('token', process.env.ACCESS_TOKEN)
   .then((response) => {
    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.name).to.equal('Victor Hugo Jimenez Torres');
    expect(response.body.company).to.equal('PSL');
    expect(response.body.location).to.equal('MEDELLIN');
    
    console.log(response.body);

    repositoriesURL = response.body.repos_url;

  }));



});

const agent = require('superagent-promise')(require('superagent'), Promise);
const statusCode = require('http-status-codes');

const { expect } = require('chai');

describe('Getting repository info', () => {
  it('Consume GET GitHUB Service', () => agent.get('https://api.github.com/users/victorhugojt')
   .auth('token', process.env.ACCESS_TOKEN)
   .then((response) => {
    expect(response.status).to.equal(statusCode.OK);
    expect(user.name).to.equal('Victor Hugo Jimenez Torres');
    expect(user.company).to.equal('PSL');
    expect(user.location).to.equal('MEDELLIN');
  }));
});

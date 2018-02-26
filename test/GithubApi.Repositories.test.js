const agent = require('superagent-promise')(require('superagent'), Promise);
const statusCode = require('http-status-codes');

const { expect } = require('chai');

describe('Getting repository info', () => {
  let repositoriesURL;
  let repoFound;
  let repositories;

  it('Consume GET GitHUB User Service', () => agent.get('https://api.github.com/users/victorhugojt')
    .auth('token', process.env.ACCESS_TOKEN)
    .then((response) => {
      expect(response.status).to.equal(statusCode.OK);
      expect(response.body.name).to.equal('Victor Hugo Jimenez Torres');
      expect(response.body.company).to.equal('PSL');
      expect(response.body.location).to.equal('MEDELLIN');

      repositoriesURL = response.body.repos_url;
    }));

  it('Consume GET GitHUB Repositories Service', () => agent.get(repositoriesURL)
    .auth('token', process.env.ACCESS_TOKEN)
    .then((response) => {
      expect(response.status).to.equal(statusCode.OK);
      repositories = response.body;
      repoFound = repositories.find(element => element.name === 'example');
      expect(repoFound.full_name).to.equal('victorhugojt/example');
      expect(repoFound.private).to.equal(false);
    }));
});

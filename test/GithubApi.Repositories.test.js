const agent = require('superagent-promise')(require('superagent'), Promise);
const binaryParser = require('superagent-binary-parser');
const statusCode = require('http-status-codes');
const fs = require('fs');

const { expect } = require('chai');

describe('Getting repository info', () => {
  let repositoriesURL;
  let repoFound;
  let repositories;
  let pathRepo;
  let repoFilesPath;

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
      pathRepo = repoFound.svn_url.concat('/archive/').concat(repoFound.default_branch).concat('.zip');
      repoFilesPath = repoFound.url.concat('/contents');
      console.log(repoFilesPath);
    }));

  it('Consume GET GitHUB .Zip Repository Service', () => agent.get(pathRepo)
    .parse(binaryParser)
    .buffer(true)
    .then((response) => {
      expect(response.status).to.equal(statusCode.OK);
      const zipBuffer = response.body;
      fs.writeFileSync('./resp.zip', zipBuffer);
      expect('Content-Type', /application\/zip/);
    }));

  it('Consume GET GitHUB Files Repository Service', () => agent.get(repoFilesPath)
    .then((response) => {
      expect(response.status).to.equal(statusCode.OK);
      const files = response.body;
      console.log(files);
    }));
});

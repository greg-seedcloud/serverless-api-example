const mochaPlugin = require('serverless-mocha-plugin');
const expect = mochaPlugin.chai.expect;
let wrapped = mochaPlugin.getWrapper('list', '/src/lambda.js', 'getPrice');

before(() => {
  process.env.IS_OFFLINE = true;
});

describe('list', () => {

  let slsOfflineProcess;

  before(async () => {
    // increase mocha timeout for this hook to allow sls offline to start
    // TODO: ideally tests should start and stop serverless FW (SLS)
    // this.timeout(30000);
    // await startSlsOffline()
  });

  after(() => {
    // stopSlsOffline();
  });

  it('should work with no arguments passed', () => {
    return wrapped.run({}).then((response) => {
      const body = JSON.parse(response.body);
      expect(response.statusCode).to.be.equal(200);
      // TODO: validate body response
    });
  });

});




// TODO: not tested yet
function startSlsOffline(done) {
  slsOfflineProcess = spawn("sls", ["offline", "start"]);
  console.log(`Serverless: Offline started with PID : ${slsOfflineProcess.pid}`);

  slsOfflineProcess.stdout.on('data', (data) => {
    if (data.includes("Offline listening on")) {
      console.log(data.toString().trim());
      done();
    }
  });
}

function stopSlsOffline() {
  slsOfflineProcess.kill();
  console.log("Serverless Offline stopped");
}

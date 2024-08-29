const { Verifier } = require('@pact-foundation/pact');
const path = require('path');
const { app, server } = require('./src/server');

describe('Pact Verification', () => {
  it('validates the expectations of UserConsumer', async () => {
    const opts = {
      provider: 'UserProvider',
      providerBaseUrl: 'http://localhost:9999',
      pactUrls: [
        path.resolve(__dirname, '../consumer/pacts/userconsumer-userprovider.json')
      ],
      publishVerificationResult: true,
      providerVersion: '1.0.0',
      providerVersionBranch: 'main'
    };

    await new Verifier(opts).verifyProvider();
    console.log('Pact Verification Complete!');
  });

  afterAll((done) => {
    server.close(() => {
      console.log('Provider service stopped');
      done();
    });
  });
});
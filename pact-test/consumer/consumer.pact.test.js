import { Pact } from '@pact-foundation/pact';
import { getUser } from './src/api';
import fs from 'fs';
import path from 'path';

process.env.API_HOST = 'http://localhost:9999';

describe('User Service', () => {
  const provider = new Pact({
    consumer: 'UserConsumer',
    provider: 'UserProvider',
    port: 9999,
    log: './pacts/logs/pact.log',
    dir: './pacts',
    logLevel: 'INFO',
  });

  beforeAll(() => provider.setup());
  afterAll(() => provider.finalize());
  afterEach(() => provider.verify());

  describe('get user', () => {
    test('user exists', async () => {
      await provider.addInteraction({
        state: 'a user exists',
        uponReceiving: 'a request for a user',
        withRequest: {
          method: 'GET',
          path: '/users/1',
          headers: {
            Accept: 'application/json, text/plain, */*',
          },
        },
        willRespondWith: {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
          body: {
            id: 1,
            name: 'Lisa',
            email: 'lisa@example.com',
            age: 30,
          },
        },
      });

      const user = await getUser(1);
      expect(user).toEqual({ id: 1, name: 'Lisa', email: 'lisa@example.com', age: 30 });
    });
  });
});

afterAll(() => {
  const pactFile = path.resolve(__dirname, './pacts/userconsumer-userprovider.json');
  const openApiFile = path.resolve(__dirname, './pacts/openapi.json');

  let openApiSpec = {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
    },
    paths: {}
  };

  if (fs.existsSync(pactFile)) {
    const pactContent = JSON.parse(fs.readFileSync(pactFile, 'utf8'));
    openApiSpec.info.title = `${pactContent.consumer.name} API`;

    pactContent.interactions.forEach(interaction => {
      const path = interaction.request.path;
      const method = interaction.request.method.toLowerCase();

      if (!openApiSpec.paths[path]) {
        openApiSpec.paths[path] = {};
      }

      openApiSpec.paths[path][method] = {
        summary: interaction.description,
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' }
          }
        ],
        responses: {
          [interaction.response.status]: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    email: { type: 'string' },
                    age: { type: 'integer' }
                  }
                }
              }
            }
          }
        }
      };
    });
  }

  fs.writeFileSync(openApiFile, JSON.stringify(openApiSpec, null, 2));
  console.log('OpenAPI document generated successfully');
});
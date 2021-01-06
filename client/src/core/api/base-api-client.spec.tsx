import fetchMock from 'fetch-mock';
import { BaseApiClient } from './base-api-client';

class TestApiClient extends BaseApiClient {
  async getTest() {
    return this.fetchApi('/test');
  }
}

const TestApi = new TestApiClient();

describe('BaseApiClient', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should add content-type to header', async () => {
    fetchMock.get('/test', {
      body: {},
      headers: { 'Content-Type': 'application/json' },
    });

    await TestApi.getTest();

    expect(fetchMock.calls()).toEqual([
      expect.arrayContaining([
        `/test`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ]),
    ]);
  });
});

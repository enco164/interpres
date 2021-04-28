export const repositoryMockFactory = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
}));

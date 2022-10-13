import { FakeMockDB } from './mockDb';

declare global {
    // eslint-disable-next-line no-var
    var _mockDb: FakeMockDB;
}

/**
 * Whenever next.js hot-reloads, a new mock DB instance was created, meaning
 * that mutations were not persisted. Putting the MockDB on the global object
 * fixes this, but that only needs to be done when we are developing locally.
 */
global._mockDb = global._mockDb || new FakeMockDB();

const getMockDb = (): FakeMockDB => {
    return global._mockDb;
};

export default getMockDb;

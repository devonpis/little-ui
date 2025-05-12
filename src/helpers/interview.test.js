import { simpleFetch } from "./simple-fetch";
import { fetchUsers, fetchWithRetry, resolveTaskOrder } from "./interview";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const originalFetch = global.fetch;

function Client() {}

beforeAll(() => {});
afterEach(() => {
  global.fetch = originalFetch; // reset after each test
  jest.clearAllMocks();
});
beforeEach(() => {});
afterAll(() => {});

describe("interview", () => {
  test("interview", async () => {
    const client = new Client();

    // console.log("response", response);
  });
});

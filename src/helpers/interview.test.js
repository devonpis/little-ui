/*
useful function:

  jest.mock("./hooks/useExampleHook");
  useExampleHook.mockReturnValueOnce({});

  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch; // reset after each test
    jest.clearAllMocks();
  });

  global.fetch = jest.fn()
    .mockRejectedValueOnce(new Error('Network error'))
    .mockRejectedValueOnce(new Error('Still failing'))
    .mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

*/
import { fetchUsers, fetchWithRetry } from "./interview";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


const originalFetch = global.fetch;

beforeAll(() => {});
afterEach(() => {
  global.fetch = originalFetch; // reset after each test
  jest.clearAllMocks();
});
beforeEach(() => {});
afterAll(() => {});

describe("fetch", () => {
  test("fetching dummy api", async () => {
    try {
      const response = await fetchUsers();
      const data = await response.json();
      expect(data.length).toEqual(10);
    } catch (err) {
      console.error(err);
    }
  });
});

describe("fetchWithRetry", () => {
  test("fetching dummy api", async () => {
    const data = await fetchWithRetry(
      "https://jsonplaceholder.typicode.com/users"
    );
    expect(data.length).toEqual(10);
  });

  test('🔁 fetchWithRetry retries and eventually succeeds', async () => {
  const mockResponse = { id: 2, name: 'retry-success' };
  global.fetch = jest.fn()
    .mockRejectedValueOnce(new Error('Network error'))
    .mockRejectedValueOnce(new Error('Still failing'))
    .mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

  const data = await fetchWithRetry('https://fake.api/users', {
    maxRetries: 3,
    delay: 10, // small delay for test
  });

  expect(global.fetch).toHaveBeenCalledTimes(3);
  expect(data).toEqual(mockResponse);
});
});

/*
useful function:

  expect(
    screen.getByText(/loading.../i)
  ).toBeInTheDocument();

  const input = screen.getByRole("textbox");

  await act(async () => {
    await userEvent.click(input);
    await userEvent.type(input, "davi");
    await delay(1100); // wait for debounce
  });

  const items = await screen.findAllByRole("listitem");
  expect(items).toHaveLength(1);

  useExampleHook.mockReturnValueOnce({});

*/
import { render, screen, act, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
// import useExampleHook from "./hooks/useExampleHook";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// jest.mock("./hooks/useExampleHook");

beforeAll(() => {});
afterEach(() => {
  cleanup();
});
beforeEach(() => {});
afterAll(() => {});

describe("app", () => {
  test("renders Atlassian heading and time", () => {
    // useExampleHook.mockReturnValueOnce({});
    render(<App />);

    // Check the heading is present
    const heading = screen.getByText(/Atlassian Coding Interview Environment/i);
    expect(heading).toBeInTheDocument();

    // Check the "Loaded at:" label is present
    const timeText = screen.getByText(/Loaded time:/i);
    expect(timeText).toBeInTheDocument();
  });
});

/*
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
*/
/*
describe("resolveTaskOrder", () => {
  test("fetching dummy api", () => {
    function shortestPathInMaze(maze) {
      const queue = [];
      const visited = new Set();
      const rows = maze.length;
      const cols = maze[0].length;
      const directions = [
        [0, 1], //go right
        [1, 0], //go down
        [0, -1], //go left
        [-1, 0], //go up
      ];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const cell = maze[row][col];
          if (cell === "S") queue.push([row, col, []]);
        }
      }
      while (queue.length > 0) {
        const currentCell = queue.shift();
        const [currentRow, currentCol, step] = currentCell;
        visited.add(`${currentRow},${currentCol}`);
        for (const direction of directions) {
          const newRow = currentRow + direction[0];
          const newCol = currentCol + direction[1];
          const newCell = [newRow, newCol];
          const newCellWithStep = [...newCell, [...step, newCell]];
          if (
            !visited.has(`${newRow},${newCol}`) && // not visited before
            newCol >= 0 &&
            newCol < cols &&
            newRow >= 0 &&
            newRow < rows // not outside the maze
          ) {
            const newValue = maze[newRow][newCol];
            if (newValue === "1") {
              queue.push(newCellWithStep);
            }
            if (newValue === "E") {
              return newCellWithStep[2];
            }
          }
        }
      }
      return [];
    }

    let maze = [
      ["S", "1", "0", "0"],
      ["0", "1", "1", "0"],
      ["0", "0", "1", "E"],
    ];
    let ans = shortestPathInMaze(maze);
    console.log("ans", ans);
    expect(ans.length).toEqual(5);

    maze = [
      ["S", "1", "0", "1"],
      ["0", "1", "1", "0"],
      ["E", "0", "1", "0"],
    ];
    ans = shortestPathInMaze(maze);
    console.log("ans", ans);
    expect(ans.length).toEqual(0);
  });
});
*/
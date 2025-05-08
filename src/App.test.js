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
import App, { filterUser } from "./App";
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


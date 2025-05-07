import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Atlassian heading and time', () => {
  render(<App />);

  // Check the heading is present
  const heading = screen.getByText(/Atlassian Coding Interview Environment/i);
  expect(heading).toBeInTheDocument();

  // Check the "Loaded at:" label is present
  const timeText = screen.getByText(/Loaded at:/i);
  expect(timeText).toBeInTheDocument();
});

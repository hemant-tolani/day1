import { render, screen } from '@testing-library/react';
import First from './First';



test('renders learn react link', () => {
  render(<First />);
  const linkElement = screen.getByText(/Hello World/i);
  expect(linkElement).toBeInTheDocument();
});

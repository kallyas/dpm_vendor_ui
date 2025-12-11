import React from 'react';
import { render } from '@testing-library/react';
import App from './App.jsx';

test('renders the app without crashing', () => {
  const { container } = render(<App />);
  expect(container).toBeInTheDocument();
});

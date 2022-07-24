import { cleanup, render, screen } from '@testing-library/react';

import FileBrowse from './FileBrowse';

afterEach(cleanup);

describe('<FileBrowse />', () => {
  it('should render button with default label', () => {
    render(<FileBrowse />);
    expect(screen.getByRole('button').textContent).toBe('Choose');
  });

  it('should render button with custom label', () => {
    render(<FileBrowse btnLabel="My Button" />);
    expect(screen.getByRole('button').textContent).toBe('My Button');
  });

  
});

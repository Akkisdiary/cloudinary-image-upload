import { render, screen } from '@testing-library/react';

import Image from './Image';

const getImageElement = (): HTMLImageElement => {
  return screen.getByTestId('raw-img');
};

describe('<Image />', () => {
  it('should render src url', () => {
    const image = 'https://example.com/img.png';
    render(<Image src={image} />);
    expect(getImageElement().src).toBe(image);
  });

  it('should render raw content', () => {
    window.URL.createObjectURL = jest.fn((f: File) => f.name);
    const image = new File([''], 'test-img', { type: 'image/png' });
    render(<Image raw={image} />);
    expect(getImageElement().src).toContain(image.name);
  });
});

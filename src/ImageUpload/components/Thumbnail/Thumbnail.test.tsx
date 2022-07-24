import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { upload400, upload500 } from '../../mocks/handlers';
import { server } from '../../mocks/server';
import ImageUploadCtx from '../../Provider/context';
import { AssetStatus } from '../../types';
import Thumbnail from './Thumbnail';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const asset = {
  status: AssetStatus.UPLOAD_READY,
  raw: new File([''], 'test-img', { type: 'image/png' }),
};

const renderThumbnailWithProvider = () => {
  render(
    <ImageUploadCtx.Provider value={{ queue: [], updateQueue: jest.fn(), uploadImg: jest.fn() }}>
      <Thumbnail index={0} asset={asset} />
    </ImageUploadCtx.Provider>
  );
};

describe('<Thumbnail />', () => {
  window.URL.createObjectURL = jest.fn((f: File) => f.name);

  it('should render raw file and its name', () => {
    renderThumbnailWithProvider();
    expect(screen.getByTestId('raw-img')).toBeInTheDocument();
    expect(screen.getByText('test-img')).toBeVisible();
  });

  it('should remove spinner on upload complete', () => {
    renderThumbnailWithProvider();
    waitFor(() => {
      expect(screen.getByRole('status')).not.toBeInTheDocument();
    });
  });

  it('should show error message', () => {
    server.use(upload400);

    renderThumbnailWithProvider();
    waitFor(() => {
      expect(screen.getByText(/internal server error/i)).toBeInTheDocument();
    });
  });
});

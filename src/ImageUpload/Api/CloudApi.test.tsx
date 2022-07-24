import CloudApi from './CloudApi';

import { server } from '../mocks/server';
import { upload400, upload500 } from '../mocks/handlers';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const createApi = () =>
  new CloudApi({
    cloudName: 'test-cloud',
    uploadPreset: 'test-preset',
  });

const img = new File([''], 'test-img', { type: 'image/png' });

describe('<cls CloudApi>', () => {
  const api = createApi();

  it('should create upload url', () => {
    const url = api.uploadEndpoint();
    expect(url).toStrictEqual('https://api.cloudinary.com/v1_1/test-cloud/image/upload');
  });

  it('should upload image', async () => {
    const successCb = jest.fn();
    const errorCb = jest.fn();

    await api.uploadImage(img, successCb, errorCb);

    expect(successCb).toHaveBeenCalled();
    expect(errorCb).not.toHaveBeenCalled();

    expect(successCb).toHaveBeenCalledWith({
      public_id: expect.any(String),
      secure_url: expect.any(String),
    });
  });

  it('should set error message on request error', async () => {
    const successCb = jest.fn();
    const errorCb = jest.fn();

    server.use(upload400);
    await api.uploadImage(img, successCb, errorCb);

    expect(successCb).not.toHaveBeenCalled();
    expect(errorCb).toHaveBeenCalledWith({
      message: expect.any(String),
    });
  });

  it('should set error message on server error', async () => {
    const successCb = jest.fn();
    const errorCb = jest.fn();

    server.use(upload500);
    await api.uploadImage(img, successCb, errorCb);

    expect(successCb).not.toHaveBeenCalled();
    expect(errorCb).toHaveBeenCalledWith({
      message: expect.any(String),
    });
  });
});

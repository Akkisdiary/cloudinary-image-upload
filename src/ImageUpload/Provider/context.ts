import { createContext, useContext } from 'react';

import { Asset, CloudAsset } from '../types';

interface IImageUploadCtx {
  queue: Asset[];
  updateQueue: (queue: Asset[]) => void;
  uploadImg: (
    f: File,
    success: (d: CloudAsset) => void,
    error: (e: { message: string }) => void
  ) => void;
}

const ImageUploadCtx = createContext<IImageUploadCtx>({
  queue: [],
  updateQueue: () => {},
  uploadImg: () => {},
});

export const useImageUpload = () => useContext(ImageUploadCtx);

export default ImageUploadCtx;

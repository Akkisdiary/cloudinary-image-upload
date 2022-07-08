import { createContext, useContext } from "react";

import { Asset, CloudAsset } from "../types";

interface IImageUploadCtx {
  queue: Asset[];
  updateQueue: (queue: Asset[]) => void;
  uploadImg: (i: File) => Promise<CloudAsset | null>;
}

const ImageUploadCtx = createContext<IImageUploadCtx>({
  queue: [],
  updateQueue: () => {},
  uploadImg: async () => null,
});

export const useImageUpload = () => useContext(ImageUploadCtx);

export default ImageUploadCtx;

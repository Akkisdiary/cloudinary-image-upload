import { Asset, AssetStatus } from "../types";

export const asReadyToUploadAsset = (_file: File): Asset => {
  return {
    status: AssetStatus.UPLOAD_READY,
    raw: _file,
  };
};

export const updateAtIndex = (idx: number, data: Asset, queue: Asset[]) => {
  const q = [...queue];
  q[idx] = data;
  return q;
};

import React, { useState } from 'react';

import CloudApi, { CloudConfig } from '../Api/CloudApi';
import { Asset, AssetStatus, CloudAsset } from '../types';
import ImageUploadCtx from './context';

const AssetManager: React.FC<{
  config: CloudConfig;
  onChange?: (assets: CloudAsset[]) => void;
  children?: React.ReactNode;
}> = ({ config, onChange, children }) => {
  const [queue, setQueue] = useState<Asset[]>([]);

  const hasAllImgsUploaded = (_queue: Asset[]) =>
    _queue.reduce(
      (acc, q) => acc && q.status === AssetStatus.UPLOAD_COMPLETE,
      true
    );

  const updateQueue = (updatedQueue: Asset[]) => {
    setQueue(updatedQueue);
    if (onChange && hasAllImgsUploaded(updatedQueue)) {
      const imgs = updatedQueue.map((q) => q.data!);
      onChange(imgs);
    }
  };

  const api = new CloudApi(config);

  return (
    <ImageUploadCtx.Provider
      value={{ queue, updateQueue, uploadImg: api.uploadImage }}
    >
      {children}
    </ImageUploadCtx.Provider>
  );
};

export default AssetManager;

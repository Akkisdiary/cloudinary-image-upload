import React from 'react';

import { CloudConfig } from './Api/CloudApi';
import FileBrowse, { IFileBrowseProps } from './components/FileBrowse';
import ThumbnailList from './components/ThumbnailList';
import AssetManager from './Provider';
import { CloudAsset } from './types';

interface IImageUploadProps extends IFileBrowseProps {
  config: CloudConfig;
  onUpload?: (assets: CloudAsset[]) => void;
}

const ImageUpload: React.FC<IImageUploadProps> = ({
  config,
  onUpload,
  ...props
}) => {
  return (
    <AssetManager config={config} onChange={onUpload}>
      <div className="gap-2 p-2 border rounded bg-slate-100 border-slate-200">
        <FileBrowse {...props} />
        <ThumbnailList />
      </div>
    </AssetManager>
  );
};

export default ImageUpload;

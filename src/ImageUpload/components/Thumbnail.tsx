import classNames from "classnames";
import React, { useEffect, useState } from "react";

import { useImageUpload } from "../Provider";
import { Asset, AssetStatus } from "../types";
import { Image } from "./core";
import { Spinner } from "./icons";
import X from "./icons/X";

const updateAtIndex = (queue: Asset[], ast: Asset, idx: number) => {
  const newQ = [...queue];
  newQ[idx] = ast;
  return newQ;
};

interface IThumbnailProps {
  index: number;
  asset: Asset;
  size?: "sm" | "md" | "lg";
  rounded?: boolean;
}

const Thumbnail: React.FC<IThumbnailProps> = ({
  index,
  asset,
  size = "md",
  rounded = true,
}) => {
  const { queue, uploadImg, updateQueue } = useImageUpload();
  const [errMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (asset.status === AssetStatus.UPLOAD_READY) {
      asset.status = AssetStatus.UPLOAD_IN_PROGRESS;
      updateQueue(updateAtIndex(queue, asset, index));
      uploadImg(asset.raw!).then((d) => {
        if (d) {
          if (d.error) {
            asset.status = AssetStatus.UPLOAD_FAILED;
            setErrorMsg(d.error.message);
          } else {
            asset.status = AssetStatus.UPLOAD_COMPLETE;
            asset.data = d;
          }
          updateQueue(updateAtIndex(queue, asset, index));
        }
      });
    }
  }, [asset, index, uploadImg, queue, updateQueue]);

  const removeImg = () => {
    const q = [...queue];
    q.splice(index, 1);
    updateQueue(q);
  };

  const title = asset.raw?.name;
  const isUploading = asset.status === AssetStatus.UPLOAD_IN_PROGRESS;
  const _class = classNames(
    "relative overflow-hidden shadow-md bg-slate-300",
    {
      "w-48 h-30 rounded-sm": size === "sm",
      "w-64 h-40 rounded-md": size === "md",
      "w-82 h-50 rounded-lg": size === "lg",
    },
    { rounded: rounded }
  );

  return (
    <div className={_class}>
      <Image className="inline object-cover" raw={asset.raw} />
      <div className="absolute top-0 left-0 w-full h-full bg-gray-900/50">
        <div className="flex justify-between p-2">
          <p className="mb-auto truncate text-slate-100">{title}</p>
          <button
            onClick={removeImg}
            className="rounded text-slate-100 hover:text-slate-800 hover:bg-white"
          >
            <X />
          </button>
        </div>
      </div>
      {isUploading ? (
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 z-1 top-1/2 left-1/2">
          <Spinner />
        </div>
      ) : null}

      {errMsg ? (
        <div className="absolute bottom-0 left-0 p-2">
          <p className="text-sm text-red-500">{errMsg}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Thumbnail;

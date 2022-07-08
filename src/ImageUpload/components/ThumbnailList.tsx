import React from "react";

import { useImageUpload } from "../Provider";
import { Thumbnail } from "./";

const ThumbnailList: React.FC<{}> = (_) => {
  const { queue } = useImageUpload();

  return (
    <div className="flex flex-wrap items-center gap-2">
      {queue.map((asset, idx) => (
        <Thumbnail key={idx} index={idx} asset={asset} />
      ))}
    </div>
  );
};

export default ThumbnailList;

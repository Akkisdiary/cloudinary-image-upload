import React, { useRef, useState } from 'react';

import { useImageUpload } from '../../Provider';
import { asReadyToUploadAsset } from '../../utils';

export interface IFileBrowseProps extends React.HTMLAttributes<HTMLInputElement> {
  btnLabel?: string;
  maxFiles?: number;
}

const FileBrowse: React.FC<IFileBrowseProps> = ({ btnLabel = 'Choose', maxFiles = 1 }) => {
  const { queue, updateQueue } = useImageUpload();

  const imageInputRef: React.LegacyRef<HTMLInputElement> = useRef(null);
  const [errorMsg, setErrorMsg] = useState('');

  const addToQueue = (e: React.FormEvent<HTMLInputElement>) => {
    const chosenFiles = e.currentTarget.files;
    if (chosenFiles) {
      const newLocal = queue.length + chosenFiles.length <= maxFiles;
      if (newLocal) {
        const newQueue = [...queue, ...Array.from(chosenFiles).map(asReadyToUploadAsset)];
        updateQueue(newQueue);
      } else {
        setErrorMsg(`Cannot add more than ${maxFiles} file(s)`);
      }
    }
  };

  const openFileBrowse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (queue.length < maxFiles) {
      setErrorMsg('');
      imageInputRef.current?.click();
    } else {
      setErrorMsg(`Cannot add more than ${maxFiles} files`);
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <button
          className="px-2 py-1 font-bold rounded text-sky-500 hover:bg-slate-200"
          role="button"
          onClick={openFileBrowse}
        >
          {btnLabel}
        </button>
        {errorMsg ? (
          <p className="text-sm font-medium first-line:text-red-500">{errorMsg}</p>
        ) : null}
      </div>
      <input
        type="file"
        ref={imageInputRef}
        className="hidden"
        onChange={addToQueue}
        accept="image/png, image/jpeg"
        multiple={maxFiles > 1}
      />
    </div>
  );
};

export default FileBrowse;

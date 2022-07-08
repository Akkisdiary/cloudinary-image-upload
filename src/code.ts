export const basicExample = `import React, { useState } from "react";

import ImageUpload from "./ImageUpload";
import { CloudAsset } from "./ImageUpload/types";

interface IForm {
  maxFiles: number;
  cloudName: string;
  uploadPreset: string;
}

const App: React.FC<{}> = (props) => {
  const [imgUrls, setImgUrls] = useState<string[]>([]);
  const [form, setForm] = useState<IForm>({
    maxFiles: 1,
    cloudName: "your-cloud-name",
    uploadPreset: "unsigned-preset",
  });

  const onUploadHandler = (assets: CloudAsset[]) =>
    setImgUrls(assets.map((a) => a.secure_url));

  return (
    <>
      <input
        type="text"
        value={form.cloudName}
        onChange={(e) => setForm({ ...form, cloudName: e.currentTarget.value })}
      />
      <input
        type="text"
        value={form.uploadPreset}
        onChange={(e) =>
          setForm({ ...form, uploadPreset: e.currentTarget.value })
        }
      />
      <input
        type="number"
        value={form.maxFiles}
        onChange={(e) => {
          setForm({ ...form, maxFiles: parseInt(e.currentTarget.value) });
        }}
      />
      <div>
        <label htmlFor="cloudinary-img-input">Example Input</label>
        <ImageUpload
          id="cloudinary-img-input"
          config={{
            cloudName: form.cloudName,
            uploadPreset: form.uploadPreset,
          }}
          maxFiles={form.maxFiles}
          onUpload={onUploadHandler}
        />
      </div>
      <p>Uploaded Image Urls</p>
      <ul>
        {imgUrls.length ? (
          imgUrls.map((u) => (
            <li>
              <a href={u}>{u}</a>
            </li>
          ))
        ) : (
          <p>Select images to upload</p>
        )}
      </ul>
    </>
  );
};

export default App;
`
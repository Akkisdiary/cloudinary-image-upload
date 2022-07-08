import React, { useState } from "react";
import classNames from "classnames";
import { Prism } from "@mantine/prism";

import { basicExample } from "./code";
import ImageUpload from "./ImageUpload";
import { CloudAsset } from "./ImageUpload/types";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<IInputProps> = ({ label, id, ...props }) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        className="px-2 py-1 bg-white border rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-300 focus:ring-sky-100 sm:text-sm focus:ring-1"
        {...props}
      />
    </div>
  );
};

const Code: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <code className="font-mono text-sm text-sky-500">{children}</code>
);

const DEFAULT_MAXFILES = 1;

interface IForm {
  maxFiles?: number;
  cloudName?: string;
  uploadPreset?: string;
}

const App: React.FC<{}> = (_) => {
  const [showCode, setShowCode] = useState(false);
  const [imgUrls, setImgUrls] = useState<string[]>([]);
  const [form, setForm] = useState<IForm>({});

  const onUploadHandler = (assets: CloudAsset[]) => {
    setImgUrls(assets.map((a) => a.secure_url));
  };

  const config = {
    cloudName: form.cloudName || "",
    uploadPreset: form.uploadPreset || "",
  };
  return (
    <>
      <header className="border bg-slate-100 border-b-slate-200">
        <div className="container p-2 pt-4 mx-auto">
          <h2 className="text-2xl font-bold">Cloudinary Upload Input</h2>
        </div>
      </header>
      <div className="container p-2 pt-4 mx-auto">

      <p className="mb-2">
          A reusable input component that uploads the selected files to{" "}
          <a
            href="https://www.cloudinary.com/"
            className="text-indigo-600"
            target={"_blank"}
            rel="noreferrer"
          >
            Cloudinary.
          </a>
        </p>
        <table className="w-full mb-2 text-left border-collapse">
          <thead className="border-b border-slate-200 ">
            <tr>
              <th className="sticky top-0 z-10 p-0 text-sm font-semibold leading-6 text-slate-700 ">
                <div className="py-2 pr-2">
                  prop
                </div>
              </th>
              <th className="sticky top-0 z-10 p-0 text-sm font-semibold leading-6 text-slate-700 ">
                <div className="py-2 pr-2">
                  default
                </div>
              </th>
              <th className="sticky top-0 z-10 p-0 text-sm font-semibold leading-6 text-slate-700 ">
                <div className="py-2 pr-2">
                  Description
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                translate="no"
              >
                <Code>cloudName</Code>
              </td>
              <td
                translate="no"
                className="py-2 pr-2 text-xs font-medium leading-6"
              >
                -
              </td>
              <td
                translate="no"
                className="py-2 pr-2 text-xs font-medium leading-6"
              >
                Your Cloudinary account cloud name
              </td>
            </tr><tr>
              <td
                translate="no"
              >
                <Code>uploadPreset</Code>
              </td>
              <td
                translate="no"
                className="py-2 pr-2 text-xs font-medium leading-6"
              >
                -
              </td>
              <td
                translate="no"
                className="py-2 pr-2 text-xs font-medium leading-6"
              >
                The upload preset to use for uploading files to your account. Only supports unsigned uploads.
              </td>
            </tr>
            <tr>
              <td
                translate="no"
              >
                <Code>maxFiles</Code>
              </td>
              <td
                translate="no"
                className="py-2 pr-2 text-xs font-medium leading-6"
              >
                1
              </td>
              <td
                translate="no"
                className="py-2 pr-2 text-xs font-medium leading-6"
              >
                Limit the number of files to upload
              </td>
            </tr>
          </tbody>
        </table>
        <h1 className="mb-2 text-xl font-bold">Basic Example</h1>
        <hr className="mb-2" />
        <div className="flex flex-col gap-2 p-3 bg-white border rounded">
          <Input
            type="text"
            id="cloud-name"
            name="cloud-name"
            label="Cloud Name:"
            value={form.cloudName}
            onChange={(e) =>
              setForm({ ...form, cloudName: e.currentTarget.value })
            }
          />
          <Input
            id="upload-preset"
            type="text"
            name="upload-preset"
            label="Upload Preset:"
            value={form.uploadPreset}
            onChange={(e) =>
              setForm({ ...form, uploadPreset: e.currentTarget.value })
            }
          />
          <Input
            id="max-files"
            type="number"
            name="max-files"
            label="Max files:"
            min="0"
            placeholder={DEFAULT_MAXFILES.toString()}
            value={form.maxFiles}
            onChange={(e) => {
              if (e.currentTarget.value) {
                setForm({ ...form, maxFiles: parseInt(e.currentTarget.value) });
              } else {
                setForm({ ...form, maxFiles: DEFAULT_MAXFILES });
              }
            }}
          />
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="cloudinary-img-input"
                className="font-semibold text-slate-900"
              >
                Example Input
              </label>
              <button
                className="text-sm text-sky-500"
                onClick={() => setShowCode(!showCode)}
              >
                {showCode ? "Hide Code" : "Show code"}
              </button>
            </div>
            <ImageUpload
              id="cloudinary-img-input"
              config={config}
              onUpload={onUploadHandler}
              maxFiles={form.maxFiles || DEFAULT_MAXFILES}
            />
          </div>
          <div>
            <p className="font-semibold text-slate-900">Uploaded Image Urls</p>
            <ul>
              {imgUrls.length ? (
                imgUrls.map((u) => (
                  <li className="py-2 pl-2 font-mono text-xs text-indigo-600 whitespace-pre border-b border-slate-100 ">
                    <a href={u} target={"_blank"} rel="noreferrer">
                      {u}
                    </a>
                  </li>
                ))
              ) : (
                <p className="py-2 pl-2 font-mono text-xs whitespace-pre text-slate-600">
                  Select images to upload
                </p>
              )}
            </ul>
          </div>
        </div>
        <div className={classNames("mt-2", { hidden: !showCode })}>
          <Prism language="jsx" withLineNumbers>
            {basicExample}
          </Prism>
        </div>
      </div>
    </>
  );
};

export default App;

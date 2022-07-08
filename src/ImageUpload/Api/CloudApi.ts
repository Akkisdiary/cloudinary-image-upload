import { CloudAsset } from "../types";

export interface CloudConfig {
  cloudName: string;
  uploadPreset: string;
}

class CloudApi {
  cloudName: string;
  uploadPreset: string;

  constructor(config: CloudConfig) {
    this.cloudName = config.cloudName;
    this.uploadPreset = config.uploadPreset;
  }

  uploadEndpoint = (): string => {
    return `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;
  };

  uploadImage = async (img: File): Promise<CloudAsset> => {
    return await new Promise((res, rej) => {
      const form = new FormData();

      form.append("file", img);
      form.append("upload_preset", this.uploadPreset);

      try {
        fetch(this.uploadEndpoint(), {
          method: "POST",
          body: form,
        })
          .then((r) => r.json())
          .then(res);
      } catch {
        rej({
          error: {
            message: `Error uploading img <${img.name}>`,
          },
        });
      }
    });
  };
}

export default CloudApi;

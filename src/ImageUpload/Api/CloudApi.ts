import { CloudAsset } from '../types';

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

  uploadImage = async (
    img: File,
    success: (a: CloudAsset) => void,
    error: (e: { message: string }) => void
  ) => {
    const form = new FormData();
    form.append('file', img);
    form.append('upload_preset', this.uploadPreset);

    try {
      const res = await fetch(this.uploadEndpoint(), {
        method: 'POST',
        body: form,
      });
      const data = await res.json();
      if (res.ok) {
        success(data);
      } else error(data);
    } catch {
      error({ message: 'Error uploading img!' });
    }
  };
}

export default CloudApi;

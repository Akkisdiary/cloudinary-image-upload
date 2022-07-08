export enum AssetStatus {
  UPLOAD_READY,
  UPLOAD_IN_PROGRESS,
  UPLOAD_COMPLETE,
  UPLOAD_FAILED,
  DELETE_READY,
  DELETE_IN_PROGRESS,
  DELETE_COMPLETE,
  DELETE_FAILED,
}

export type CloudAsset = {
  public_id: string;
  version: string;
  width: number;
  height: number;
  format: string;
  created_at: string;
  resource_type: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  url: string;
  secure_url: string;
  signature: string;
  original_filename: string;
  error?: { message: string };
};

export interface Asset {
  status: AssetStatus;
  raw: File;
  data?: CloudAsset;
}

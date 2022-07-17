export interface MediaResponse {
  data: Media;
}

export interface Media {
  id: number;
  attributes: {
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: {
      thumbnail: MediaFormat;
      large: MediaFormat;
      medium: MediaFormat;
      small: MediaFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    url: string;
    previewUrl?: string;
    provider: string;
    provider_metadata?: any;
    createdAt: Date;
    updatedAt: Date;
  };
}
export interface MediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path?: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

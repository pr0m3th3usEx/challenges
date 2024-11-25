// API types
declare module '@okomera/api' {
  import { DATASET_NAMES } from '../types';
  interface Organoid {
    id: string;
    originalImageKey: string;
    segmentationMaskKey: string;
    maskSurface: number;
  }

  const DATASET_NAMES = ['training', 'testing', 'validation'] as const;

  type DatasetQueryValues = (typeof DATASET_NAMES)[number];

  interface GetOrganoidsRequestQuery {
    dataset: DatasetQueryValues;
  }

  interface GetOrganoidsResponse {
    items: Pick<GetOrganoidResponse, 'id'>[];
    count: number;
  }

  interface GetOrganoidRequestParams {
    id: string;
  }

  interface GetOrganoidResponse {
    id: string;
    originalImgUri: string;
    segmentationMaskUri: string;
    maskSurface: number;
    contrast: number;
    brightness: number;
  }
}

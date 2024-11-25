/**
 *
 * This script has for purpose to aggreagate datasets metadata into the databsase
 * And uploads images into GCP Blob Storage
 *
 * You should the dataset folder at the root of the repository and structured as below:
 * - {DatasetName}
 * --> images
 * --> segmentations
 *
 */

import mongoose from 'mongoose';
import { DATABASE_URL } from './config';
import { MongoOrganoidSchema, Organoid } from './organoid/adapters/mongo/schema';
import { readdir } from 'fs/promises';
import { Storage, TransferManager } from '@google-cloud/storage';
import { v4 } from 'uuid';

const PROJECT_BUCKET_NAME = 'okomera-organoids';

const DATASETS_FOLDER_NAME = `../../MouseOrganoids`;
const SEGMENTATION_FOLDER_NAME = 'segmentations';
const ORIGINAL_IMG_FOLDER_NAME = 'images';

const storage = new Storage({
  projectId: 'test-okomera',
});
const transferManager = new TransferManager(storage.bucket(PROJECT_BUCKET_NAME));

(async () => {
  await mongoose.connect(DATABASE_URL);
  const OrganoidModel = mongoose.model(Organoid.name, MongoOrganoidSchema);

  // Open directory and validates file structure

  const datasetsNames = (await readdir(DATASETS_FOLDER_NAME)).filter((filename) => !filename.startsWith('.'));

  const datasetPromises = datasetsNames.map(async (dataset) => {
    const imgs = (await readdir(`${DATASETS_FOLDER_NAME}/${dataset}/${ORIGINAL_IMG_FOLDER_NAME}`)).map((filename) => {
      const hash = v4();

      return {
        original: `${DATASETS_FOLDER_NAME}/${dataset}/${ORIGINAL_IMG_FOLDER_NAME}/${filename}`,
        segmentation: `${DATASETS_FOLDER_NAME}/${dataset}/${SEGMENTATION_FOLDER_NAME}/${filename}`,
        originalImageKey: `${dataset}/${hash}-original`,
        segmentationMaskImageKey: `${dataset}/${hash}-seg`,
      };
    });

    return {
      dataset,
      imgs,
    };
  });

  const datasets = await Promise.all(datasetPromises);

  console.log(datasets);

  // 1. Upload images to Google Cloud Storage
  const uploadAndMoveFiles = async ({
    dataset,
    imgs,
  }: {
    dataset: string;
    imgs: { original: string; originalImageKey: string; segmentation: string; segmentationMaskImageKey: string }[];
  }) => {
    console.log(`Uploading ${dataset}...`);

    await transferManager.uploadManyFiles(imgs.map((i) => i.original));
    await transferManager.uploadManyFiles(imgs.map((i) => i.segmentation));

    const movePromises = [
      ...imgs.map((i) => transferManager.bucket.file(i.original).move(i.originalImageKey)),
      ...imgs.map((i) => transferManager.bucket.file(i.segmentation).move(i.segmentationMaskImageKey)),
    ];

    await Promise.all(movePromises);
  };

  for (let i = 0; i < datasets.length; i++) {
    await uploadAndMoveFiles(datasets[i]);
  }

  // 2. Insert metadata to the database
  const feedDatabase = async ({
    dataset,
    imgs,
  }: {
    dataset: string;
    imgs: { original: string; originalImageKey: string; segmentation: string; segmentationMaskImageKey: string }[];
  }) => {
    const session = await mongoose.startSession();
    await session.startTransaction();

    const insertionPromises = imgs.map(async ({ originalImageKey, segmentationMaskImageKey }) => {
      const organoid = new OrganoidModel({
        id: new mongoose.Types.ObjectId(),
        maskSurface: Math.random() * 500.0,
        dataset,
        originalImageKey,
        segmentationMaskImageKey,
      });

      return organoid.save();
    });
    const _organoidsMetadata = await Promise.all(insertionPromises);
    await session.endSession();

    console.log(`Organoids metadata of dataset: "${dataset}" inserted into the database\n`);
  };

  for (let i = 0; i < datasets.length; i++) {
    await feedDatabase(datasets[i]);
  }
})().finally(async () => {
  await mongoose.disconnect();
});

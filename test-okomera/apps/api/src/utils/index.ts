import sharp from 'sharp';

// Function to calculate standard deviation contrast
function _calculateStandardDeviationContrast(pixelValues: number[]) {
  const mean = pixelValues.reduce((sum, value) => sum + value, 0) / pixelValues.length;
  const variance = pixelValues.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / pixelValues.length;
  return Math.sqrt(variance); // Standard deviation
}

const arrayMinMax = (arr: number[]) =>
  arr.reduce(
    ([min, max], val) => [Math.min(min, val), Math.max(max, val)],
    [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY],
  );

// Function to calculate Michelson contrast
function calculateMichelsonContrast(pixelValues: number[]) {
  const [min, max] = arrayMinMax(pixelValues);
  return (max - min) / (max + min);
}

export const computeContrast = async (buffer: ArrayBuffer): Promise<number> => {
  // Get pixel values
  const sharpObj = sharp(buffer);
  const grayscaleBuffer = await sharpObj.grayscale().raw().toBuffer();
  const pixelValues = Array.from(grayscaleBuffer);

  // Compute contrast using Michelson method
  const contrast = calculateMichelsonContrast(pixelValues);
  // Alternative method (Standard deviation)
  // const contrast = calculateStandardDeviationContrast(pixelValues);

  return contrast;
};

export const computeBrightness = async (buffer: ArrayBuffer): Promise<number> => {
  const data = await sharp(buffer).raw().toBuffer();

  let totalBrightness = 0;
  for (let i = 0; i < data.length; i += 3) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Calculate perceived brightness using weighted luminance
    totalBrightness += 0.299 * r + 0.587 * g + 0.114 * b;
  }

  const brightness = totalBrightness / (data.length / 3);

  return brightness;
};

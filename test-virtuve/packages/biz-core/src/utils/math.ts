export const mean = (data: number[]) => {
  if (data.length === 0) return 0;

  return data.reduce((sum, n) => sum + n) / data.length;
};

export const variance = (data: number[]) => {
  if (data.length === 0) return 0;

  const average = mean(data);
  const squaredDiff = data.map((value) => Math.pow(value - average, 2));

  return squaredDiff.reduce((sum, value) => sum + value, 0) / data.length;
};

export const standardDeviation = (data: number[]) => {
  if (data.length === 0) return 0;

  return Math.sqrt(variance(data));
};

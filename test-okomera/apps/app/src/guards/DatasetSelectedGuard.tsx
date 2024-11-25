import useDatasetContext from '@/hooks/contexts/useDatasetContext';

const DatasetSelectedGuard = ({ children }: { children: React.ReactNode }) => {
  const { dataset } = useDatasetContext();

  if (!dataset) {
    return <>Need to select a dataset</>;
  }

  return children;
};

export default DatasetSelectedGuard;

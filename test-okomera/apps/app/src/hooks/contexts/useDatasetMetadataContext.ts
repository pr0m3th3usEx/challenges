import { DatasetMetadataContext } from '@/contexts/DatasetMetadataProvider';
import { useContext } from 'react';

const useDatasetMetadataContext = () => useContext(DatasetMetadataContext);

export default useDatasetMetadataContext;

import { DatasetContext } from '@/contexts/DatasetProvider';
import { useContext } from 'react';

const useDatasetContext = () => useContext(DatasetContext);

export default useDatasetContext;

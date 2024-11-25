import { DatasetQueryValues } from '@okomera/api';
import { createContext, useState } from 'react';

type DatasetContextType = { dataset: DatasetQueryValues | null; setDataset: (dataset: DatasetQueryValues) => void };

const defaultValue: DatasetContextType = { dataset: null, setDataset: (_) => {} };
export const DatasetContext = createContext<DatasetContextType>(defaultValue);

const DatasetProvider = ({ children }: { children: React.ReactNode }) => {
  const [dataset, setDataset] = useState<DatasetQueryValues | null>(null);

  return (
    <DatasetContext.Provider
      value={{
        dataset,
        setDataset,
      }}
    >
      {children}
    </DatasetContext.Provider>
  );
};

export default DatasetProvider;

import { GetOrganoidsResponse } from '@okomera/api';
import { createContext } from 'react';

const defaultValue: GetOrganoidsResponse = {
  items: [],
  count: 0,
};

export const DatasetMetadataContext = createContext<GetOrganoidsResponse>(defaultValue);

const DatasetMetadataProvider = ({ data, children }: { data: GetOrganoidsResponse; children: React.ReactNode }) => {
  return <DatasetMetadataContext.Provider value={data}>{children}</DatasetMetadataContext.Provider>;
};

export default DatasetMetadataProvider;

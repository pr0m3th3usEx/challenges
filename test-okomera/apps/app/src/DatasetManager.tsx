import { Text, VStack } from '@chakra-ui/react';
import Loader from './components/widgets/Loader';
import useDatasetContext from './hooks/contexts/useDatasetContext';
import useGetOrganoidsQuery from './hooks/useGetOrganoidsQuery';
import { Button } from './components/ui/button';
import DatasetManagerLayout from './components/layouts/DatasetManagerLayout';
import DatasetMetadataProvider from './contexts/DatasetMetadataProvider';

const DatasetManager = () => {
  const { dataset } = useDatasetContext();
  const { data, revalidate, isLoading, error } = useGetOrganoidsQuery({ dataset: dataset! }); // dataset shall be set at this point

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <VStack>
        <Text color="white">Impossible de charger le dataset</Text>
        <Button onClick={revalidate}>Réessayer</Button>
      </VStack>
    );
  }

  if (data) {
    return (
      <DatasetMetadataProvider data={data}>
        <DatasetManagerLayout />
      </DatasetMetadataProvider>
    );
  }

  return null;
};

export default DatasetManager;

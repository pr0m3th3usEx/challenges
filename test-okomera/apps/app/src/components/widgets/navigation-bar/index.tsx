import { createListCollection, useBreakpointValue } from '@chakra-ui/react';
import NavigationBarDesktop from './desktop';
import NavigationBarMobile from './mobile';
import { DatasetEnumObj } from '@/utils';
import useDatasetContext from '@/hooks/contexts/useDatasetContext';

const datasetOptions = createListCollection({
  items: Object.values(DatasetEnumObj).map((key) => ({
    label: key,
    value: key,
  })),
});

const NavigationBar = () => {
  const { dataset, setDataset } = useDatasetContext();
  const size = useBreakpointValue({ base: 'sm', md: 'lg' }) as 'sm' | 'lg';

  if (size === 'sm') {
    return <NavigationBarMobile datasetOptions={datasetOptions} dataset={dataset} setDataset={setDataset} />;
  }

  return <NavigationBarDesktop datasetOptions={datasetOptions} dataset={dataset} setDataset={setDataset} />;
};

export default NavigationBar;

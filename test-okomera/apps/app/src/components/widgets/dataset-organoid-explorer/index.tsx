import { useBreakpointValue } from '@chakra-ui/react';
import DatasetOrganoidExplorerDesktop from './desktop';
import DatasetOrganoidExplorerMobile from './mobile';

const DatasetOrganoidExplorer = ({
  onSelect,
  organoidSelected,
}: {
  onSelect: (id: string) => void;
  organoidSelected: string | undefined;
}) => {
  const size = useBreakpointValue({ base: 'sm', md: 'lg' }) as 'sm' | 'lg';

  if (size === 'sm') {
    return <DatasetOrganoidExplorerMobile organoidSelected={organoidSelected} onSelect={onSelect} />;
  }

  return <DatasetOrganoidExplorerDesktop organoidSelected={organoidSelected} onSelect={onSelect} />;
};

export default DatasetOrganoidExplorer;

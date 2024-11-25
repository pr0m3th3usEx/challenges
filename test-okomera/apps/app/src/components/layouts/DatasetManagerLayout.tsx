import { Grid, GridItem } from '@chakra-ui/react';
import DatasetOrganoidExplorer from '../widgets/dataset-organoid-explorer';
import { useState } from 'react';
import OrganoidPanel from '@/OrganoidPanel';

const DatasetManagerLayout = () => {
  const [organoidId, setOrganoidId] = useState<string>();

  return (
    <Grid
      w="100%"
      md={{ gridTemplateColumns: 'repeat(6, 1fr)', gridTemplateRows: undefined }}
      base={{ gridTemplateRows: 'repeat(10, 1fr)' }}
      // pb="48px"
    >
      <GridItem md={{ columnSpan: '1', minW: '233px', h: 'calc(100vh - 72px)' }} rowSpan={1} p="12px">
        <DatasetOrganoidExplorer onSelect={setOrganoidId} organoidSelected={organoidId} />
      </GridItem>

      <GridItem colSpan={{ base: 1, md: 5 }} p="12px" rowSpan={{ base: 9, md: 1 }}>
        <OrganoidPanel organoidSelected={organoidId} />
      </GridItem>
    </Grid>
  );
};

export default DatasetManagerLayout;

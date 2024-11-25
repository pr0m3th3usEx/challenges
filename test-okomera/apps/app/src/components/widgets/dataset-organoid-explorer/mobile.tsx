import useDatasetMetadataContext from '@/hooks/contexts/useDatasetMetadataContext';
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPageText,
  PaginationPrevTrigger,
  PaginationRoot,
} from '@/components/ui/pagination';
import { useMemo } from 'react';
import { HStack } from '@chakra-ui/react';

const DatasetOrganoidExplorer = ({
  onSelect,
  organoidSelected,
}: {
  onSelect: (id: string) => void;
  organoidSelected: string | undefined;
}) => {
  const { items, count } = useDatasetMetadataContext();
  const page = useMemo(() => {
    const index = items.findIndex((e) => e.id === organoidSelected);

    return index > -1 ? index + 1 : undefined;
  }, [organoidSelected, items]);

  const onPageChange = (page: number) => {
    if (page < 1 || page > items.length) {
      return;
    }

    onSelect(items[page - 1].id);
  };

  return (
    <PaginationRoot
      size="sm"
      count={count}
      variant="solid"
      page={page}
      onPageChange={(e) => onPageChange(e.page)}
      pageSize={1}
      siblingCount={1}
      maxW="100%"
    >
      <HStack flexWrap="wrap" maxW="100%" justifyContent="center" gap="12px">
        <PaginationPrevTrigger />
        <PaginationItems />
        <PaginationPageText />
        <PaginationNextTrigger />
      </HStack>
    </PaginationRoot>
  );
};

export default DatasetOrganoidExplorer;

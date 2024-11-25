import useDatasetMetadataContext from '@/hooks/contexts/useDatasetMetadataContext';
import { Box, Text, VStack } from '@chakra-ui/react';

const DatasetOrganoidExplorer = ({
  onSelect,
  organoidSelected,
}: {
  onSelect: (id: string) => void;
  organoidSelected: string | undefined;
}) => {
  const { items, count } = useDatasetMetadataContext();

  return (
    <VStack w="100%" bg="#0C0E2E" h="calc(100% - 16px)" py="8px" gap="24px">
      <Text color="white" fontWeight="semibold">
        Nombre de photos: {count}
      </Text>
      <VStack w="100%" overflow="auto" gap={0}>
        {items.map(({ id }, index) => (
          <Box
            key={id}
            w="100%"
            p="18px 12px"
            cursor="pointer"
            _hover={{ bg: '#3182CE20' }}
            onClick={() => onSelect(id)}
            {...{ bg: id === organoidSelected ? '#3182CE20' : undefined }}
          >
            <Text color="white" fontSize="sm">
              Image {index}
            </Text>
          </Box>
        ))}
      </VStack>
    </VStack>
  );
};

export default DatasetOrganoidExplorer;

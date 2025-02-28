import useGetRequirementsQuery from '@/hooks/query/useGetRequirements';
import { Badge, Heading, Table, Text, VStack } from '@chakra-ui/react';

function Requirements() {
  const { data, isLoading, error } = useGetRequirementsQuery();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Une erreur est survenue...</Text>;
  }

  if (data) {
    return (
      <VStack w="100%" alignItems="start" gap="24px" px="8px">
        <Heading>Requirements list</Heading>

        <Table.Root size="sm">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Name</Table.ColumnHeader>
              <Table.ColumnHeader>Description</Table.ColumnHeader>
              <Table.ColumnHeader>Required documents</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Status</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.requirements.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.description}</Table.Cell>
                <Table.Cell>{item.requiredDocuments.map(({ docType }) => docType).join(', ')}</Table.Cell>
                <Table.Cell textAlign="end">
                  <Badge colorPalette={item.status === 'COMPLIANT' ? 'green' : 'red'}>{item.status}</Badge>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </VStack>
    );
  }

  return <></>;
}

export default Requirements;

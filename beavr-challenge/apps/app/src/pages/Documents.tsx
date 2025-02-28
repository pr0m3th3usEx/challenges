import useGetDocumentsQuery from '@/hooks/query/useGetDocuments';
import { DocumentStatus } from '@beavr/api';
import { MdDelete } from 'react-icons/md';
import { Badge, Heading, HStack, Table, Text, VStack, createListCollection, IconButton } from '@chakra-ui/react';
import useGetDocumentsTypesQuery from '@/hooks/query/useGetDocumentTypes';
import { useMemo, useState } from 'react';
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from '@/components/ui/select';
import useCreateDocument from '@/hooks/mutations/useCreateDocument';
import useDeleteDocument from '@/hooks/mutations/useDeleteDocument';
import { Button } from '@/components/ui/button';
import UpdateButton from '@/components/UpdateButton';

function Documents() {
  const [selectedDocType, setSelectedDocType] = useState<string | null>(null);
  const { data, isLoading, error } = useGetDocumentsQuery();
  const { data: docTypesList, isLoading: isLoadingDocTypes, error: errorDocTypes } = useGetDocumentsTypesQuery();
  const { createDocument, isMutating: isCreating } = useCreateDocument();
  const { deleteDocument, isMutating: isDeleting } = useDeleteDocument();

  const docTypesItems = useMemo(() => {
    if (!docTypesList) return createListCollection({ items: [] });

    return createListCollection({
      items: docTypesList.documentTypes.map(({ docType }) => ({
        label: docType,
        value: docType,
      })),
    });
  }, [docTypesList]);

  if (isLoading || isLoadingDocTypes) {
    return <Text>Loading...</Text>;
  }

  if (error || errorDocTypes) {
    return <Text>Une erreur est survenue...</Text>;
  }

  if (data) {
    return (
      <VStack w="100%" alignItems="start" gap="24px" px="8px">
        <HStack w="100%" justifyContent="space-between" alignItems="start">
          <Heading>Documents submitted</Heading>

          <HStack>
            <SelectRoot
              collection={docTypesItems}
              size="sm"
              width="320px"
              onValueChange={(e) => setSelectedDocType(e.value[0])}
            >
              <SelectTrigger>
                <SelectValueText placeholder="Ajouter un document..." />
              </SelectTrigger>
              <SelectContent>
                {docTypesItems.items.map((docType) => (
                  <SelectItem item={docType} key={docType.value}>
                    {docType.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
            <Button
              disabled={!selectedDocType}
              loading={isCreating}
              onClick={() => {
                if (!selectedDocType) return;

                createDocument({
                  docType: selectedDocType,
                })
                  .then(() => console.log('New document created'))
                  .catch((err) => console.error(err));
              }}
            >
              Ajouter un document
            </Button>
          </HStack>
        </HStack>

        <Table.Root size="sm">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Document type</Table.ColumnHeader>
              <Table.ColumnHeader>Document version</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.documents
              .slice()
              .sort((a, b) => new Date(b.version).getTime() - new Date(a.version).getTime())
              .map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.docType.docType}</Table.Cell>
                  <Table.Cell>{item.version}</Table.Cell>
                  <Table.Cell>
                    <Badge colorPalette={getDocumentStatusColor(item.status)}>{item.status}</Badge>
                  </Table.Cell>
                  <Table.Cell textAlign="end">
                    <HStack gap="8px" justifyContent={'end'}>
                      <UpdateButton id={item.id} />
                      <IconButton
                        disabled={isDeleting}
                        onClick={() => {
                          deleteDocument({ id: item.id })
                            .then(() => console.log(`Doc ${item.id} deleted`))
                            .catch((err) => console.error(err));
                        }}
                      >
                        <MdDelete />
                      </IconButton>
                    </HStack>
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

const getDocumentStatusColor = (status: DocumentStatus) => {
  switch (status) {
    case 'IN_PROGRESS':
      return 'orange';
    case 'VALID':
      return 'green';
    case 'REFUSED':
      return 'red';
    case 'EXPIRED':
      return 'red';
  }
};

export default Documents;

import { createListCollection, IconButton } from '@chakra-ui/react';
import {
  PopoverBody,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverRoot,
  PopoverTrigger,
} from './ui/popover';
import { HiPencil } from 'react-icons/hi';
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from './ui/select';
import { DocumentStatus } from '@beavr/api';
import useUpdateDocument from '@/hooks/mutations/useUpdateDocument';
import { useRef } from 'react';

const documentStatusOptions = createListCollection({
  items: [
    { label: 'Valid', value: 'VALID' },
    { label: 'Refused', value: 'REFUSED' },
    { label: 'Expired', value: 'EXPIRED' },
  ],
});

type UpdateButtonProps = {
  id: string;
};

function UpdateButton({ id }: UpdateButtonProps) {
  const { updateDocument } = useUpdateDocument();
  const popupRef = useRef<HTMLButtonElement>(null);

  return (
    <PopoverRoot size="xs">
      <PopoverCloseTrigger ref={popupRef} />
      <PopoverTrigger asChild>
        <IconButton>
          <HiPencil />
        </IconButton>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverHeader>Select new status</PopoverHeader>
        <PopoverBody>
          <SelectRoot
            collection={documentStatusOptions}
            size="sm"
            positioning={{ sameWidth: true, placement: 'bottom' }}
            onValueChange={(option) => {
              updateDocument({ id, status: option.value[0] as DocumentStatus })
                .then(() => {
                  popupRef.current?.click();
                  console.log(`Document ${id} updated`);
                })
                .catch((err) => console.error(err));
            }}
          >
            <SelectTrigger>
              <SelectValueText placeholder="Select" />
            </SelectTrigger>
            <SelectContent portalled={false} width="full">
              {documentStatusOptions.items.map((option) => (
                <SelectItem item={option} key={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
}

export default UpdateButton;

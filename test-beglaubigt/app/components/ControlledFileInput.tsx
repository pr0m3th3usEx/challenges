import { Input, InputProps } from '@chakra-ui/react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';

interface ControlledFileInputProps<T extends FieldValues> extends UseControllerProps<T> {}

function ControlledFileInput<T extends FieldValues>({
  name,
  control,
  rules,
  disabled,
  defaultValue,
  shouldUnregister,
  ...inputProps
}: ControlledFileInputProps<T> & InputProps) {
  const {
    field: { ref, onChange, value: _, ...props },
  } = useController({
    control,
    name,
    rules,
    disabled,
    defaultValue,
    shouldUnregister,
  });

  return (
    <Input
      ref={ref}
      {...inputProps}
      type="file"
      {...props}
      onChange={(e) => {
        if (e.target.files && e.target.files.length > 0) {
          console.log(e.target.files[0]);
          onChange(e.target.files[0]);
        }
      }}
    />
  );
}

export default ControlledFileInput;

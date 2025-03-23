import { Dialog } from "primereact/dialog";
import { Controller, useForm } from "react-hook-form";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Product } from "../lib/utils/api";

type EditProductModalProps = {
  product: Product | undefined;
  open: boolean;
  onClose: () => void;
  onEdit: (product: Product) => void;
};

export const EditProductModal = ({
  product,
  open,
  onClose,
  onEdit,
}: EditProductModalProps) => {
  const form = useForm<{ price: number }>({
    mode: "all",
    defaultValues: {
      price: product?.price ?? 0,
    },
  });

  const onSubmit = (data: { price: number }) => {
    if (!product) return;

    const newProduct = {
      ...product,
      price: data.price,
    };

    onEdit(newProduct);
  };
  if (!product) return null;

  return (
    <Dialog
      header={`Edit ${product.title}`}
      visible={open}
      className="sm:w-[450px]"
      onHide={onClose}
    >
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col">
          <label htmlFor="price">Price</label>
          <Controller
            name="price"
            control={form.control}
            defaultValue={product.price}
            render={({ field }) => {
              return (
                <InputNumber
                  value={field.value}
                  onValueChange={(e) => field.onChange(e.value ?? 0)}
                  onBlur={field.onBlur}
                  mode="currency"
                  currency="USD"
                  locale="en-US"
                />
              );
            }}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button severity="contrast" onClick={onClose}>
            Cancel
          </Button>
          <Button severity="success">Edit product</Button>
        </div>
      </form>
    </Dialog>
  );
};

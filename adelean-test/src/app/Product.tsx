import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { Button } from "primereact/button";
import { useCallback, useRef } from "react";
import { Toast } from "primereact/toast";
import { Tag } from "primereact/tag";
import { deleteProduct, getProduct } from "../lib/utils/api";
import { formatPrice } from "../lib/utils";

export const Product = () => {
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);
  const { id } = useParams<{ id: string }>() as Required<
    ReturnType<typeof useParams<{ id: string }>> // Required cause in URL
  >;
  const { isLoading, data: product, error } = useQuery(getProduct(id));

  const onDelete = useCallback(() => {
    deleteProduct(Number(id)).then(() => {
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Product deleted",
        life: 2000,
      });

      setTimeout(() => navigate("/"), 2000);
    });
  }, [id, navigate]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    return <div>An error occured</div>;
  }

  if (product) {
    return (
      <div>
        <Toast ref={toast} position="top-left" />
        <Button
          icon="pi pi-arrow-left"
          label="Back to home"
          onClick={() => navigate("/")}
        ></Button>
        <div className="flex flex-col sm:flex-row mt-8 gap-4 sm:gap-8">
          <div className="sm:max-w-1/3">
            <img
              src={product?.image}
              alt={product.title}
              className="object-center"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-semibold text-2xl">{product.title}</h1>
            <p>{product.description}</p>
            <Tag className="w-fit">{product.category}</Tag>
            <p className="font-semibold">{formatPrice(product.price)}</p>
            <div className="flex gap-2">
              <Button severity="danger" onClick={onDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

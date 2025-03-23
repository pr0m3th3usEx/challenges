import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { Tag } from "primereact/tag";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import {
  deleteProduct,
  getAllProducts,
  Product,
  updateProduct,
} from "../lib/utils/api";
import { formatPrice } from "../lib/utils";
import { EditProductModal } from "../components/edit-product-modal";

const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  title: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
  status: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
};

export const Home = () => {
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);
  const { isLoading, data, error } = useQuery(getAllProducts());
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined,
  );
  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);

  const onDeleteProduct = (id: number) => {
    deleteProduct(id).then(() => {
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Product deleted",
        life: 2000,
      });
    });
  };

  const onEditProduct = (updated: Product) => {
    updateProduct(updated).then(() => {
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Product updated",
        life: 2000,
      });
      setSelectedProduct(undefined);
      setEditModalOpen(false);
    });
  };

  const priceTemplate = (product: Product) => {
    return <p>{formatPrice(product.price)}</p>;
  };

  const actionsTemplate = (product: Product) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          onClick={() => {
            setSelectedProduct(product);
            setEditModalOpen(true);
          }}
        ></Button>
        <Button
          severity="danger"
          icon="pi pi-trash"
          onClick={() => {
            /** open dialog */
            onDeleteProduct(product.id);
          }}
        ></Button>
      </div>
    );
  };

  const categoryTemplate = (product: Product) => {
    return <Tag>{product.category}</Tag>;
  };

  const initFilters = () => {
    setFilters(defaultFilters);
  };

  useEffect(() => {
    initFilters();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occured</div>;
  }

  if (data) {
    return (
      <>
        <Toast ref={toast} position="top-left" />

        {editModalOpen && (
          <EditProductModal
            product={selectedProduct}
            open={editModalOpen}
            onClose={() => {
              setSelectedProduct(undefined);
              setEditModalOpen(false);
            }}
            onEdit={onEditProduct}
          />
        )}

        <div style={{ width: "100%", overflowX: "hidden" }}>
          <DataTable
            value={data}
            dataKey="id"
            selectionMode="single"
            onSelectionChange={(e) => navigate(`/product/${e.value.id}`)}
            paginator
            sortMode="multiple"
            removableSort
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            filters={filters}
            onFilter={(e) => setFilters(e.filters)}
            globalFilterFields={["title", "category"]}
          >
            <Column field="id" header="Code" sortable></Column>
            <Column
              field="title"
              header="Name"
              sortable
              filter
              filterField="title"
              filterPlaceholder="Search by name"
            ></Column>
            <Column
              field="category"
              header="Category"
              body={categoryTemplate}
              sortable
              filter
              filterField="category"
              filterPlaceholder="Search by category"
            ></Column>
            <Column
              field="price"
              header="Price"
              body={priceTemplate}
              sortable
            ></Column>
            <Column
              field="actions"
              header="Actions"
              body={actionsTemplate}
            ></Column>
          </DataTable>
        </div>
      </>
    );
  }

  return null;
};

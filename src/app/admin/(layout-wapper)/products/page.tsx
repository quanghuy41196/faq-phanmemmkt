"use client";
import ButtonFlowbite from "@/components/ButtonFlowbite";
import {
  FilterItems,
  FilterWapper
} from "@/components/FilterLayout";
import MantineTableCustom from "@/components/MantineTableCustom";
import { ModalConfirm, ModalProducts } from "@/components/Modal";
import { configTableProduct } from "@/config/configTable";
import { pickBySearch } from "@/helper/utils";
import { useDeleteProduct } from "@/services/framework/products/useDeleteProduct";
import useGetAllProducts from "@/services/framework/products/useGetAllProducts";
import { IProduct, ISearchProduct } from "@/services/interface";
import { TDataColumnTable } from "@/types";
import { useCallback, useMemo, useState } from "react";
import { IoAdd } from "react-icons/io5";

const Products = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [currentData, setCurrentData] = useState<IProduct>();
  const [configSearch, setConfigSearch] = useState<ISearchProduct>({
    page: 1,
    limit: 50,
  });
  const { data: dataProduct, isFetching } = useGetAllProducts(
    pickBySearch(configSearch)
  );

  const handleForm = useCallback((data?: IProduct) => {
    setIsOpen(true);
    setCurrentData(data);
  }, []);

  const handleDelete = useCallback((data?: IProduct) => {
    setIsDelete(true);
    setCurrentData(data);
  }, []);

  const newConfigTableProduct = useMemo((): TDataColumnTable<IProduct> => {
    return configTableProduct({
      handleDelete,
      handleForm,
    });
  }, [handleDelete, handleForm]);

  return (
    <div className="panel">
      <h1 className="text-lg font-semibold mb-5">Danh sách sản phẩm</h1>
      <FilterWapper>
        <FilterItems isButton>
          <ButtonFlowbite
            color="blue"
            StartIcon={IoAdd}
            onClick={() => handleForm()}
          >
            Thêm sản phẩm
          </ButtonFlowbite>
        </FilterItems>
      </FilterWapper>
      <MantineTableCustom
        fetching={isFetching}
        data={dataProduct?.items ?? []}
        column={newConfigTableProduct}
        paginationData={dataProduct}
        setConfigPagination={setConfigSearch}
        pinLastColumn
      />

      {isOpen && (
        <ModalProducts
          isShow={isOpen}
          setIsShow={setIsOpen}
          currentData={currentData}
        />
      )}

      {isDelete && currentData?.id && (
        <ModalConfirm
          isShow={isDelete}
          setIsShow={setIsDelete}
          CallAPi={useDeleteProduct}
          onChange={(mutate) => mutate && mutate(currentData?.id)}
        />
      )}
    </div>
  );
};

export default Products;

"use client";
import ButtonFlowbite from "@/components/ButtonFlowbite";
import { FilterItems, FilterWapper } from "@/components/FilterLayout";
import MantineTableCustom from "@/components/MantineTableCustom";
import { ModalConfirm, ModalTrusted } from "@/components/Modal";
import { configTableTrusted } from "@/config/configTable";
import { pickBySearch } from "@/helper/utils";
import { useDeletePosts } from "@/services/framework/posts/useDeletePosts";
import useGetAllPosts from "@/services/framework/posts/useGetAllProducts";
import { ICategory, ISearchCategory } from "@/services/interface";
import { TDataColumnTable } from "@/types";
import { useCallback, useMemo, useState } from "react";
import { IoAdd } from "react-icons/io5";

const Trusted = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [currentData, setCurrentData] = useState<ICategory>();
  const [configSearch, setConfigSearch] = useState<ISearchCategory>({
    page: 1,
    limit: 50,
    includes: "group,category,product",
  });
  const { data: dataPosts, isFetching } = useGetAllPosts(
    pickBySearch(configSearch)
  );

  const handleForm = useCallback((data?: ICategory) => {
    setIsOpen(true);
    setCurrentData(data);
  }, []);

  const handleDelete = useCallback((data?: ICategory) => {
    setIsDelete(true);
    setCurrentData(data);
  }, []);

  const newConfigTableTrusted = useMemo((): TDataColumnTable<ICategory> => {
    return configTableTrusted({
      handleDelete,
      handleForm,
    });
  }, [handleDelete, handleForm]);

  return (
    <div className="panel">
      <h1 className="text-lg font-semibold mb-5">Danh sách đối tác</h1>
      <FilterWapper>
        <FilterItems isButton>
          <ButtonFlowbite
            color="blue"
            StartIcon={IoAdd}
            onClick={() => handleForm()}
          >
            Thêm đối tác
          </ButtonFlowbite>
        </FilterItems>

        <FilterItems>
          
        </FilterItems>
      </FilterWapper>
      <MantineTableCustom
        fetching={isFetching}
        data={dataPosts?.items ?? []}
        column={newConfigTableTrusted}
        setConfigPagination={setConfigSearch}
        paginationData={dataPosts}
        pinLastColumn
      />

      {isOpen && (
        <ModalTrusted
          isShow={isOpen}
          setIsShow={setIsOpen}
          currentData={currentData}
        />
      )}

      {isDelete && currentData?.id && (
        <ModalConfirm
          isShow={isDelete}
          setIsShow={setIsDelete}
          CallAPi={useDeletePosts}
          onChange={(mutate) => mutate && mutate(currentData?.id)}
        />
      )}
    </div>
  );
};

export default Trusted;

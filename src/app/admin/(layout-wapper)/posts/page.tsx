"use client";
import ButtonFlowbite from "@/components/ButtonFlowbite";
import { FilterItems, FilterWapper } from "@/components/FilterLayout";
import MantineTableCustom from "@/components/MantineTableCustom";
import { ModalConfirm, ModalPosts } from "@/components/Modal";
import { configTablePosts } from "@/config/configTable";
import { pickBySearch } from "@/helper/utils";
import { useDeletePosts } from "@/services/framework/posts/useDeletePosts";
import useGetAllPosts from "@/services/framework/posts/useGetAllProducts";
import { IPost, ISearchPosts } from "@/services/interface";
import { TDataColumnTable } from "@/types";
import { useCallback, useMemo, useState } from "react";
import { IoAdd } from "react-icons/io5";

const Posts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [currentData, setCurrentData] = useState<IPost>();
  const [configSearch, setConfigSearch] = useState<ISearchPosts>({
    page: 1,
    limit: 50,
    includes: "category",
    getContent: true
  });
  const { data: dataPosts, isFetching } = useGetAllPosts(
    pickBySearch(configSearch)
  );

  const handleForm = useCallback((data?: IPost) => {
    setIsOpen(true);
    setCurrentData(data);
  }, []);

  const handleDelete = useCallback((data?: IPost) => {
    setIsDelete(true);
    setCurrentData(data);
  }, []);

  const newConfigTablePosts = useMemo((): TDataColumnTable<IPost> => {
    return configTablePosts({
      handleDelete,
      handleForm,
    });
  }, [handleDelete, handleForm]);

  return (
    <div className="panel">
      <h1 className="text-lg font-semibold mb-5">Danh sách bài viết</h1>
      <FilterWapper>
        <FilterItems isButton>
          <ButtonFlowbite
            color="blue"
            StartIcon={IoAdd}
            onClick={() => handleForm()}
          >
            Thêm bài viết
          </ButtonFlowbite>
        </FilterItems>
      </FilterWapper>
      <MantineTableCustom
        fetching={isFetching}
        data={dataPosts?.items ?? []}
        column={newConfigTablePosts}
        paginationData={dataPosts}
        setConfigPagination={setConfigSearch}
        pinLastColumn
      />

      {isOpen && (
        <ModalPosts
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

export default Posts;

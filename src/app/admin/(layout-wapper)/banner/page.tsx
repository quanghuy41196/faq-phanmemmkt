"use client";
import ButtonFlowbite from "@/components/ButtonFlowbite";
import { FilterItems, FilterWapper } from "@/components/FilterLayout";
import MantineTableCustom from "@/components/MantineTableCustom";
import { ModalBanner, ModalConfirm } from "@/components/Modal";
import { configTableBanner } from "@/config/configTable";
import { pickBySearch } from "@/helper/utils";
import { useDeleteBanner } from "@/services/framework/banner/useDeleteBanner";
import useGetAllBanner from "@/services/framework/banner/useGetAllBanner";
import { IBanner, ISearchBanner } from "@/services/interface";
import { TDataColumnTable } from "@/types";
import { useCallback, useMemo, useState } from "react";
import { IoAdd } from "react-icons/io5";

const Banner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [currentData, setCurrentData] = useState<IBanner>();
  const [configSearch, setConfigSearch] = useState<ISearchBanner>({
    page: 1,
    limit: 50,
  });
  const { data: dataBanner, isFetching } = useGetAllBanner(
    pickBySearch(configSearch)
  );

  const handleForm = useCallback((data?: IBanner) => {
    setIsOpen(true);
    setCurrentData(data);
  }, []);

  const handleDelete = useCallback((data?: IBanner) => {
    setIsDelete(true);
    setCurrentData(data);
  }, []);

  const newConfigTableBanner = useMemo((): TDataColumnTable<IBanner> => {
    return configTableBanner({
      handleDelete,
      handleForm,
    });
  }, [handleDelete, handleForm]);

  return (
    <div className="panel">
      <h1 className="text-lg font-semibold mb-5">Danh sách banner</h1>
      <FilterWapper>
        <FilterItems isButton>
          <ButtonFlowbite
            color="blue"
            StartIcon={IoAdd}
            onClick={() => handleForm()}
          >
            Thêm banner
          </ButtonFlowbite>
        </FilterItems>
      </FilterWapper>
      <MantineTableCustom
        fetching={isFetching}
        data={dataBanner?.items ?? []}
        column={newConfigTableBanner}
        paginationData={dataBanner}
        setConfigPagination={setConfigSearch}
        pinLastColumn
      />

      {isOpen && (
        <ModalBanner
          isShow={isOpen}
          setIsShow={setIsOpen}
          currentData={currentData}
        />
      )}

      {isDelete && currentData?.id && (
        <ModalConfirm
          isShow={isDelete}
          setIsShow={setIsDelete}
          CallAPi={useDeleteBanner}
          onChange={(mutate) => mutate && mutate(currentData?.id)}
        />
      )}
    </div>
  );
};

export default Banner;

"use client";
import ButtonFlowbite from "@/components/ButtonFlowbite";
import { FilterItems, FilterWapper } from "@/components/FilterLayout";
import MantineTableCustom from "@/components/MantineTableCustom";
import { ModalAdvertisement, ModalConfirm } from "@/components/Modal";
import { configTableAdvertisement } from "@/config/configTable";
import { pickBySearch } from "@/helper/utils";
import { useDeleteGroup } from "@/services/framework/group/useDeleteGroup";
import useGetAllGroup from "@/services/framework/group/useGetAllGroup";
import { IGroup, ISearchGroup } from "@/services/interface";
import { TDataColumnTable } from "@/types";
import { useCallback, useMemo, useState } from "react";
import { IoAdd } from "react-icons/io5";

const Advertisement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [currentData, setCurrentData] = useState<IGroup>();
  const [configSearch, setConfigSearch] = useState<ISearchGroup>({
    page: 1,
    limit: 50,
  });
  const { data: dataGroup, isFetching } = useGetAllGroup(
    pickBySearch(configSearch)
  );

  const handleForm = useCallback((data?: IGroup) => {
    setIsOpen(true);
    setCurrentData(data);
  }, []);

  const handleDelete = useCallback((data?: IGroup) => {
    setIsDelete(true);
    setCurrentData(data);
  }, []);

  const newConfigTableAdvertisement = useMemo((): TDataColumnTable<IGroup> => {
    return configTableAdvertisement({
      handleDelete,
      handleForm,
    });
  }, [handleDelete, handleForm]);

  return (
    <div className="panel">
      <h1 className="text-lg font-semibold mb-5">Danh sách quảng cáo</h1>
      <FilterWapper>
        <FilterItems isButton>
          <ButtonFlowbite
            color="blue"
            StartIcon={IoAdd}
            onClick={() => handleForm()}
          >
            Thêm quảng cáo
          </ButtonFlowbite>
        </FilterItems>
      </FilterWapper>
      <MantineTableCustom
        fetching={isFetching}
        data={dataGroup?.items ?? []}
        column={newConfigTableAdvertisement}
        paginationData={dataGroup}
        setConfigPagination={setConfigSearch}
        pinLastColumn
      />

      {isOpen && (
        <ModalAdvertisement
          isShow={isOpen}
          setIsShow={setIsOpen}
          currentData={currentData}
        />
      )}

      {isDelete && currentData?.id && (
        <ModalConfirm
          isShow={isDelete}
          setIsShow={setIsDelete}
          CallAPi={useDeleteGroup}
          onChange={(mutate) => mutate && mutate(currentData?.id)}
        />
      )}
    </div>
  );
};

export default Advertisement;

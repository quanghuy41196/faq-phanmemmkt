/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import ButtonFlowbite from "@/components/ButtonFlowbite";
import { FilterItems, FilterWapper } from "@/components/FilterLayout";
import MantineTableCustom from "@/components/MantineTableCustom";
import { ModalAdvertisement, ModalConfirm } from "@/components/Modal";
import { configTableAdvertisement } from "@/config/configTable";
import { pickBySearch } from "@/helper/utils";
import { useDeleteAds } from "@/services/framework/ads/useDeleteAds";
import useGetAllAds from "@/services/framework/ads/useGetAllAds";
import { useUpdateAds } from "@/services/framework/ads/useUpdateAds";
import { IAds, ISearchAds } from "@/services/interface";
import { TDataColumnTable } from "@/types";
import { useCallback, useMemo, useState } from "react";
import { IoAdd } from "react-icons/io5";

const Advertisement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [objStatus, setObjStatus] = useState<{[key: string]: boolean}>({});
  const [currentData, setCurrentData] = useState<IAds>();
  const [configSearch, setConfigSearch] = useState<ISearchAds>({
    page: 1,
    limit: 50,
  });
  const { mutate: changeStatus, isPending } = useUpdateAds();
  const { data: dataGroup, isFetching } = useGetAllAds(
    pickBySearch(configSearch)
  );

  const handleChangeStatus = useCallback(
    (id: string, active: boolean) => {
      if (isPending) return;
      setObjStatus((prev) => ({ ...prev, [id]: !active }));
      changeStatus(
        {
          id,
          payload: {
            active: !active,
          },
        },
        {
          onError: () => setObjStatus((prev) => ({ ...prev, [id]: active })),
        }
      );
    },
    [isPending]
  );

  const handleForm = useCallback(
    (data?: IAds) => {
      setIsOpen(true);
      if (data) {
        const newData: IAds = {
          ...data,
          active:
            objStatus && Object.hasOwn(objStatus, data?.id)
              ? objStatus?.[data?.id]
              : data?.active,
        };
        setCurrentData(newData);
      }
    },
    [objStatus]
  );

  const handleDelete = useCallback((data?: IAds) => {
    setIsDelete(true);
    setCurrentData(data);
  }, []);

  const newConfigTableAdvertisement = useMemo((): TDataColumnTable<IAds> => {
    return configTableAdvertisement({
      handleDelete,
      handleForm,
      handleChangeStatus,
      objStatus,
      isPending,
    });
  }, [handleDelete, handleForm, objStatus, handleChangeStatus, isPending]);

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
          onSuccess={(data) => {
            setObjStatus((prev) => ({ ...prev, [data?.id]: data?.active }));
          }}
        />
      )}

      {isDelete && currentData?.id && (
        <ModalConfirm
          isShow={isDelete}
          setIsShow={setIsDelete}
          CallAPi={useDeleteAds}
          onChange={(mutate) => mutate && mutate(currentData?.id)}
        />
      )}
    </div>
  );
};

export default Advertisement;

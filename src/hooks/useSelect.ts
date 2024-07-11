// import { MktPaginationResponse } from "@/services/axios/types/response";
import { MktPaginationResponse } from "@/services/interface";
import { UseQueryResult } from "@tanstack/react-query";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";

export type optionSelect = {
  label: any;
  value: any;
  originValue?: any;
};

export interface useSelectProps<T> {
  limit?: number;
  page?: number;
  callApi: (obj: { limit: number; page: number }) => UseQueryResult<T, Error>;
  renderOption: (data: T) => optionSelect[];
}

const useSelect = <T>({
  callApi,
  renderOption,
  page = 1,
  limit = 50,
}: useSelectProps<T>) => {
  const [configPagination, setConfigPagination] = useState({
    page,
    limit,
  });
  const [options, setOptions] = useState<optionSelect[]>([]);
  const { data, isFetched, ...spread } = callApi(configPagination);

  useEffect(() => {
    if (data) {
      const newOtp = renderOption(data);
      setOptions((prev) => _.uniqBy([...prev, ...newOtp], "value"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetched, data]);

  const setPaginationScroll = useCallback(() => {
    const pagination = data as unknown as MktPaginationResponse<any>;

    const totalPage = Math.ceil((pagination ? pagination?.count / pagination?.limit : 0));
    if (data && pagination?.page < totalPage) {
      setConfigPagination((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetched]);

  return {
    options,
    setOptions,
    setConfigPagination,
    setPaginationScroll,
    configPagination,
    data,
    isFetched,
    renderOption,
    ...spread,
  };
};

export default useSelect;

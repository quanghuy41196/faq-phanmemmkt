"use client";
import { STT } from "@/helper/functions";
import { MktPaginationResponse } from "@/services/interface";
import { sortBy } from "lodash";
import {
  DataTable,
  DataTableColumn,
  DataTableProps,
  DataTableSortStatus,
} from "mantine-datatable";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";

type DataTablePropsNew = Omit<
  DataTableProps<any>,
  | "columns"
  | "records"
  | "groups"
  | "withBorder"
  | "borderRadius"
  | "loaderSize"
  | "loaderVariant"
  | "loaderColor"
>;

export type MantineTableProps = {
  column: Array<DataTableColumn<any>>;
  data: any[];
  page_sizes?: number[];
  initSort?: DataTableSortStatus;
  isNoStt?: boolean;
  dependency?: any[];
  isPagination?: boolean;
  classTable?: string;
  paginationData?: MktPaginationResponse<any>;
  onPageChange?: (num: number) => void;
  onRecordsPerPageChange?: (num: number) => void;
  setConfigPagination?: Dispatch<SetStateAction<any>>;
} & DataTablePropsNew;

const MantineTableCustom: FC<MantineTableProps> = ({
  column,
  data,
  page_sizes = [10, 20, 50, 100, 200, 500],
  initSort = {
    columnAccessor: "invoice",
    direction: "asc",
  },
  isNoStt = false,
  dependency = [],
  isPagination = true,
  paginationData,
  onPageChange,
  onRecordsPerPageChange,
  fetching,
  selectedRecords,
  onSelectedRecordsChange,
  rowExpansion,
  pinLastColumn,
  verticalAlignment,
  noHeader,
  minHeight,
  setConfigPagination,
  idAccessor,
  //   pagination
  paginationText,
  totalRecords,
  recordsPerPage,
  page,
  recordsPerPageOptions,
  classTable,
  ...rest
}): JSX.Element => {
  const [pageSize, setPageSize] = useState(20);
  const [initialRecords, setInitialRecords] = useState(data);
  const [records, setRecords] = useState(data);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>(initSort);

  const configDataTable = useMemo(() => {
    return {
      paginationText: ({
        from,
        to,
        totalRecords,
      }: {
        from: number;
        to: number;
        totalRecords: number;
      }): string => {
        return `Showing ${from} to ${to} of ${totalRecords} entries`;
      },
      totalRecords: paginationData?.count ? Number(paginationData?.count) : 0,
      recordsPerPage: paginationData?.limit
        ? Number(paginationData?.limit)
        : pageSize,
      page: paginationData?.page ? Number(paginationData?.page) : 1,
      onPageChange: (p: number): void => {
        setConfigPagination &&
          setConfigPagination((prev: any) => ({ ...prev, page: p }));
        onPageChange && onPageChange(p);
      },
      recordsPerPageOptions: page_sizes,
      onRecordsPerPageChange: (pageSize: number) => {
        setConfigPagination &&
          setConfigPagination((prev: any) => ({
            ...prev,
            limit: pageSize,
            page: 1,
          }));
        onRecordsPerPageChange && onRecordsPerPageChange(pageSize);
        setPageSize(pageSize);
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationData, initialRecords.length]);

  useEffect(() => {
    if (paginationData?.limit) {
      setPageSize(() => {
        const index = page_sizes.findIndex(
          (val) => val === paginationData?.limit
        );
        return index === -1 ? page_sizes[0] : page_sizes[index];
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationData]);

  useEffect(() => {
    setInitialRecords(data);
    setRecords(data);
  }, [data]);

  useEffect(() => {
    const sortedRecords = sortBy(initialRecords, sortStatus.columnAccessor);
    setRecords(
      sortStatus.direction === "desc" ? sortedRecords.reverse() : sortedRecords
    );
  }, [sortStatus, initialRecords]);

  return (
    <div className="datatables pagination-padding bg-white rounded-md overflow-hidden border border-[#ddd]">
      <DataTable
        borderRadius={"sm"}
        minHeight={minHeight ?? 250}
        className={`whitespace-nowrap table-hover ${classTable}`}
        withtableborder={"true"}
        withColumnBorders
        highlightOnHover
        noRecordsText={"Không tìm thấy dữ liệu"}
        verticalAlignment={verticalAlignment ?? "top"}
        noHeader={noHeader}
        idAccessor={idAccessor}
        pinLastColumn={pinLastColumn}
        rowExpansion={rowExpansion}
        fetching={fetching}
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={onSelectedRecordsChange}
        records={records}
        loaderSize="xs"
        columns={
          isNoStt
            ? column
            : [
                {
                  accessor: "index",
                  title: "STT",
                  textAlignment: "right",
                  width: 60,
                  render: (record: any) => {
                    return STT(paginationData, records.indexOf(record));
                  },
                },
                ...column,
              ]
        }
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        defaultColumnRender={(row: any, _: any, accessor: any): string => {
          let data = row[accessor as keyof typeof row];
          if (typeof data === "number") data = data.toString();
          return typeof data === "string" ? data : "-";
        }}
        {...(rest as any)}
        {...(isPagination ? configDataTable : {})}
      />
    </div>
  );
};

export default MantineTableCustom;

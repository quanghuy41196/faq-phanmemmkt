import { FileListProps } from "@/components/customFormField/UploadFileField";

export interface MktPaginationResponse<T> {
  count: number;
  page: number;
  limit: number;
  items: T[];
}

export interface IConfigSearchDefault {
  page?: number;
  limit?: number;
  includes?: string;
  categoryId?: string;
  productId?: string;
  groupId?: string;
}

export interface IFormDefault {
  name: string;
  slug?: string;
  file?: File;
  listFile?: FileListProps[];
}

export interface IFormUpdate<T> {
  id: string;
  payload: T;
}

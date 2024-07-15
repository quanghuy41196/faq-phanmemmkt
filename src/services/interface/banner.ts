import { IConfigSearchDefault, IFormDefault } from "./default";

export interface IBanner {
  id: string;
  link: string;
  image: string
  active: boolean;
  createdAt: string;
  updateAt: string;
}

export interface IFormBanner extends Pick<IFormDefault, "file" | "listFile"> {
  link?: string;
  active?: boolean
}

export interface ISearchBanner extends IConfigSearchDefault {}
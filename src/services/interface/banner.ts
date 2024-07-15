import { IConfigSearchDefault, IFormDefault } from "./default";

export interface IBanner {
  id: string;
  link: string;
  image: string
  createdAt: string;
  updateAt: string;
}

export interface IFormBanner extends Pick<IFormDefault, "file" | "listFile"> {
  link: string;
}

export interface ISearchBanner extends IConfigSearchDefault {}
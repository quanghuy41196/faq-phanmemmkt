import { IConfigSearchDefault } from "./default";

export interface ICategory {
  id: string;
  name: string;
  icon: string;
  createdAt: string;
  updateAt: string;
}


export interface ISearchCategory extends IConfigSearchDefault {}
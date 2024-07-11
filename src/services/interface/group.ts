import { IConfigSearchDefault } from "./default";

export interface IGroup {
  id: string;
  name: string;
  createdAt: string;
  updateAt: string;
}

export interface IFormGroup {
  name: string;
}

export interface IFormUpdateGroup extends IFormGroup {
  id: string;
}


export interface ISearchGroup extends IConfigSearchDefault {}
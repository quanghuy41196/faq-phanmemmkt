import { IConfigSearchDefault, IFormDefault } from "./default";

export interface IProduct {
  id: string;
  name: string;
  image: string;
  slug: string;
  description: string;
  createdAt: string;
  updateAt: string;
}

export interface IFormProduct extends IFormDefault {
  description?: string;
}

export interface ISearchProduct extends IConfigSearchDefault {
  name?: string;
}

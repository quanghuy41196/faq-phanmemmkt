import { IConfigSearchDefault, IFormDefault } from "./default";
import { IPost } from "./posts";

export interface ICategory {
  id: string;
  name: string;
  icon: string;
  slug: string;
  description: string;
  createdAt: string;
  updateAt: string;
  posts: IPost
}

export interface IFormCategory extends IFormDefault {
  description?: string;
  isDependent?: boolean
}

export interface ISearchCategory extends IConfigSearchDefault {}

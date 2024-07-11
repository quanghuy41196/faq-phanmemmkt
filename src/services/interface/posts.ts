import { ICategory } from "./category";
import { IConfigSearchDefault } from "./default";
import { IGroup } from "./group";
import { IProduct } from "./products";

export interface IPost {
  id: string;
  content: {
    content: string;
  };
  createdAt: string;
  updateAt: string;
  category?: ICategory;
  product?: IProduct;
  group?: IGroup;
  slug?: string
  title?: string
}

export interface IFormPost {
  productId: string;
  categoryId: string;
  basecontent: string;
  slug?: string;
  groupId?: string
  title?: string
  isDependent?: boolean
}

export interface IFormUpdatePost
  extends Omit<IFormPost, "basecontent">,
    Pick<IPost, "content" | "id" | "slug"> {}

export interface ISearchPosts extends IConfigSearchDefault {
  getContent?: boolean
}

import { ICategory } from "./category";
import { IConfigSearchDefault } from "./default";
export interface IPost {
  id: string;
  content: {
    content: string;
  };
  createdAt: string;
  updateAt: string;
  category?: ICategory;
  slug?: string
  title?: string
}

export interface IFormPost {
  categoryId: string;
  basecontent: string;
  slug?: string;
  title?: string
  isDependent?: boolean
}

export interface IFormUpdatePost
  extends Omit<IFormPost, "basecontent">,
    Pick<IPost, "content" | "id" | "slug"> {}

export interface ISearchPosts extends IConfigSearchDefault {
  getContent?: boolean
}

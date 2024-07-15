import { IConfigSearchDefault, IFormDefault } from "./default";

export interface IAds {
  active: boolean;
  createAt: string;
  id: string;
  image: string;
  link: string;
  position: true;
  updateAt: string;
}

export interface IFormAds extends Pick<IFormDefault, "file" | "listFile"> {
  link?: string;
  active?: boolean;
  position?: boolean
}

export interface ISearchAds extends IConfigSearchDefault {
  name?: string;
}

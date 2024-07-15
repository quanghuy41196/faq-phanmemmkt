import { CustomSelectProps } from "@/components/customFormField";
import { optionSelect } from "@/hooks/useSelect";
import { DataTableColumn } from "mantine-datatable";
import { Dispatch, SetStateAction } from "react";
import { IconType } from "react-icons";

export interface IModalDefaultProps {
  isShow?: boolean;
  setIsShow?: Dispatch<SetStateAction<boolean>>;
}

export type TDataColumnTable<T> = Array<DataTableColumn<T>>;

export interface configTableParams<T> {
  handleDelete?: (data?: T) => void;
  handleForm?: (data?: T) => void;
}

export type refSelect = {
  setOptions: Dispatch<SetStateAction<optionSelect[]>>;
  options: optionSelect[];
  renderOption?: (data: any[]) => optionSelect[];
  uniqueOption?: (data: any | any[]) => void;
};

export interface SelectScrollBaseProps extends Omit<CustomSelectProps, "name"> {
  name?: string;
  params?: any;
  enabled?: boolean;
  isDisableBehavior?: boolean;
  funRecall?: (data: any[]) => void;
  funCustomValue?: (value: any, options: any[]) => optionSelect[];
}

export interface slidebarConfigProps {
  title?: string;
  isHeader?: boolean;
  isNoRender?: boolean;
  path?: string;
  Icon?: IconType;
  children?: Omit<slidebarConfigProps, "Icon">[];
}

export interface renderSildebarArrayProps {
  configArraySildeBar?: slidebarConfigProps[];
}

export type returnNewConfigSildeBar = Omit<slidebarConfigProps, "children"> & {
  positionActive: number[];
};

export interface currentConfigSildBarParams<T> {
  slidebarArray: T[];
  newPathName?: string;
}

export interface configFooterChildrenType {
  link?: string;
  name?: string;
  isArrow?: boolean;
  isDots?: boolean;
  Icon?: IconType;
}

export interface configFooterType {
  head?: string;
  children?: configFooterChildrenType[];
  classParent?: string;
  classDivChild?: string;
  lastReactElement?: () => JSX.Element;
  innerReactElement?: () => JSX.Element;
}

export interface ConfigListMXHType {
  Icon?: IconType;
  color?: string;
  link?: string;
}

export interface listNavHeaderParmas {
  text: string;
  href: string;
  isBlank?: boolean;
}


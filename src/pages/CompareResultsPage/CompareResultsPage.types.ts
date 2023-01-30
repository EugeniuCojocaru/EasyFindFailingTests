import { Package } from "../../common/types";

export interface ResultType {
  file: File | undefined;
  label: string;
  os: OS | boolean;
}
export enum OS {
  Android,
  IOS,
}
export enum Result {
  Success,
  Fail,
  Skip,
  NaN,
}
export interface ResultMeta {
  success: number;
  fail: number;
  skip: number;
}
export interface ResultWithMeta {
  values: Array<Result>;
  meta: ResultMeta;
}
export interface ResultShowType {
  resultMap: Map<string, Package> | undefined;
  label: string;
  os: OS | boolean;
}

export const ResultTypeDefault: ResultType = {
  file: undefined,
  label: "",
  os: OS.IOS,
};

export const ResultMetaDefault: ResultMeta = {
  success: 0,
  fail: 0,
  skip: 0,
};

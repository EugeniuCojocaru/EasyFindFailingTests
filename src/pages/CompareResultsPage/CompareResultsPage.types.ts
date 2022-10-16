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
  Skyp,
  NaN,
}
export type ReportMapType = Map<string, Map<string, Array<Result>>>;
export interface ResultShowType {
  file: Map<string, Package> | undefined;
  label: string;
  os: OS | boolean;
}

export const ResultTypeDefault: ResultType = {
  file: undefined,
  label: "",
  os: OS.Android,
};

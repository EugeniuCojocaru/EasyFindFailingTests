export type Package = {
  success?: Array<string>;
  fail?: Array<string>;
  skip?: Array<string>;
};
export const PackageDefault: Package = {
  success: [],
  fail: [],
  skip: [],
};

export type FilterOption ={
  isOnlyPacks: boolean;
  isFailed: boolean;
  isSkipped: boolean;
}
export const FilterOptionDefault: FilterOption = {
  isFailed: true,
  isOnlyPacks: false,
  isSkipped: false,
};

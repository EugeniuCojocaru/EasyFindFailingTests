export type Package = {
  success?: Array<string>;
  fail?: Array<string>;
  skip?: Array<string>;
  diff?: Array<string>;
};

export type FilterOption ={
  isOnlyPacks: boolean;
  isFailed: boolean;
  isSkipped: boolean;
  isValid: boolean;
  isDiff?: boolean;
}

export const PACKAGE_DEFAULT: Package = {
  success: [],
  fail: [],
  skip: [],
  diff: [],
};

export const FILTER_OPTIONS_DEFAULT: FilterOption = {
  isFailed: true,
  isOnlyPacks: false,
  isSkipped: false,
  isValid: false,
  isDiff: false
};

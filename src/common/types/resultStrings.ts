export type Package = {
  success?: Array<string>;
  fail?: Array<string>;
  skip?: Array<string>;
};

export type FilterOption ={
  isOnlyPacks: boolean;
  isFailed: boolean;
  isSkipped: boolean;
  isValid: boolean;
}

export const PACKAGE_DEFAULT: Package = {
  success: [],
  fail: [],
  skip: [],
};

export const FILTER_OPTIONS_DEFAULT: FilterOption = {
  isFailed: true,
  isOnlyPacks: false,
  isSkipped: false,
  isValid: false
};

export type Package = {
  success: Array<string>;
  fail: Array<string>;
  skip: Array<string>;
};

export type ResultsMap = {
  [key: string]: Package;
};

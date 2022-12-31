import { Result } from "../../pages/CompareResultsPage/CompareResultsPage.types";
export enum SortType {
  Ascending,
  Descending,
}

const arrayAlphabeticSort = (
  a: string,
  b: string,
  sortType: SortType
): number => {
  const string1 = a.toLowerCase();
  const string2 = b.toLowerCase();

  if (string1 > string2) return sortType === SortType.Ascending ? 1 : -1;
  if (string1 < string2) return sortType === SortType.Ascending ? -1 : 1;
  return 0;
};

const sortMap = <T>(map: Map<string, T>): Map<string, T> => {
  const unsortedArray = [...map];
  const sortedArray = unsortedArray.sort(([key1], [key2]) =>
    arrayAlphabeticSort(key1, key2, SortType.Ascending)
  );
  const sortedMap = new Map(sortedArray);
  return sortedMap;
};

export const sortState = (
  map: Map<string, Map<string, Array<Result>>> | undefined
) => {
  if (map) {
    map.forEach((value, key) => {
      map.set(key, sortMap(value));
    });
    return sortMap(map);
  }
};

import { FilterOption, Package, PACKAGE_DEFAULT } from "../types";
import {
  Result,
  ResultMetaDefault,
  ResultShowType,
  ResultType,
  ResultWithMeta,
} from "../../pages/CompareResultsPage/CompareResultsPage.types";

const failTestsTemplate = " [x] FAIL";
const skipTestsTemplate = " [-] SKIPPED";
const diffTestsTemplate = " [?] DIFF";
const testPackageTemplate = "CLASS: ";
const testEndTemplate = "<";
const testStartTemplate = "--> ";

export const createResultsMap = async (
  file: File | undefined,
  setResult: (map: Map<string, Package> | undefined) => void
) => {
  if (file) {
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = () => {
      const text = reader.result;
      setResult(parseFile(text));
    };
  }
  setResult(undefined);
};

export const createCompareResultsMap = async (
  report: ResultType,
  setResult: (map: ResultShowType | undefined) => void
) => {
  if (report.file) {
    const reader = new FileReader();
    reader.readAsText(report.file, "UTF-8");
    reader.onload = () => {
      const text = reader.result;
      setResult({ ...report, resultMap: parseFile(text) });
    };
  }
  setResult(undefined);
};

const parseFile = (
  text: string | ArrayBuffer | null
): Map<string, Package> | undefined => {
  if (text && typeof text === "string") {
    let resultsMap = new Map<string, Package>();

    let packages = text.split(testPackageTemplate);
    packages = packages.slice(1);

    packages.forEach((item) => {
      const packageName = item.substring(0, item.indexOf(testEndTemplate));
      const tests = item.split(testStartTemplate);

      let packageEntry = resultsMap.get(packageName);
      if (!packageEntry) {
        resultsMap.set(packageName, PACKAGE_DEFAULT);
      }

      for (let testIndex = 1; testIndex < tests.length; testIndex++) {
        const testName = tests[testIndex].substring(
          0,
          tests[testIndex].indexOf(testEndTemplate)
        );
        packageEntry = resultsMap.get(packageName);
        if (testName.includes(failTestsTemplate)) {
          resultsMap.set(packageName, {
            ...packageEntry,
            fail: [
              ...(packageEntry?.fail || []),
              testName.split(failTestsTemplate)[0],
            ],
          });
        } else {
          if (testName.includes(skipTestsTemplate)) {
            resultsMap.set(packageName, {
              ...packageEntry,
              skip: [
                ...(packageEntry?.skip || []),
                testName.split(skipTestsTemplate)[0],
              ],
            });
          } else {
            if (testName.includes(diffTestsTemplate)) {
              resultsMap.set(packageName, {
                ...packageEntry,
                diff: [
                  ...(packageEntry?.skip || []),
                  testName.split(diffTestsTemplate)[0],
                ],
              });
            } else {
              resultsMap.set(packageName, {
                ...packageEntry,
                success: [...(packageEntry?.success || []), testName.trim()],
              });
            }
          }
        }
      }
    });
    return resultsMap;
  }
  return undefined;
};

const createStringOutOfArray = (
  array: Array<string>,
  defaultValue: string
): string =>
  array.reduce((fullString, value) => `${fullString}+${value}`, defaultValue);

export const getStringWithFilters = (
  resultsMap: Map<string, Package> | undefined,
  filters: FilterOption,
  selectedPacks: Array<string>
): string => {
  let result = "";
  if (resultsMap) {
    resultsMap.forEach((value, key) => {
      if (filters.isOnlyPacks) {
        if (
          (filters.isFailed && value.fail && value.fail.length > 0) ||
          (filters.isSkipped && value.skip && value.skip.length > 0) ||
          (filters.isDiff && value.diff && value.diff.length > 0) ||
          (filters.isValid && value.success && value.success.length > 0)
        )
          result = `${result}+${key}`;
      } else {
        if (selectedPacks.length === 0 || selectedPacks.includes(key)) {
          if (filters.isFailed && value.fail && value.fail.length > 0)
            result = createStringOutOfArray(value.fail, result);
          if (filters.isSkipped && value.skip && value.skip.length > 0)
            result = createStringOutOfArray(value.skip, result);
          if (filters.isDiff && value.diff && value.diff.length > 0)
            result = createStringOutOfArray(value.diff, result);
          if (filters.isValid && value.success && value.success.length > 0)
            result = createStringOutOfArray(value.success, result);
        }
      }
    });
  }
  return result.substring(1, result.length);
};

export const createShow2 = (
  array: Array<ResultShowType | undefined>
): Map<string, Map<string, ResultWithMeta>> => {
  const a = new Map<string, Map<string, ResultWithMeta>>();
  array.forEach((item, index) => {
    if (item) {
      const { resultMap } = item;
      if (resultMap) {
        resultMap.forEach((value, key) => {
          const { success, fail, skip, diff } = value;
          const pack = a.get(key);
          if (pack) {
            success?.forEach((test) => {
              const packTest = pack.get(test);
              if (packTest) {
                packTest.values[index] = Result.Success;
                packTest.meta.success++;
              } else {
                const arr = new Array<Result>();
                arr[index] = Result.Success;
                pack.set(test, {
                  values: arr,
                  meta: { ...ResultMetaDefault, success: 1 },
                });
              }
            });
            fail?.forEach((test) => {
              const packTest = pack.get(test);
              if (packTest) {
                packTest.values[index] = Result.Fail;
                packTest.meta.fail++;
              } else {
                const arr = new Array<Result>();
                arr[index] = Result.Fail;
                pack.set(test, {
                  values: arr,
                  meta: { ...ResultMetaDefault, fail: 1 },
                });
              }
            });
            skip?.forEach((test) => {
              const packTest = pack.get(test);
              if (packTest) {
                packTest.values[index] = Result.Skip;
                packTest.meta.skip++;
              } else {
                const arr = new Array<Result>();
                arr[index] = Result.Skip;
                pack.set(test, {
                  values: arr,
                  meta: { ...ResultMetaDefault, skip: 1 },
                });
              }
            });
            diff?.forEach((test) => {
              const packTest = pack.get(test);
              if (packTest) {
                packTest.values[index] = Result.Diff;
                packTest.meta.diff++;
              } else {
                const arr = new Array<Result>();
                arr[index] = Result.Diff;
                pack.set(test, {
                  values: arr,
                  meta: { ...ResultMetaDefault, diff: 1 },
                });

              }
            });
          } else {
            const pack2 = new Map<string, ResultWithMeta>();
            success?.forEach((test) => {
              const arr = new Array<Result>();
              arr[index] = Result.Success;
              pack2.set(test, {
                values: arr,
                meta: { ...ResultMetaDefault, success: 1 },
              });
            });
            fail?.forEach((test) => {
              const arr = new Array<Result>();
              arr[index] = Result.Fail;
              pack2.set(test, {
                values: arr,
                meta: { ...ResultMetaDefault, fail: 1 },
              });
            });
            skip?.forEach((test) => {
              const arr = new Array<Result>();
              arr[index] = Result.Skip;
              pack2.set(test, {
                values: arr,
                meta: { ...ResultMetaDefault, skip: 1 },
              });
            });
            diff?.forEach((test) => {
              const arr = new Array<Result>();
              arr[index] = Result.Diff;
              pack2.set(test, {
                values: arr,
                meta: { ...ResultMetaDefault, diff: 1 },
              });

            });

            a.set(key, pack2);
          }
        });
      }
    }
  });
  return a;
};

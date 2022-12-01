import { FilterOption, Package, PackageDefault } from "../types";
import {
  Result,
  ResultShowType,
  ResultType,
} from "../../pages/CompareResultsPage/CompareResultsPage.types";
import { fileURLToPath } from "url";

const failTestsTemplate = " [x] FAIL";
const skipTestsTemplate = " [-] SKIPPED";
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
        resultsMap.set(packageName, PackageDefault);
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
            resultsMap.set(packageName, {
              ...packageEntry,
              success: [...(packageEntry?.success || []), testName.trim()],
            });
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
  filters: FilterOption
): string => {
  let result = "";
  if (resultsMap) {
    resultsMap.forEach((value, key) => {
      if (filters.isOnlyPacks) {
        if (
          (filters.isFailed && value.fail && value.fail.length > 0) ||
          (filters.isSkipped && value.skip && value.skip.length > 0) ||
          (filters.isValid && value.success && value.success.length > 0)
        )
          result = `${result}+${key}`;
      } else {
        if (filters.isFailed && value.fail && value.fail.length > 0)
          result = createStringOutOfArray(value.fail, result);
        if (filters.isSkipped && value.skip && value.skip.length > 0)
          result = createStringOutOfArray(value.skip, result);
        if (filters.isValid && value.success && value.success.length > 0)
          result = createStringOutOfArray(value.success, result);
      }
    });
  }
  return result.substring(1, result.length);
};

export const createShow = (array: Array<ResultShowType | undefined>): Map<string, Map<string, Array<Result>>> => {
  const a = new Map<string, Map<string, Array<Result>>>();
  array.forEach((item, index) => {
    if (item) {
      const { resultMap } = item;
      if (resultMap) {
        resultMap.forEach((value, key) => {
          const pack = a.get(key);
          const { success, fail, skip } = value;
          if (pack) {
            success?.forEach((test) => {
              const packTest = pack.get(test);
              if (packTest) {
                packTest[index] = Result.Success;
              } else {
                const arr = new Array<Result>();
                arr[index] = Result.Success;
                pack.set(test, arr);
              }
            });
            fail?.forEach((test) => {
              const packTest = pack.get(test);
              if (packTest) {
                packTest[index] = Result.Fail;
              } else {
                const arr = new Array<Result>();
                arr[index] = Result.Fail;
                pack.set(test, arr);
              }
            });
            skip?.forEach((test) => {
              const packTest = pack.get(test);
              if (packTest) {
                packTest[index] = Result.Skip;
              } else {
                const arr = new Array<Result>();
                arr[index] = Result.Skip;
                pack.set(test, arr);
              }
            });
          } else {
            const pack2 = new Map<string, Array<Result>>();
            success?.forEach((test) => {
              const arr = new Array<Result>();
              arr[index] = Result.Success;
              pack2.set(test, arr);
            });
            fail?.forEach((test) => {
              const arr = new Array<Result>();
              arr[index] = Result.Fail;
              pack2.set(test, arr);
            });
            skip?.forEach((test) => {
              const arr = new Array<Result>();
              arr[index] = Result.Skip;
              pack2.set(test, arr);
            });

            a.set(key, pack2);
          }
        });
      }
    }
  });
  return a;
};

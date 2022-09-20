import { FilterOption, Package, PackageDefault } from "../types";

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
          (filters.isSkipped && value.skip && value.skip.length > 0)
        )
          result = `${result}+${key}`;
      } else {
        if (filters.isFailed && value.fail && value.fail.length > 0)
          result = createStringOutOfArray(value.fail, result);
        if (filters.isSkipped && value.skip && value.skip.length > 0)
          result = createStringOutOfArray(value.skip, result);
      }
    });
  }
  return result.substring(1, result.length);
};

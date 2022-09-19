import { FilterOption, Package, PackageDefault } from "../types";

const failTestsTemplate = " [x] FAIL";
const skipTestsTemplate = " [-] SKIPPED";
const testPackageTemplate = "CLASS: ";
const testEndTemplate = "<";
const testStartTemplate = "--> ";
export const createResultsMap = (
  file: File | undefined
): Map<string, Package> | undefined => {
  if (file) {
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = () => {
      const text = reader.result;
      return parseFile(text);
    };
  }
  return undefined;
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

export const getStringWithFilters = (resultsMap: Map<string, Package> | undefined, filters: FilterOption): string =>{
  const result = "";

  return result;
}

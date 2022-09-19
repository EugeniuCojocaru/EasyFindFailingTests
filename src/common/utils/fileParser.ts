import { ResultsMap } from "../types";

const getCorrectRegexConsideringSkipState = (skipState: boolean) => {
  return skipState ? / \[x\]|\[-\] /g : / \[x\] /g;
};

const createResultsMap = (file: File | undefined): ResultsMap | undefined => {
  if (file) {
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = () => {
      const text = reader.result;
      parseFile(text);
    };
  }
  return undefined;
};

const parseFile = (text: string | ArrayBuffer | null) => {
  if (text && typeof text === "string") {
    const skipTestsRegex = / \[x\] /g;
    const regexForExtractingNamesOfFailedAndSkipedTests = /<\/a(\\n)?( )*>/;
    let a = text.split(">--&gt;");
    a = a.slice(1);
    a.forEach((item) => {
        if (item.includes("[x]") || (isSkipChecked && item.includes("[-]"))) {
          const b = item.split(regexForExtractingNamesOfFailedAndSkipedTests);
          const c = b[0].split(regexForExtractingNamesOfTests);
          correctString.push(c[0].trim());
        }
      });
  }
};
const getTestNames = (file) => {

  const correctString = [];
  let a = file.split(">--&gt;");
  a = a.slice(1);
  a.forEach((item) => {
    if (item.includes("[x]") || (isSkipChecked && item.includes("[-]"))) {
      const b = item.split(regexForExtractingNamesOfFailedAndSkipedTests);
      const c = b[0].split(regexForExtractingNamesOfTests);
      correctString.push(c[0].trim());
    }
  });
  let finalListOfFailingE2Es = "";
  correctString.forEach((item, index) => {
    if (index === 0) {
      finalListOfFailingE2Es = finalListOfFailingE2Es.concat(item);
    } else {
      finalListOfFailingE2Es = finalListOfFailingE2Es.concat(`+${item}`);
    }
  });

  document.getElementById("response").innerText = finalListOfFailingE2Es;
};

const createString = () => {
  const selectedFile = document.getElementById("file_input")?.files[0];
  if (!selectedFile) alert("aaaa");
  else {
    let reader = new FileReader();
    reader.readAsText(selectedFile, "UTF-8");
    reader.onload = () => {
      let text = reader.result;
      getTestNames(text.trim());
    };
  }
};
const button = document.getElementById("create_string_button");
button.addEventListener("click", createString);

export {};

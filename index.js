const getSkippedTestsState = () => {
  return document.getElementById("skip").checked;
};
const getCorrectRegexConsideringSkipState = (skipState) => {
  return skipState ? / \[x\]|\[\-\] /g : / \[x\] /g;
};
const getTestNames = (file) => {
  const isSkipChecked = getSkippedTestsState();
  const regexForExtractingNamesOfFailedAndSkipedTests = /<\/a(\\n)?( )*>/;
  const regexForExtractingNamesOfTests =
    getCorrectRegexConsideringSkipState(isSkipChecked);
  const correctString = [];
  let a = file.split(">--&gt;");
  a = a.slice(1);
  a.forEach((item) => {
    if (item.includes("[x]") || (isSkipChecked && item.includes("[-]"))) {
      const b = item.split(regexForExtractingNamesOfFailedAndSkipedTests);
      const c = b[0].split(regexForExtractingNamesOfTests);
      correctString.push(c[0]);
    }
  });
  let finalListOfFailingE2Es = "";
  correctString.forEach((item, index) => {
    if (index === 0) {
      finalListOfFailingE2Es = finalListOfFailingE2Es.concat(item.slice(1));
    } else {
      finalListOfFailingE2Es = finalListOfFailingE2Es.concat(
        `+${item.slice(1)}`
      );
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

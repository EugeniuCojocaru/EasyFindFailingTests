import React, { useEffect, useState } from "react";

import {
  createCompareResultsMap,
  createResultsMap,
  createShow,
} from "../../common/utils/fileParser";
import { sortState } from "../../common/utils/mapSort";
import { Header } from "../../components/CompareResults";
import { Result, ResultShowType, ResultType } from "./CompareResultsPage.types";
import { ResultContent } from "./ResultContent";
import { ResultsContainer } from "./ResultContentWrapper.styles";
export interface Props {
  array: Array<ResultType>;
}
export const ResultContentWrapper: React.FC<Props> = ({ array }) => {
  const [state, setState] = useState<Array<ResultShowType | undefined>>([]);
  const [result, setResult] =
    useState<Map<string, Map<string, Array<Result>>>>();
  const updateState = (value: ResultShowType | undefined) => {
    setState([...state, value]);
  };
  useEffect(() => {
    array.forEach((value) => {
      if (value) {
        createCompareResultsMap(value, updateState);
      }
    });
  }, [array]);

  useEffect(() => {
    setResult(sortState(createShow(state)));
  }, [state]);

  const getInfoForHeader = () => {
    console.log("Getting info");
    const infoArray = array.map(({ os, label }) => ({ os, label }));
    console.log({ infoArray, array });
    return infoArray;
  };
  return (
    <ResultsContainer>
       
        <Header info={getInfoForHeader()} />
      ResultContentWrapper
      <ResultContent resultMap={result || new Map()} />
    </ResultsContainer>
  );
};

import React, { useEffect, useState } from "react";

import {
  createCompareResultsMap,
  createResultsMap,
  createShow,
} from "../../common/utils/fileParser";
import { Result, ResultShowType, ResultType } from "./CompareResultsPage.types";
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

  useEffect(() =>{
    setResult(createShow(state));
  },[state])
  return <div>ResultContentWrapper</div>;
};

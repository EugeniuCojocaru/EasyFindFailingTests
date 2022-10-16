import { create } from "domain";
import React, { useEffect, useState } from "react";
import { Package } from "../../common/types";
import {
  createCompareResultsMap,
  createResultsMap,
} from "../../common/utils/fileParser";
import { ResultShowType, ResultType } from "./CompareResultsPage.types";

export const ResultContentWrapper: React.FC<Array<ResultType>> = (
  array: Array<ResultType>
) => {
  const [state, setState] = useState<Array<ResultShowType | undefined>>([]);

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

  return <div>ResultContentWrapper</div>;
};

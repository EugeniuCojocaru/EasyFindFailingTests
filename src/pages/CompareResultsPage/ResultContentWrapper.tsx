import React, { useEffect, useState } from "react";

import {
  createCompareResultsMap,
  createShow2,
} from "../../common/utils/fileParser";
import { sortState } from "../../common/utils/mapSort";
import { Header } from "../../components/CompareResults";
import { ResultShowType, ResultType, ResultWithMeta } from "./CompareResultsPage.types";
import { ResultContent } from "./ResultContent";
import { ResultsContainer } from "./ResultContentWrapper.styles";
export interface Props {
  array: Array<ResultType>;
  handleRemoveEntry: (index: number) => void;
}
export const ResultContentWrapper: React.FC<Props> = ({
  array,
  handleRemoveEntry,
}) => {
  const [state, setState] = useState<Array<ResultShowType | undefined>>([]);
  const [removedItem, setRemovedItem] = useState<number | undefined>(undefined);
  const [result, setResult] =
    useState<Map<string, Map<string, ResultWithMeta>>>();

  const updateState = (value: ResultShowType | undefined) => {
    setState([...state, value]);
  };

  useEffect(() => {
    if (array.length < state.length && removedItem !== undefined) {
      setState([...state.filter((_, index) => index !== removedItem)]);
    } else {
      array.forEach((value) => {
        if (value) {
          createCompareResultsMap(value, updateState);
        }
      });
    }
  }, [array]);

  useEffect(() => {
    setResult(sortState(createShow2(state)));
  }, [state]);

  const getInfoForHeader = () => {
    const infoArray = array.map(({ os, label }) => ({ os, label }));
    return infoArray;
  };

  const handleRemove = (indexResult: number) => {
    setRemovedItem(indexResult);
    handleRemoveEntry(indexResult);
  };
  return (
    <ResultsContainer>
      <ResultContent
        resultMap={result || new Map()}
        noElements={state.length}
      />
      <Header info={getInfoForHeader()} handleRemoveEntry={handleRemove} />
    </ResultsContainer>
  );
};

import React, { useEffect, useState } from "react";
import { ResultShowType, ResultType } from "./CompareResultsPage.types";

export const ResultContentWrapper: React.FC<Array<ResultType>> = (
  array: Array<ResultType>
) => {
  const [state, setState] = useState<Array<ResultShowType>>([]);

  useEffect(() => {
    array.forEach((value) =>{
        
    })
  }, [array])
  
  return <div>ResultContentWrapper</div>;
};

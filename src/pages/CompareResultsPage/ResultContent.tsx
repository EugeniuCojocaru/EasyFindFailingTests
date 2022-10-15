import React, { useState } from 'react'
import { ResultShowType, ResultType } from './CompareResultsPage.types'


export const ResultContent:React.FC<ResultType> = () => {
    const [state, setState] = useState<Array<ResultShowType>>([])
    
  return (
    <div>ResultContent</div>
  )
}

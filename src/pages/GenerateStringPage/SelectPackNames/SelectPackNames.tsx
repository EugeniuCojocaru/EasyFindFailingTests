import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Package } from "../../../common/types";

type Props = {
  resultMap: Map<string, Package> | undefined;
};

type SelectType = {
  label: string;
  value: string;
};
export const SelectPackNames = ({ resultMap }: Props) => {
  const [state, setState] = useState<Array<SelectType>>([]);

  useEffect(() => {
    if (resultMap) setState(mapToLabel(resultMap));
  }, [resultMap]);

  return (
    <Autocomplete
      multiple
      disablePortal
      id="combo-box-demo"
      options={state}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Pack" />}
      onChange = {(e) => console.log(e)}
    />
  );
};

const mapToLabel = (map: Map<string, Package>) => {
  const arr: SelectType[] = [];
  for (const [key, _] of map) {
    arr.push({ label: key, value: key });
  }
  return arr;
};

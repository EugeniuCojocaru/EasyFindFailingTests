import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Package } from "../../../common/types";

type Props = {
  data: Array<SelectType> | undefined;
  setValue: (newData: Array<SelectType>) => void;
};

export type SelectType = {
  label: string;
  value: string;
};
export const SelectPackNames = ({ data, setValue }: Props) => {
  return (
    <Autocomplete
      multiple
      disablePortal
      id="combo-box-demo"
      options={data || []}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Pack" variant="standard" />
      )}
      onChange={(_, value) => setValue(value)}
    />
  );
};

export const mapToLabel = (map: Map<string, Package>) => {
  const arr: SelectType[] = [];
  for (const [key] of map) {
    arr.push({ label: key, value: key });
  }
  return arr;
};

export const mapSelectTypeToArray = (data: Array<SelectType>) =>
  data.map(({ value }) => value);

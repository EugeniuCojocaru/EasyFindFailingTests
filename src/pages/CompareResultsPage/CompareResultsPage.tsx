import {
  Button,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { InputArea, PageContainer } from "./CompareResultsPage.styles";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { OS, ResultType, ResultTypeDefault } from "./CompareResultsPage.types";
import { colors } from "../../common/styles/styles";
import { Layout } from "../../components/Layout";
import { ResultContentWrapper } from "./ResultContentWrapper";

export const CompareResultsPage = () => {
  const [state, setState] = useState<Array<ResultType>>([]);
  const [inputState, setInputState] = useState<ResultType>(ResultTypeDefault);
  const { file, label, os } = inputState;

  const handleAddFile = (event: any) => {
    const file = event.target.files[0];
    setInputState({ ...inputState, file: file || undefined });
  };

  
  const handleRemoveResults = (indexResults: number) => {
    const values = state.filter((_, index) => index !== indexResults);
    setState(values);
  };

  return (
    <Layout>
      <PageContainer>
        <InputArea>
          <IconButton component="label" onChange={(e: any) => handleAddFile(e)}>
            <input hidden accept=".html" type="file" />
            <UploadFileIcon fill={file ? colors.navigator : undefined} />
          </IconButton>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>Android</Typography>
            <Switch
              defaultChecked
              value={os}
              onChange={(e) => {
                setInputState({
                  ...inputState,
                  os: e.target.checked ? OS.IOS : OS.Android,
                });
              }}
            />
            <Typography>IOS</Typography>
          </Stack>
          <TextField
            label="Label"
            value={label}
            variant="standard"
            onChange={(e) =>
              setInputState({ ...inputState, label: e.target.value })
            }
          />
          <Button
            onClick={() => {
              if (file && label && state.length < 4) {
                setState([...state, inputState]);
              }
            }}
          >
            Add
          </Button>
        </InputArea>
        <ResultContentWrapper
          array={state}
          handleRemoveEntry={handleRemoveResults}
        />
      </PageContainer>
    </Layout>
  );
};

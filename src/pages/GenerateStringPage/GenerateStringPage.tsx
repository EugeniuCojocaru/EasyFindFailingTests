import { Switch } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import {
  OptionContainer,
  PageContainer,
  OptionsContainer,
  ResultContainer,
  Row,
  ResultTextContainer,
} from "./GenerateStringPage.styles";

import { DragAndDropInput } from "../../components/DragAndDropInput";
import {
  createResultsMap,
  getStringWithFilters,
} from "../../common/utils/fileParser";
import { FilterOption, FilterOptionDefault, Package } from "../../common/types";

export const GenerateStringPage = () => {
  const [state, setState] = useState<FilterOption>(FilterOptionDefault);
  const { isFailed, isOnlyPacks, isSkipped } = state;
  const [file, setFile] = useState<File | undefined>();
  const [resultMap, setResultMap] = useState<Map<string, Package> | undefined>(
    undefined
  );
  const [resultString, setResultString] = useState<string>("");
  const updateState = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.checked });
  };

  useEffect(() => {
    createResultsMap(file, setResultMap);
  }, [file, setFile]);
  useEffect(() => {
    setResultString(getStringWithFilters(resultMap, state));
  }, [state, resultMap]);

  const handleFile = (file: File | undefined) => {
    setFile(file);
  };

  return (
    <Layout>
      <PageContainer>
        <h2>Generate string with failed tests names</h2>
        <Row>
          <OptionsContainer>
            <h3>Filter options</h3>
            <OptionContainer>
              <Switch
                checked={isOnlyPacks}
                name="isOnlyPacks"
                onChange={updateState}
              />
              <h4>Only packs</h4>
            </OptionContainer>
            <OptionContainer>
              <Switch
                checked={isFailed}
                name="isFailed"
                onChange={updateState}
              />
              <h4>Failed tests</h4>
            </OptionContainer>
            <OptionContainer>
              <Switch
                checked={isSkipped}
                name="isSkipped"
                onChange={updateState}
              />
              <h4>Skipped tests</h4>
            </OptionContainer>
            <h3>Upload the index.html</h3>

            <DragAndDropInput handleDragAndDrop={handleFile} />
          </OptionsContainer>

          <ResultContainer>
            <h3>Result</h3>
            <ResultTextContainer>{resultString}</ResultTextContainer>
          </ResultContainer>
        </Row>
      </PageContainer>
    </Layout>
  );
};

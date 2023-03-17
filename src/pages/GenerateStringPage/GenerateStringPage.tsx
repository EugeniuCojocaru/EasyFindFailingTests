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

import {
  FilterOption,
  FILTER_OPTIONS_DEFAULT,
  Package,
} from "../../common/types";
import {
  mapSelectTypeToArray,
  mapToLabel,
  SelectPackNames,
  SelectType,
} from "./SelectPackNames/SelectPackNames";

export const GenerateStringPage = () => {
  const [state, setState] = useState<FilterOption>(FILTER_OPTIONS_DEFAULT);
  const { isFailed, isOnlyPacks, isSkipped, isValid, isDiff } = state;
  const [file, setFile] = useState<File | undefined>();
  const [resultMap, setResultMap] = useState<Map<string, Package> | undefined>(
    undefined
  );
  const [resultString, setResultString] = useState<string>("");
  const [selectedPacks, setSelectedPacks] = useState<Array<SelectType>>([]);

  const updateState = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.checked });
  };

  useEffect(() => {
    createResultsMap(file, setResultMap);
  }, [file, setFile]);

  useEffect(() => {
    setResultString(getStringWithFilters(resultMap, state, mapSelectTypeToArray(selectedPacks)));
  }, [state, resultMap, selectedPacks]);

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
            <OptionContainer>
              <Switch checked={isValid} name="isValid" onChange={updateState} />
              <h4>Success tests</h4>
            </OptionContainer>
            <OptionContainer>
              <Switch checked={isDiff} name="isDiff" onChange={updateState} />
              <h4>Diff tests</h4>
            </OptionContainer>
            {resultMap && !isOnlyPacks && (
              <>
                <h3>Pick packs</h3>
                <OptionsContainer>
                  <SelectPackNames
                    data={mapToLabel(resultMap)}
                    setValue={setSelectedPacks}
                  />
                </OptionsContainer>
              </>
            )}
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

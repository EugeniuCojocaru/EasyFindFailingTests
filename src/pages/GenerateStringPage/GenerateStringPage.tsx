import { Switch, Button } from "@mui/material";
import React from "react";
import { Layout } from "../../components/Layout";
import {
  OptionContainer,
  PageContainer,
  OptionsContainer,
  ResultContainer,
} from "./GenerateStringPage.styles";
import UploadIcon from "@mui/icons-material/Upload";
export const GenerateStringPage = () => {
  return (
    <Layout>
      <PageContainer>
        <h2>Generate string with failed tests names</h2>
        <OptionsContainer>
          <h3>Options</h3>
          <OptionContainer>
            <Switch />
            <h4>Failed tests</h4>
          </OptionContainer>
          <OptionContainer>
            <Switch />
            <h4>Skipped tests</h4>
          </OptionContainer>
          <h3>Upload the index.html</h3>
          <Button startIcon={<UploadIcon />} component="label">
            Upload file
            <input hidden accept=".html" type="file" />
          </Button>
        </OptionsContainer>
        <ResultContainer></ResultContainer>
      </PageContainer>
    </Layout>
  );
};

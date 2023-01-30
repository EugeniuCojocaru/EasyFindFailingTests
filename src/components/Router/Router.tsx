import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CompareResultsPage } from "../../pages/CompareResultsPage";
import { PATHS } from "../../common/constants";
import { DashboardPage } from "../../pages/dashboard/DashboardPage";
import { GenerateStringPage } from "../../pages/GenerateStringPage";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path={PATHS.default} element={<GenerateStringPage />} />
      <Route path={PATHS.dashboard} element={<DashboardPage />} />
      <Route path={PATHS.stringForTests} element={<GenerateStringPage />} />
      <Route path={PATHS.compareTests} element={<CompareResultsPage />} />
      <Route path={PATHS.other} element={<DashboardPage />} />
    </Routes>
  </BrowserRouter>
);

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PATHS } from "../../common/utils";
import { DashboardPage } from "../../pages/dashboard/DashboardPage";
import { GenerateStringPage } from "../../pages/GenerateStringPage";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path={PATHS.default} element={<DashboardPage />} />
      <Route path={PATHS.dashboard} element={<DashboardPage />} />
      <Route path={PATHS.stringForTests} element={<GenerateStringPage />} />
      {/*
      <Route path="/syllabus/add" element={<AddSyllabusPage />} />
      <Route path="/institution" element={<InstitutionPage />} />
      <Route path="/subjects" element={<SubjectPage />} />
      <Route path="/teachers" element={<TeacherPage />} />
      <Route path="/audit" element={<AuditPage />} /> */}
    </Routes>
  </BrowserRouter>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import AppShell from "./components/AppShell";
import Dashboard from "./app/dashboard/Dashboard";
import Trials from "./app/trials/Trials";
import Recruitment from "./app/recruitment/Recruitment";
import Costs from "./app/dashboard/CostByCategoryChart"; // temporarily disabled (no default export)
import Forecasts from "./app/forecasts/Forecasts";
import Reports from "./app/reports/Reports";
import Admin from "./app/admin/Admin";
import LoginPage from "./app/login/loginpage";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppShell>
        <Routes>
          {/* Default: go to login first */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Login page */}
          <Route path="/login" element={<LoginPage />} />

          {/* App pages */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trials" element={<Trials />} />
          <Route path="/recruitment" element={<Recruitment />} />
          {/* <Route path="/costs" element={<Costs />} /> */}
          <Route path="/forecasts" element={<Forecasts />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  </React.StrictMode>
);

import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "../pages/Register/RegisterPage";
import LoginPage from "../pages/Login/LoginPage";

export default function AppRoutes() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

      </Routes>

    </BrowserRouter>
  );

}
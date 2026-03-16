import { BrowserRouter, Routes, Route } from "react-router-dom"

import LoginPage from "../pages/Login/LoginPage"
import RegisterPage from "../pages/Register/RegisterPage"
import HomePage from "../pages/Home/HomePage"

import ProtectedRoute from "./ProtectedRoute"
import PublicRoute from "./PublicRoute"
import TripDetailsPage from "../components/trips/TripDetails"

export default function AppRoutes() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/trip/:tripId" 
        element={
          <ProtectedRoute>
              <TripDetailsPage />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>

  )

}
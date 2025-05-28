import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import FormPage from "./pages/FormPage";
import HelpPage from "./pages/HelpPage";
import DashboardPage from "./pages/DashboardPage";
import AgencyPage from "./pages/AgencyPage";
import CategoryPage from "./pages/CategoryPage";
import LoginRegisterForm from "./pages/LoginRegisterForm";
import ProtectedRoute from "./utils/ProtectedRoute";
import TrackingPage from "./pages/TrackingPage";
import AdminProfilePage from "./pages/AdminProfilePage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/bantuan" element={<HelpPage />} />
        <Route path="/tracking" element={<TrackingPage />} />
        <Route path="/admin" element={<LoginRegisterForm />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/agency"
          element={
            <ProtectedRoute>
              <AgencyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/category"
          element={
            <ProtectedRoute>
              <CategoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute>
              <AdminProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

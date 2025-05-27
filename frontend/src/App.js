import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import FormPage from "./pages/FormPage";
import HelpPage from "./pages/HelpPage";
import DashboardPage from "./pages/DashboardPage";
import AgencyPage from "./pages/AgencyPage";
import CategoryPage from "./pages/CategoryPage";
import LoginRegisterForm from "./pages/LoginRegisterForm";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/bantuan" element={<HelpPage />} />
        <Route path="/admin" element={<LoginRegisterForm />} />
        <Route path="/admin/home" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/admin/agency" element={<ProtectedRoute><AgencyPage /></ProtectedRoute>} />
        <Route path="/admin/category" element={<ProtectedRoute><CategoryPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

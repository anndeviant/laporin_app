import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import FormPage from "./pages/FormPage";
import HelpPage from "./pages/HelpPage";
import DashboardPage from "./pages/DashboardPage";
import AgencyPage from "./pages/AgencyPage";
import CategoryPage from "./pages/CategoryPage";
import LoginRegisterForm from "./pages/LoginRegisterForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/bantuan" element={<HelpPage />} />
        <Route path="/admin/" element={<LoginRegisterForm />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/agency" element={<AgencyPage />} />
        <Route path="/category" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

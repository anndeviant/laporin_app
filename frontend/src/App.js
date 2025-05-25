import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormPage from "./pages/FormPage";
import DashboardPage from "./pages/DashboardPage";
import AgencyPage from "./pages/AgencyPage";
import CategoryPage from "./pages/CategoryPage";
import LoginRegisterForm from "./pages/LoginRegisterForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/" element={<LoginRegisterForm />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/agency" element={<AgencyPage />} />
        <Route path="/category" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

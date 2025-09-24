import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "../src/components/AdminDashboard/AdminDashboard";
import TrainerDashboard from "../src/components/TrainerDashboard/TrainerDashboard";
import TraineeDashboard from "../src/components/TraineeDashboard/TraineeDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
        <Route path="/trainee-dashboard" element={<TraineeDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

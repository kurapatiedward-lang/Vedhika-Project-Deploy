// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
// import TrainerDashboard from "./pages/TrainerDashboard/TrainerDashboard";
// import TraineeDashboard from "./pages/TraineeDashboard/TraineeDashboard";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/admin-dashboard" element={<AdminDashboard />} />
//         <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
//         <Route path="/trainee-dashboard" element={<TraineeDashboard />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import TrainerDashboard from "./pages/TrainerDashboard/TrainerDashboard";
import TraineeDashboard from "./pages/TraineeDashboard/TraineeDashboard";

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

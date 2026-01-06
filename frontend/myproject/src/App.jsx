import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "../src/components/AdminDashboard/AdminDashboard";
import TrainerDashboard from "../src/components/TrainerDashboard/TrainerDashboard";
import TraineeDashboard from "../src/components/TraineeDashboard/TraineeDashboard";
import AddEmployee from "./components/AdminDashboard/EmpMaster/AddEmployee";
import ActiveEmpList from "./components/AdminDashboard/EmpMaster/ActiveEmpList";
import InactiveEmpList from "./components/AdminDashboard/EmpMaster/InactiveEmpList";
import EmpDepartment from "./components/AdminDashboard/EmpMaster/EmpDepartment";
import EmpDesignation from "./components/AdminDashboard/EmpMaster/EmpDesignation";
import EmpWorkIcons from "./components/AdminDashboard/EmpMaster/EmpWorkIcons";
import EmpWorkIconsAdd from "./components/AdminDashboard/EmpMaster/EmpWorkIconsAdd";

import State from "./components/AdminDashboard/LocationMaster/State";
import Location from "./components/AdminDashboard/LocationMaster/Location";
import SubLocation from "./components/AdminDashboard/LocationMaster/SubLocation";
import Pincode from "./components/AdminDashboard/LocationMaster/Pincode";
import BranchState from "./components/AdminDashboard/LocationMaster/BranchState";
import BranchLocation from "./components/AdminDashboard/LocationMaster/BranchLocation";

import Bank from "./components/AdminDashboard/BankMaster/Bank";
import VendorBanks from "./components/AdminDashboard/BankMaster/VendorBanks";
import AccountType from "./components/AdminDashboard/BankMaster/AccountType";
import BankDesignations from "./components/AdminDashboard/BankMaster/BankDesignations";

import AddDsa from "./components/AdminDashboard/DSA/AddDsa";
import DsaList from "./components/AdminDashboard/DSA/DsaList";
import DsaName from "./components/AdminDashboard/DSA/DsaName";

import AddBanker from "./components/AdminDashboard/Bankers/AddBanker";
import BankersList from "./components/AdminDashboard/Bankers/BankersList";

import PayoutCategory from "./components/AdminDashboard/Payout/PayoutCategory";
import PayoutType from "./components/AdminDashboard/Payout/PayoutType";
import Payout from "./components/AdminDashboard/Payout/Payout";

import Training from "./components/AdminDashboard/Training/Training";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Admin Dashboard with nested routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />}>
          <Route index element={null} />
          <Route path="emp/add" element={<AddEmployee />} />
          <Route path="emp/active" element={<ActiveEmpList />} />
          <Route path="emp/inactive" element={<InactiveEmpList />} />
          <Route path="emp/department" element={<EmpDepartment />} />
          <Route path="emp/designation" element={<EmpDesignation />} />
          <Route path="emp/work-icons" element={<EmpWorkIcons />} />
          <Route path="emp/work-icons/add" element={<EmpWorkIconsAdd />} />

{/* location master routes */}

          <Route path="location/state" element={<State />} />
          <Route path="location/location" element={<Location />} />
          <Route path="location/sublocation" element={<SubLocation />} />
          <Route path="location/pincode" element={<Pincode />} />
          <Route path="location/branch-state" element={<BranchState />} />
          <Route path="location/branch-location" element={<BranchLocation />} />

{/* Bank Master routes */}

          <Route path="bank/bank" element={<Bank />} />
          <Route path="bank/vendor" element={<VendorBanks />} />
          <Route path="bank/account-type" element={<AccountType />} />
          <Route path="bank/designations" element={<BankDesignations />} />

{/* DSA-Code Master routes */}

          <Route path="dsa/add" element={<AddDsa />} />
          <Route path="dsa/list" element={<DsaList />} />
          <Route path="dsa/name" element={<DsaName />} />



          <Route path="bankers/add" element={<AddBanker />} />
          <Route path="bankers/list" element={<BankersList />} />

          <Route path="payout/category" element={<PayoutCategory />} />
          <Route path="payout/type" element={<PayoutType />} />
          <Route path="payout/payout" element={<Payout />} />

          <Route path="training" element={<Training />} />
        </Route>

        {/* Roles to login routes */}
        <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
        <Route path="/trainee-dashboard" element={<TraineeDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

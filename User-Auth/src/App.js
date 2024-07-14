import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import ForgotPassword from "./components/ForgotPassword";
import InnerForgotPassword from "./components/innerResetPassword";
import 'bootstrap/dist/css/bootstrap.min.css';
import VerifyEmail from "./components/VerifyEmail";
import Account from "./components/Account";
import AdminDashboard from "./components/Admin/Dashboard"; // Import AdminDashboard component
import { PrimeReactProvider } from 'primereact/api';
import PaymentForm from "./components/PaymentForm";
import Profile from "./components/Profile";
import Home1 from "./components/School/Home1";
import SchoolAminDashboard from "./components/School/SchoolDashboard";
import CustomTable from "./components/Admin/CustomTable";
import BlogSection from "./components/BlogSection";
import SchoolPage from "./components/School/SchoolPage"; // Import SchoolPage component
import Mpesa from "./components/Mpesa";
import Appointments from "./components/Admin/Appointments";
import UserTransactions from "./components/UserTransactions";
import Transactions from "./components/Admin/TotalTransactions";
import FeedbackList from "./components/Admin/Feedback";
function App() {
  return (
    <UserAuthContextProvider>
      <PrimeReactProvider>
        <Routes>
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/" element={<Login />} />
          <Route path="/feedback" element={<FeedbackList />} />
          <Route path="total-transactions" element={<Transactions />} />
          <Route path="/user-transactions" element={<UserTransactions />} />
          <Route path="/appointment" element={<Appointments />} />
          <Route path="/mpesa" element={<Mpesa />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/account" element={<Account />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home1" element={<Home1 />} />
          <Route path="/user-table" element={<CustomTable />} />
          <Route path="/reset-password" element={<InnerForgotPassword />} />
          <Route path="/payment-details" element={<PaymentForm />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/Sadmin" element={<ProtectedRoute><SchoolAminDashboard /></ProtectedRoute>} />
          <Route path="/school/:schoolName" element={<SchoolPage />} />
        </Routes>
      </PrimeReactProvider>
    </UserAuthContextProvider>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import {
  LandingPage,
  Layout,
  // DashBoard,
  NewDonation,
  Recent,
  Settings,
  Logout,
} from "./components";
import { Login, Register } from "./components/auth";
import { Discover } from "./components/info/Discover";
import ProtectedRoute from "@/components/ProtectedRoute";
import FindDonations from "./components/info/FindDonations";
import DashBoard from "./components/dashboard";
import AboutUs from "./components/info/AboutUs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="about-us"
        element={
          <Layout>
            <AboutUs />
          </Layout>
        }
      />
      <Route
        path="home"
        element={
          <ProtectedRoute>
            <Layout>
              <DashBoard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="new-donation"
        element={
          <ProtectedRoute>
            <Layout>
              <NewDonation />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="recent"
        element={
          <ProtectedRoute>
            <Layout>
              <Recent />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="settings"
        element={
          <ProtectedRoute>
            <Layout>
              <Settings />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="logout" element={<Logout />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route
        path="discover-ngos"
        element={
          <ProtectedRoute>
            <Discover />
          </ProtectedRoute>
        }
      />
      <Route
        path="find-donations"
        element={
          <ProtectedRoute>
            <FindDonations />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;

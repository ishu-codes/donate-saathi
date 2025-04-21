import { Routes, Route } from "react-router-dom";
import {
  // LandingPage,
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
import DashBoard from "./components/dashboard";
import AboutUs from "./components/info/AboutUs";
import DonationCampaigns from "./components/campaigns/DonationCampaigns";
import FindDonations from "./components/donations/FindDonations";
import LandingLayout from "./components/landing-page/layout";
import NewLandingPage from "./components/landing-page/LandingPage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingLayout>
            <NewLandingPage />
          </LandingLayout>
        }
      />
      <Route
        path="discover-ngos"
        element={
          <LandingLayout>
            <Discover />
          </LandingLayout>
        }
      />
      <Route
        path="donation-campaigns"
        element={
          <LandingLayout>
            <DonationCampaigns />
          </LandingLayout>
        }
      />
      <Route
        path="find-donations"
        element={
          <LandingLayout>
            <FindDonations />
          </LandingLayout>
        }
      />
      <Route
        path="about-us"
        element={
          <LandingLayout>
            <AboutUs />
          </LandingLayout>
        }
      />
      <Route
        path="dashboard"
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
    </Routes>
  );
}

export default App;

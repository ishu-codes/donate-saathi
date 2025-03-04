import { Routes, Route } from "react-router-dom";
import {
  LandingPage,
  Layout,
  Home,
  NewDonation,
  Recent,
  Settings,
  Logout,
} from "./components";
import { Login, Register } from "./components/auth";
import { Discover } from "./components/Discover";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="home"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="new-donation"
        element={
          <Layout>
            <NewDonation />
          </Layout>
        }
      />
      <Route
        path="recent"
        element={
          <Layout>
            <Recent />
          </Layout>
        }
      />
      <Route
        path="settings"
        element={
          <Layout>
            <Settings />
          </Layout>
        }
      />
      <Route path="logout" element={<Logout />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="discover-ngos" element={<Discover />} />
    </Routes>
  );
}

export default App;

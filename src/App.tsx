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
    </Routes>
  );
}

export default App;

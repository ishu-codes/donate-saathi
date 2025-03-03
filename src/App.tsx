import { Routes, Route } from "react-router-dom";
import { Home, LandingPage } from "./components";
import Layout from "./components/layout";

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
            <Home />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;

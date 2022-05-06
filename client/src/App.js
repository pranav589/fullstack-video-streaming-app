import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/Navbar/Navbar";
import useAuth from "./hooks/useAuth";
import DetailVideoPage from "./pages/DetailVideoPage/DetailVideoPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

import SubscriptionPage from "./pages/SubscriptionPage/SubscriptionPage";
import TrendingVideoPage from "./pages/TrendingVideoPage/TrendingVideoPage";
import UploadVideoPage from "./pages/UploadPage/UploadPage";
import PrivateRoute from "./PrivateRoute";

function App() {
  const { user, userData } = useAuth();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div
        style={{
          minHeight: "calc(100vh - 80px)",
          zIndex: -1,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />

          {/* Private Routes */}
          <PrivateRoute
            component={UploadVideoPage}
            path="/video/upload"
            exact
          />
          <PrivateRoute
            component={SubscriptionPage}
            path="/subscriptions"
            exact
          />

          <Route path="/video/:videoId" component={DetailVideoPage} />
          <Route path="/trendingVideos" component={TrendingVideoPage} />
          <Route path="/" exact component={HomePage} />
        </Switch>
      </div>
      <ToastContainer />
    </Suspense>
  );
}

export default App;

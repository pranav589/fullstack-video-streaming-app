import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/Navbar/Navbar";
import useAuth from "./hooks/useAuth";
import DetailVideoPage from "./pages/DetailVideoPage/DetailVideoPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import SubscriptionPage from "./pages/SubscriptionPage/SubscriptionPage";
import TrendingVideoPage from "./pages/TrendingVideoPage/TrendingVideoPage";
import UploadVideoPage from "./pages/UploadPage/UploadPage";

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
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/login" element={!user ? <LoginPage /> : <HomePage />} />
          <Route
            path="/register"
            element={!user ? <RegisterPage /> : <HomePage />}
          />
          <Route
            path="/video/upload"
            element={user ? <UploadVideoPage /> : <LoginPage />}
          />
          <Route
            path="/subscriptions"
            element={<SubscriptionPage userData={userData} />}
          />
          <Route path="/video/:videoId" element={<DetailVideoPage />} />
          <Route path="/trendingVideos" element={<TrendingVideoPage />} />
          <Route path="/search/:searchTerm" element={<SearchPage />} />
        </Routes>
      </div>
      <ToastContainer />
    </Suspense>
  );
}

export default App;

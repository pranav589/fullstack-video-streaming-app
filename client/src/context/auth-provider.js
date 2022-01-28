import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [userData, setUserData] = useState({});
  const token = localStorage.getItem("token");
  useEffect(() => {
    const checkLogin = async () => {
      if (token) {
        const verified = await axios.get("/api/users/auth", {
          headers: { Authorization: token },
        });
        if (verified.data) setUser(true);
        if (verified.data) setUserData(verified.data);
        if (!verified.data) return localStorage.clear();
      } else {
        setUser(false);
      }
    };
    checkLogin();
  }, [token]);

  return (
    <AuthContext.Provider value={{ setUser, user, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

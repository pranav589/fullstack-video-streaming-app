import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [userData, setUserData] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const checkLogin = async () => {
      try {
        if (token) {
          const verified = await axios.get(
            "/api/users/auth",
            { cancelToken: source.token },
            {
              headers: { Authorization: token },
            }
          );
          if (verified.data) setUser(true);
          if (verified.data) setUserData(verified.data);
          if (!verified.data) return localStorage.clear();
        } else {
          setUser(false);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("cancelled");
        } else {
          throw error;
        }
      }
    };

    checkLogin();
    return () => {
      source.cancel();
    };
  }, [token]);

  return (
    <AuthContext.Provider value={{ setUser, user, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

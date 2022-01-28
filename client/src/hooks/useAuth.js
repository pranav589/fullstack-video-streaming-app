import React, { useContext } from "react";
import { AuthContext } from "../context/auth-provider";

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;

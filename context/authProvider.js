import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = useAuthProvide();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useAuthProvide() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = Cookies.getJSON("userInfo");
    setUser(userInfo == undefined ? null : userInfo);
  }, []);

  const setCurrentUser = async (c_user) => {
    await Cookies.set("userInfo", c_user, {
      expires: 1,
      path: "/",
    });

    setUser(c_user);
  };

  const logout = async () => {
    await Cookies.remove("userInfo");
    setUser(null);
  };

  return {
    user,
    setCurrentUser,
    logout,
  };
}

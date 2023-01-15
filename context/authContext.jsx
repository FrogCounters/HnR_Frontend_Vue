import { SendRequest } from "../utils/connectApi";
import { createContext, useState, useEffect } from "react";

export const authContext = createContext({});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(
    window.localStorage.getItem("authData") || null
  );

  const [data, setData] = useState(null);

  useEffect(() => {
    if (auth) {
      SendRequest("POST", "profile", { token: auth }).then((data) => {
        if (!data) {
          setAuth(null);
        } else {
          setData(data);
        }
      });
    }
  }, []);

  return (
    <authContext.Provider value={{ data, setData, auth, setAuth }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;

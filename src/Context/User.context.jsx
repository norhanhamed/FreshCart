import { children, createContext, useState } from "react";

export const userContext = createContext(null);
export default function UserProvider({children}){
  const [token, setToken] = useState(localStorage.getItem("token"));
  function logout() {
    setToken(null);
    localStorage.removeItem("token");
  }
    return <userContext.Provider value={{token, setToken,logout}} >
        {children}
    </userContext.Provider>
}
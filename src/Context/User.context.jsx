import { children, createContext, useState } from "react";

export const userContext = createContext("");
export default function UserProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
 function logout() { 
    setToken(null);
    localStorage.removeItem("token");
    navigate('/auth/login')
 }
  return (
    <userContext.Provider value={{ token, setToken ,logout}} >
      {children}
    </userContext.Provider>
  )
}
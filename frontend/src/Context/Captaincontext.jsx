import React, { createContext, useState } from "react";

export const Captainconetxtdata = createContext();
function Captaincontext({ children }) {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );

  const value = {
    backend_url,
    token,
    setToken,
  };

  return (
    <Captainconetxtdata.Provider value={value}>
      {children}
    </Captainconetxtdata.Provider>
  );
}

export default Captaincontext;

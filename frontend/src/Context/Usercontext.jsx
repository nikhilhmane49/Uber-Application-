import React, { createContext, useState } from 'react'



export const Userconetxtdata = createContext();
function Usercontext({ children }) {
    
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
    
            <Userconetxtdata.Provider value={value}>{children}</Userconetxtdata.Provider>

    )
}

export default Usercontext

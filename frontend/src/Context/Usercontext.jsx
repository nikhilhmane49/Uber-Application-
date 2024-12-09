import React, { createContext } from 'react'


export const Userconetxtdata = createContext();
function Usercontext({children}) {

    const value = {
        

    }
   
    return (
    
            <Userconetxtdata.Provider value={value}>{children}</Userconetxtdata.Provider>

    )
}

export default Usercontext

import React, { createContext, useState } from "react";

export const serverContext = createContext();


function UserContext({ children }) { 
  

  let serverUrl = import.meta.env.VITE_BACKEND_URL;
  const value = {
    serverUrl, 
  };

  return (
    <serverContext.Provider value={value}>{children}</serverContext.Provider>
  );
}

export default UserContext;

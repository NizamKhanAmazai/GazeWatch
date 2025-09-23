import React, { createContext } from 'react'


  const GazeWatchContext = createContext();

function UserContext({children}) { 
    const serverUrl = import.meta.env.VITE_BACKEND_URL;
    const value = {
        serverUrl
    }

  return (
     <GazeWatchContext.Provider value={value}>
        {children}
     </GazeWatchContext.Provider>
  )
}
   export {GazeWatchContext}
export default UserContext;

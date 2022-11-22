import React, { createContext, useState,useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

   return <AuthContext.Provider value="Test">{children}</AuthContext.Provider>
}

export default AuthProvider;
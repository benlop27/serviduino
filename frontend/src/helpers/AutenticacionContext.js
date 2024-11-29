
import React, { createContext, useContext, useState } from 'react';
import jwt_decode from "jwt-decode";

import {useUsuario} from '../hooks/useUsuario';
const AutenticacionContext = createContext();

const AutenticacionProvider = ({ children }) => {
  const {loginUsuario, logoutUsuario} = useUsuario();
  const [usuario, setUsuario] = useState(() => {
    const datosUsuario = localStorage.getItem('usuario');
    return datosUsuario ? JSON.parse(datosUsuario) : null;
  });
  
  const login = (token) => {
    localStorage.setItem('token', token); 
    if(token){
      let datosUsuario = jwt_decode(token);
      setUsuario(datosUsuario);
      loginUsuario(datosUsuario);
      localStorage.setItem('usuario', JSON.stringify(datosUsuario)); 
      window.location.assign('/')
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    logoutUsuario();
    window.location.assign('/')
  };

  return (
    <AutenticacionContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AutenticacionContext.Provider>
  );
};


const useAutenticacion = () => {
  const context = useContext(AutenticacionContext);
  if (!context) {
    throw new Error('useAutenticacion debe ser usado dentro de un AutenticacionProvider');
  }
  return context;
};

export { AutenticacionProvider, useAutenticacion };
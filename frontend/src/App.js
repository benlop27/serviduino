import React from 'react';

import { Sidebar } from './components/layout/sidebar';
import { AppHeader } from './components/layout/header';
import { Layout, theme } from 'antd';
import { Footer } from './components/layout/footer';

import { useAutenticacion } from './helpers/AutenticacionContext';
import { useUsuario } from './hooks/useUsuario';
import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import { obtenerRutasValidas } from './components/wrappers/RutasWrapper';
const { Content } = Layout;

const App = () => {
  const { usuario } = useAutenticacion();
  const { loginUsuario } = useUsuario();
  const rutasValidas = obtenerRutasValidas(usuario);
  
  const generarRutas = () => {
    return (<Routes>
      {
        rutasValidas.map(ruta => {

          return <Route path={ruta.path} element={ruta.element} />;
        })
      }
    </Routes>)
  }
  if(!usuario && window.location.pathname !== '/login'){
    window.location = '/login'
  }else{
    loginUsuario(usuario)
  }

  return (
    <BrowserRouter>
      {usuario ?
        (<Layout>
          <Sidebar />
          <Layout>
            <AppHeader />
            <Content
              style={{
                margin: '24px 16px 0',
              }}
            >
              <div
                style={{
                  padding: 24,
                  height: '85vh',
                  background: "#FFFFFF",
                }}
              >
                {generarRutas()}
              </div>
            </Content>
            <Footer />
          </Layout>
        </Layout>) :
        <>
          {generarRutas()}
        </>
      }
    </BrowserRouter>
  );
};
export default App;
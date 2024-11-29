import React from 'react';
import { Layout, Menu, Divider, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { useAutenticacion } from '../../helpers/AutenticacionContext';
import { obtenerRutasValidas } from '../wrappers/RutasWrapper';
const { Sider } = Layout;

export const Sidebar = () => {
  const { usuario } = useAutenticacion();
  const rutasValidas = obtenerRutasValidas(usuario);
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
    >
      <Row justify="center">
        <Col>
          <div style={{ paddingTop: '10px' }}>
            <img
              className="demo-logo-vertical"
              src="/serviduino/logo-transparente.png"
              width='100hv' height='100vh'
              alt='Logo'
            />
          </div>
        </Col>
      </Row>

      <Divider dashed />
      <Menu
        theme="dark"
        mode="inline" 
         
      >
        {rutasValidas.map(ruta => 
        <Menu.Item key={ruta?.nombre} icon={React.createElement(ruta.icono)}>
          <Link to={ruta.path}>{ruta?.nombre}</Link>
        </Menu.Item>)}

      </Menu>
    </Sider>
  );
}
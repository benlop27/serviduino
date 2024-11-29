import React from 'react';
import { Layout, theme, Menu, Dropdown, Avatar, Row, Col } from 'antd';
import { useAutenticacion } from '../../helpers/AutenticacionContext';


const { Header } = Layout;
export const AppHeader = () => {

  const { usuario, logout } = useAutenticacion();
  const crearIniciales = nombre => {
    return nombre.split(' ')
      .filter(palabra => palabra.length > 0)
      .map(palabra => palabra[0].toUpperCase())
      .join('');
  }

  const logoutHandler = ()=>{
    logout()
  }
  const { token: { colorBgContainer }  } = theme.useToken();
 
  const menu = (
    <Menu>
      <Menu.Item key="1">{usuario?.nombre}</Menu.Item>
      <Menu.Item key="2" onClick={logoutHandler}>Cerrar Sesión</Menu.Item>
      {/* ... más opciones si es necesario */}
    </Menu>
  );
  return (
    <Header
      style={{
        paddingRight: 50,
        background: colorBgContainer,
      }}

    >
      <Row justify="end">
        <Col>
          <div className="user-menu">
            <Dropdown overlay={menu} trigger={['click']}>
              <Avatar style={{
                backgroundColor: '#fde3cf',
                color: '#f56a00',
              }} >
                {crearIniciales(usuario?.nombre)}
              </Avatar>
            </Dropdown>
          </div>
        </Col>
      </Row>
    </Header>
  );
}
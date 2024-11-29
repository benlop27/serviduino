import React, { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { useAutenticacion } from '../../helpers/AutenticacionContext';
import { Form, Input, Button, notification, Spin } from 'antd';
import './LoginForm.css'; // Archivo de estilos para el formulario
import { ConectorApi } from '../../api';
import { TIPOS_FACTOR_ID } from '../Configuracion2FA/utils';
import { NfcLogin } from './NfcLogin';
import { TelefonoLogin } from './TelefonoLogin';
export const LoginForm = () => {


  const { login } = useAutenticacion();
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoggedInForm, setShowLoggedInForm] = useState(false);
  const [comprobandoLogin, setComprobandoLogin] = useState(false);
  const [comprobandoRegistro, setComprobandoRegistro] = useState(false);
  const [tipoDobleFactor, setTipoDobleFactor] = useState();
  const [factorId, setFactorId] = useState();
  const [valorFactor, setValorFactor] = useState('');
  const [credenciales, setCredenciales] = useState({});


  const toggleForm = () => {
    setShowRegisterForm(!showRegisterForm);
  };
  
 

  const onFinish = async (values) => {
    setComprobandoLogin(true);
    try {
      const respuesta = await ConectorApi.Login.AutenticarUsuario(values?.usuario, values?.password);
      const data = await respuesta.json();
      if(data?.error){
        notification.error({
          message: 'Error',
          description: data?.error,
          duration: 5, // Duración en segundos
        });
        setComprobandoLogin(false);
        return;
      }
      setCredenciales(data);
      
         
        notification.success({
          message: 'Usuario Registrado',
          description: 'Tu usuario se registro con exito, prueba iniciar sesión.',
          duration: 5, // Duración en segundos
        });
        setTimeout(() => {
          
        login(data?.token)
        }, 1000);
      
    } catch (error) {
      notification.error({
        message: 'Error',
        description: error.message,
        duration: 5, // Duración en segundos
      });
      setComprobandoLogin(false);
    }

  }; 

 

  const validarFormRegistro = async (values) => {
    setComprobandoRegistro(true)
    try {
      let respuesta = await ConectorApi.Usuarios.RegistrarUsuario(values?.usuario, values?.nombre, values?.password)
      respuesta = await respuesta.json();
      notification.success({
        message: 'Usuario Registrado',
        description: 'Tu usuario se registro con exito, prueba iniciar sesión.',
        duration: 5, // Duración en segundos
      });
      setShowRegisterForm(false);
      setComprobandoRegistro(false);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: error.message,
        duration: 5, // Duración en segundos
      });
      setComprobandoRegistro(false);
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);

  };

  const loggedInForm = (
    
    <div className="logged-in-form">
      {/* Formularios de doble factor */} 
    </div>
  );

  const registerForm = (

    <div className="register-form">

      <h4>Registrate</h4>
      <Form
        name="registerForm"
        onFinish={validarFormRegistro}
        onFinishFailed={onFinishFailed}
      >
        {/* Campos para el formulario de registro */}
        <Form.Item
          label="Nombre"
          name="nombre"
          rules={[{ required: true, message: 'Ingresa tu nombre!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Usuario"
          name="usuario"
          rules={[{ required: true, message: 'Ingresa tu usuario!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Por favor ingresa tu password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        {/* Otros campos para el formulario de registro */}

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={comprobandoRegistro} >
            {(comprobandoRegistro) ?
              <Spin indicator={<LoadingOutlined style={{ fontSize: 24, }} spin />} /> : "Registrarse"
            }
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-form">
          <h1>Serviduino</h1>
          {!showLoggedInForm ? (
            <>
              {showRegisterForm ? registerForm : (
                <>

                  <h4>Inicia sesión</h4>
                  <Form
                    name="loginForm"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                  >
                    {/* Campos para el formulario de inicio de sesión */}
                    <Form.Item
                      label="Usuario"
                      name="usuario"
                      rules={[{ required: true, message: 'Por favor ingresa tu usuario!' }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: 'Por favor ingresa tu password!',
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                    {/* Otros campos para el formulario de inicio de sesión */}

                    <Form.Item>
                      <Button type="primary" htmlType="submit" disabled={comprobandoLogin} >
                        {(comprobandoLogin) ?
                          <Spin indicator={<LoadingOutlined style={{ fontSize: 24, }} spin />} /> : "Iniciar Sesión"
                        }
                      </Button>
                      <Button type="link" onClick={toggleForm} disabled={comprobandoLogin}>
                        Registrarse
                      </Button>
                    </Form.Item>
                  </Form>
                </>
              )}</>)
            : (
              loggedInForm
            )}
        </div>
        <div className="login-logo">
          {/* Aquí puedes agregar tu logo */}
          <img src="/serviduino/logo-transparente.png" alt="Logo" style={{ width: "400px", height: "400px" }} />
        </div>
      </div>
    </div>
  );
};


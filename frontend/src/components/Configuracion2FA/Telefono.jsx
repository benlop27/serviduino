import React, { useState } from 'react';
import { Button, notification, Steps, theme, Checkbox, Form, Input } from 'antd';
import { ConectorApi } from '../../api';
import { TIPOS_FACTOR_ID } from './utils';
import { useAutenticacion } from '../../helpers/AutenticacionContext';
export const Telefono = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const {usuario} = useAutenticacion();
  const [factorRecibido, setFactorRecibido] = useState();
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const onFinish = async (values) => {
    try{

      let respuesta = await ConectorApi.Factores.RegistrarFactor(usuario?.ID, TIPOS_FACTOR_ID.SMS, values?.numero);
      respuesta = await respuesta.json()
      if(respuesta?.error){
        notification.error({
          message: 'Error',
          description: respuesta?.error,
          duration: 5, // Duración en segundos
        });
      }else{
        setFactorRecibido(respuesta);
        next()
      }
    }catch(error){
      notification.error({
        message: 'Error',
        description: error?.message,
        duration: 5, // Duración en segundos
      });
    }
  };

  // setTimeout(()=>{window.location.reload();}, 6000);
  //       next();

  const validarSMS = async(values)=>{
    try{ 
      let respuesta = await ConectorApi.Factores.validarFactorSMS(usuario?.ID, values?.codigo);
      respuesta = await respuesta.json()
      if(respuesta?.error){
        notification.error({
          message: 'Error',
          description: respuesta?.error,
          duration: 5, // Duración en segundos
        });
      }else{
        
        notification.success({
          message: 'SMS Confirmado',
          description: 'Número confirmado con exito',
          duration: 5, // Duración en segundos
        });
        setTimeout(()=>{window.location.reload();}, 6000);
        next()
      }
    }catch(error){
      notification.error({
        message: 'Error',
        description: error?.message,
        duration: 5, // Duración en segundos
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  const formularioEntrada = (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
      <div style={{ maxWidth: 600 }}>
        <h3>Ingresa tu número de teléfono</h3>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Número"
            name="numero"
            rules={[
              {
                required: true,
                message: 'Ingresa tu número en formato +503XXXXXXXX',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Enviar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );

  const formularioConfirmar = (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
      <div style={{ maxWidth: 600 }}>
        <h3>Ingresa el codigo enviado a tu telefono</h3>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={validarSMS}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Codigo"
            name="codigo"
            rules={[
              {
                required: true,
                message: 'Ingresa el codigo recibido en tu telefono.',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Enviar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
  const steps = [
    {
      title: 'Inicio',
      content: formularioEntrada,
    },
    {
      title: 'Confirmación',
      content: formularioConfirmar,
    },
    {
      title: 'Exito',
      content: '',
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    textAlign: 'center',
    minHeight:'700pxs',
    color: token.colorTextTertiary, 
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
};
  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
    </>
  );
};
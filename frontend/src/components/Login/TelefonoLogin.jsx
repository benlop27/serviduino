import React, { useEffect ,useState} from "react"
import { obtenerValoresNFC } from "../Configuracion2FA/utils"
import { Button, Image, Form, Input} from 'antd';

export const TelefonoLogin = ({ setValor}) =>{
    const [valorRecibido, setValorRecibido] = useState('');
    useEffect(()=>{
        setValor(valorRecibido)
    }, [valorRecibido])

    const retornarValor = (valor) =>{
        setValorRecibido(valor)
    }
    const validarSMS = async(values) =>{
        retornarValor(values?.codigo)
    }

    return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
      <div style={{ maxWidth: 600 }}>
        <h3>Ingresa el codigo enviado a tu telefono</h3>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={validarSMS}
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
}
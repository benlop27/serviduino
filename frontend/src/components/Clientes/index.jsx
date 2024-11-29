import React, {useEffect} from "react"
import { Row, Col, Button, Divider, Typography} from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { PlusCircleOutlined } from '@ant-design/icons';
import { TablaClientes } from "./tablaClientes";
export const Clientes = () => {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
    
        // Obtener redirect_url y client_id de los parámetros de la URL
        const redirectUrl = params.get('redirect_url');
        const clientId = params.get('client_id');
    
        // Simular generación de token (ajústalo según tus necesidades)
        const token = 'token_generado';
    
        // Redirigir a la página proporcionada con el token en la respuesta
        if (redirectUrl && clientId) {
          const redirectWithToken = `${redirectUrl}?response_token=${token}&client_id=${clientId}`;
          window.location.href = redirectWithToken;
        } else {
          // Manejo en caso de que falten parámetros
          console.error('redirect_url o client_id faltantes en los parámetros de la URL');
          // Redirigir a una página de error o a una ruta predeterminada si es necesario
          window.location.href = '/error';
        }
      }, []);
    
      return (
        <div>
          <p>Redirigiendo...</p>
          {/* Puedes mostrar un mensaje de redirección si es necesario */}
        </div>
      );
}
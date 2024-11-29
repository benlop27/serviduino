import React from "react";
import { Divider, Typography } from 'antd';

import { useUsuario } from "../../hooks/useUsuario";
const { Title, Paragraph, Text, Link } = Typography;

export const Inicio = () => {
    const { usuarioInfo } = useUsuario();

    return (
        <div>
            <Typography>
                <Title>Bienvenid@.</Title>


                     

                <Title level={2}>Hola {usuarioInfo?.Nombre}</Title>

                <Paragraph>
                    
                   Bienvenid@ a Tech Guard SSO, aca podras gestionar:
                </Paragraph>

                <Paragraph>
                    <ul>
                        <li>
                           La informacion de tu cuenta.
                        </li>
                        <li>
                             Los dispositivos de doble factor de autenticación(2FA)
                        </li>
                        <li>
                           Las aplicaciones desde las que puedes iniciar sesión con tu cuenta de Tech Guard.
                        </li>
                    </ul>
                </Paragraph>

              

                <Divider />
            </Typography>
        </div>
    )
}
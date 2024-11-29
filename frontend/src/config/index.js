

import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Clientes } from '../components/Clientes'; 
import { Inicio } from '../components/Inicio';
import { Configuracion2FA } from '../components/Configuracion2FA';
/**
 * Esta constante nos define las rutas de la aplicacion
 */
export const rutas = [
    {
        path: "/",
        element:<Inicio/>,
        nombre: "Inicio",
      icono: UserOutlined,
      mostrarEnMenu : true,
      roles: ['admin', 'UsuarioNormal']
    },

    {
      path: "/Clientes",
      element: <Clientes/>,
      nombre: "Clientes",
      icono: VideoCameraOutlined,
      mostrarEnMenu : true,
      roles: ['admin', 'UsuarioNormal']
    },
    {
      path: "/2fa",
      element: <Configuracion2FA/>,
      nombre: "2FA",
      icono: VideoCameraOutlined,
      mostrarEnMenu : true,
      roles: ['admin', 'UsuarioNormal']
    },
    {
      path: "/config",
      element: <></>,
      nombre: "Configuracion",
      icono: VideoCameraOutlined,
      mostrarEnMenu : true,
      roles: ['admin', 'UsuarioNormal']
    },
]

export const API_CONFIG ={
  basePath: 'http://localhost:3001',
  usuariosEndpoint: '/api/v1/usuarios',
  clientesEndpoint:'/api/v1/cliente',
  factoresEndpoint:'/api/v1/factores',
  autenticacionEndpoint: '/api/auth/iniciar-sesion',
}

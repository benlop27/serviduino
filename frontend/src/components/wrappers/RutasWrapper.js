import { rutas } from '../../config';
import { LoginForm } from '../../components/Login';
import { UserOutlined } from '@ant-design/icons';

export const obtenerRutasValidas = (usuario) => {
  const login = {
    path: "/login",
    element: <LoginForm />,
    nombre: "Login",
    icono: UserOutlined,
    mostrarEnMenu: false,
    roles: []
  };
  
  // Si el usuario no está autenticado y la ruta actual no es '/login', redirige a '/login'
  if (!usuario && window.location.pathname !== '/login') {
    return [login];
  }

  // Si el usuario está autenticado, filtra las rutas basadas en sus roles
  if (usuario) {
    const rol = usuario?.rol;
    const rutasValidas = rutas.filter(ruta => ruta.roles.includes(rol));
    return rutasValidas;
  }

  // Si el usuario no está autenticado y ya está en la página de inicio de sesión, no se hace ninguna redirección
  if (!usuario && window.location.pathname === '/login') {
    return [login];
  }

};

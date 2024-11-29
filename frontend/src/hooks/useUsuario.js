import { useSelector, useDispatch } from 'react-redux';
import { UsuarioLogin, UsuarioLogout } from '../store'; // Importa las acciones del usuario según la ubicación de tu store

export const useUsuario = () => {
  const usuarioLoggeado = useSelector((state) => state.usuario.usuarioLogeado);
  const usuarioInfo = useSelector((state) => state.usuario.usuarioInfo);
  const dispatch = useDispatch();

  const loginUsuario = (user) => {
    dispatch(UsuarioLogin(user));
  };

  const logoutUsuario = () => {
    dispatch(UsuarioLogout());
  };

  return { usuarioLoggeado, usuarioInfo, loginUsuario, logoutUsuario };
};

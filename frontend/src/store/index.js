import { configureStore, createSlice } from '@reduxjs/toolkit';

// Define un slice para la información del usuario
const usuarioSlice = createSlice({
  name: 'usuario',
  initialState: {
    usuarioLogeado: false,
    usuarioInfo: null,
  },
  reducers: {
    login: (state, action) => {
      state.usuarioLogeado = true;
      state.usuarioInfo = action.payload; // Puede ser un objeto con la información del usuario
    },
    logout: (state) => {
      state.usuarioLogeado = false;
      state.usuarioInfo = null;
    },
    // Otras acciones relacionadas con la información del usuario
  },
});



// Extrae las acciones y los reducers de los slices
export const { actions: usuarioActions, reducer: usuarioReducer } = usuarioSlice; 

// Crea el store combinando los reducers
const store = configureStore({
  reducer: {
    usuario: usuarioReducer, 
    // Otros reducers si los tienes
  },
});

// Exporta las acciones del usuario y del contador
export const { login: UsuarioLogin, logout: UsuarioLogout} = usuarioActions;

export default store;

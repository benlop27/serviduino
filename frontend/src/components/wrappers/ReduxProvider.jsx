import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store'; // Importa tu store Redux

const ReduxStoreProvider = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default ReduxStoreProvider;
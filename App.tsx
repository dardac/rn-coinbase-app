import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { CurrenciesList } from './src/components';
import { persistor, store } from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CurrenciesList />
      </PersistGate>
    </Provider>
  );
};

export default App;

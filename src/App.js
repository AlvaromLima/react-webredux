import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Header from './components/Header';
import Routes from './routes';

import history from './services/history';
import store from './store';

// Instalar pelo prompt do dos em C:\Users\NOT\workspace\projetos_react\redux
// npm install react-router-dom@5.2.0

// Instalar api pelo prompt do dos 
// npm install -g json-server
// criar server.json e depois executar no prompt do dos:
// json-server server.json -p 3333
// instalar axios pelo prompt do dos
// npm install axios - Para consumir a api
// instalar react-icons pelo prompt do dos 
// npm install react-icons
// instalar o redux pelo prompt do dos
// npm install redux react-redux
// instalar o immer pelo prompt do dos
// npm install immer
// instalar o redux-saga pelo prompt do dos
// npm install redux-saga
// Instalar o history pelo prompt do dos(Rotas)
// npm install history

export default function App(){
  return (
    <Provider store={store}>
      <BrowserRouter>  
        <Header/>
        <Routes/>
      </BrowserRouter>
    </Provider>
  )
}

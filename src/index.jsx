import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/login';
import EsqueceuSenha from './pages/esqueceuSenha';
import ValidacaoSenha from './pages/validacaoSenha';
import RedefinirSenha from './pages/redefinicaoSenha';
import SenhaAlterada from './pages/alterada';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/L' element={<Login />}  />
        <Route path='/E' element={<EsqueceuSenha />} />
        <Route path='/V' element={<ValidacaoSenha />} />
        <Route path='/R' element={<RedefinirSenha />} />
        <Route path='/' element={<SenhaAlterada />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

import './index.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function EsqueceuSenha(){

    return(
        <div className='pagina-esqueceuSenha'>

            <div className='login'>
                <div className='IMG'>
                    <img src="/assets/images/pessoa.png" alt="Imagem de usuário" />
                    <h1 className='BV'>Esqueceu a senha?</h1>
                    <br />
                    <p className='pa'>Informe o seu e-mail</p>
                </div>

                <div className='campo'>
                    <input
                        type='text'
                        placeholder='E-mail'
                    />
                </div>

                <div className='botom'><a>Confirmar</a></div>
            </div>
        </div>
    )
}
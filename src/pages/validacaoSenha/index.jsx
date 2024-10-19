import './index.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRef } from "react";

export default function ValidacaoSenha() {

    const inputsRef = useRef([]);

    const handleInputChange = (e, index) => {
      const value = e.target.value;
      if (value && index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1].focus(); // Mover para o próximo input
      } else if (!value && index > 0) {
        inputsRef.current[index - 1].focus(); // Mover para o input anterior se estiver vazio
      }
    };  

    return(
        <div className='pagina-validacaoSenha'>
            <div className='login'>
                <div className='IMG'>
                    <img src="/assets/images/pessoa.png" alt="Imagem de usuário" />
                    <h1 className='BV'>Verificação de código</h1>
                    <br />
                    <p>Insira o código de verificação:</p>
                </div>

                <div className="input-boxes">
                {Array.from({ length: 5 }).map((_, index) => (
                <input
                key={index}
                maxLength="1" // Limita um caractere por campo
                onChange={(e) => handleInputChange(e, index)}
                ref={(el) => (inputsRef.current[index] = el)} // Armazena a referência dos inputs
                />
                ))}
        </div>

                

                <div className='botom'><a>Entrar</a></div>
            </div>


        
        </div>
    )
}
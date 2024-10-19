import './index.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Ícones para mostrar/esconder senha

export default function Login() {
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState(''); // Armazena a senha real
    const [inputSenha, setInputSenha] = useState(''); // O que o usuário vê no input
    const [showPassword, setShowPassword] = useState(false); // Controla a visibilidade total da senha
    const [lastTypedChar, setLastTypedChar] = useState(''); // Armazena o último caractere digitado

    const navigate = useNavigate();

    useEffect(() => {
        if (lastTypedChar) {
            // Substitui a última letra visível por '*' após 1 segundo
            const timeoutId = setTimeout(() => {
                setInputSenha((prev) => prev.slice(0, -1) + '*');
            }, 1000);

            return () => clearTimeout(timeoutId); // Limpa o timeout quando o componente é desmontado
        }
    }, [lastTypedChar]);

    async function entrar() {
        const usuario = {
            nome: nome,
            senha: senha
        };

        const url = `http://localhost:8001/entrar/`;
        let resp = await axios.post(url, usuario);

        if (resp.data.erro !== undefined) {
            alert(resp.data.erro);
        } else {
            localStorage.setItem('USUARIO', resp.data.token);
            navigate('/consultar');
        }
    }

    // Alterna a visibilidade da senha completa
    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    }

    // Função para lidar com a digitação da senha
    function handlePasswordChange(e) {
        const value = e.target.value;
        const lastChar = value.slice(-1); // Pega o último caractere digitado

        setSenha(value); // Atualiza a senha real
        setInputSenha(value); // Atualiza o input visível para mostrar a senha com a última letra visível
        setLastTypedChar(lastChar); // Armazena o último caractere digitado
    }

    return (
        <div className='pagina-home'>
            <div className='login'>
                <div className='IMG'>
                    <img src="/assets/images/pessoa.png" alt="Imagem de usuário" />
                    <h1 className='BV'>Bem-vindo de volta</h1>
                    <br />
                    <p>Esta área é destinada apenas aos administradores do site!</p>
                </div>

                <div className='campo'>
                    <input
                        id='nome'
                        type='text'
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder='E-mail'
                    />
                </div>

                <div className='campo senha'>
                    <input
                        id='senha'
                        type={showPassword ? 'text' : 'password'}
                        value={showPassword ? senha : inputSenha}
                        onChange={handlePasswordChange}
                        placeholder='Senha'
                    />
                    <span onClick={togglePasswordVisibility} className='eye-icon'>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                <div className='esqueceu'>
                <div className="checkbox-wrapper-30">
            <span className="checkbox">
                <input type="checkbox" id="lembrar" />
                <svg>
                    <symbol id="checkbox-30" viewBox="0 0 22 22">
                        <path
                            fill="none"
                            stroke="#8f44fd"
                            d="M5.5,11.3L9,14.8L20.2,3.3l0,0c-0.5-1-1.5-1.8-2.7-1.8h-13c-1.7,0-3,1.3-3,3v13c0,1.7,1.3,3,3,3h13c1.7,0,3-1.3,3-3v-13c0-0.4-0.1-0.8-0.3-1.2"
                        />
                    </symbol>
                    <use href="#checkbox-30" className="checkbox" />
                </svg>
            </span>
            <label htmlFor="lembrar">Lembre-se de mim?</label>
        </div>
                    <div className='ES'>
                    <a href="">Esqueceu a senha?</a>
                    </div>
                </div>
                

                <div className='botom'><a onClick={entrar}>Entrar</a></div>
            </div>


        
        </div>
    );
}
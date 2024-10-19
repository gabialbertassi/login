import './index.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Ícones para mostrar/esconder senha

export default function RedefinirSenha() {
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
                    <h1 className='BV'>Redefinição de Senha</h1>
                    <br />
                    <p>Defina uma senha segura para ter acesso à plataforma Beauty Queen.</p>
                </div>

                <div className='campo senha'>
                    <input
                        id='senha'
                        type={showPassword ? 'text' : 'password'}
                        value={showPassword ? senha : inputSenha}
                        onChange={handlePasswordChange}
                        placeholder='Nova senha'
                    />
                    <span onClick={togglePasswordVisibility} className='eye-icon'>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                <div className='campo senha'>
                    <input
                        id='senha'
                        type={showPassword ? 'text' : 'password'}
                        value={showPassword ? senha : inputSenha}
                        onChange={handlePasswordChange}
                        placeholder='Confirmar nova senha'
                    />
                    <span onClick={togglePasswordVisibility} className='eye-icon'>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>                

                <div className='botom'><a>Confirmar</a></div>
            </div>


        
        </div>
    );
}
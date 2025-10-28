import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUsuario, cadastrarUsuario } from '../services/authService';

export function useAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    cpf: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await loginUsuario(formData.email, formData.senha);
        navigate('/locais');
      } else {
        await cadastrarUsuario({
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha,
          cpf: formData.cpf,
        });
        alert('Cadastro realizado com sucesso');
        setIsLogin(true);
      }
      setFormData({ nome: '', email: '', senha: '', cpf: '' });
    } catch (err) {
      console.error(err);
      alert(err.message || 'Erro no processo de autenticação');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => setIsLogin((v) => !v);

  return { formData, isLogin, handleChange, handleSubmit, toggleMode, loading };
}

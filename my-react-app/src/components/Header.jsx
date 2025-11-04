import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUsuario } from '../api/authApi';
import styles from '../styles/main.css';

export function Header() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserData(payload);
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUsuario();
      localStorage.removeItem('token');
      navigate('/auth');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <h1>EvT</h1>
        {userData && (
          <div className="user-info">
            <span>
              Bem-vindo, {userData.sub} ({userData.role})
            </span>
            <button onClick={handleLogout} className="logout-button">
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

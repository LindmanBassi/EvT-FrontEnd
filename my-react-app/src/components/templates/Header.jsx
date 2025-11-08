import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { logoutUsuario } from '../../api/authApi';
import styles from '../../styles/header.module.css';
import logo from '../../assets/EventosTech_logo.svg';

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

  const isVisitante = userData?.role === 'VISITANTE';
  const isFuncionario = userData && userData.role !== 'VISITANTE';

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <img src={logo} alt="Logo Eventos Tech" className={styles.logo} />

        <nav className={styles.nav}>
          <Link to="/participacoes" className={styles.navLink}>
            Participe
          </Link>

          {isFuncionario && (
            <>
              <Link to="/locais" className={styles.navLink}>
                Locais
              </Link>
              <Link to="/eventos" className={styles.navLink}>
                Eventos
              </Link>
              <Link to="/funcionarios" className={styles.navLink}>
                Funcionários
              </Link>
            </>
          )}
        </nav>

        {userData && (
          <div className={styles.userInfo}>
            <span className={styles.userText}>
              Bem-vindo, {userData.sub} ({userData.role})
            </span>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

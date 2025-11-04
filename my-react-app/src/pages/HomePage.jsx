import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import styles from '../styles/home.module.css';

function HomePage() {
  return (
    <div>
      <Header />
      <div className={styles.homeContainer}>
        <h2>Bem-vindo ao Sistema de Eventos e Territórios</h2>
        <nav className={styles.navigation}>
          <Link to="/locais" className={styles.navLink}>
            Gerenciar Locais
          </Link>
          <Link to="/eventos" className={styles.navLink}>
            Gerenciar Eventos
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default HomePage;

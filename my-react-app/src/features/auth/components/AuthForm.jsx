import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import styles from '../../../styles/auth.module.css';

function AuthForm() {
  const { formData, isLogin, handleChange, handleSubmit, toggleMode, loading } =
    useAuth();

  return (
    <div className={styles.authContainer}>
      <h2 className={styles.title}>{isLogin ? 'Entrar' : 'Cadastrar'}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {!isLogin && (
          <label className={styles.label}>
            Nome:
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </label>
        )}

        <label className={styles.label}>
          E-mail:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </label>

        <label className={styles.label}>
          Senha:
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </label>

        {!isLogin && (
          <label className={styles.label}>
            CPF:
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              className={styles.input}
            />
          </label>
        )}

        <button type="submit" className={styles.submit} disabled={loading}>
          {loading ? 'Aguarde...' : isLogin ? 'Entrar' : 'Cadastrar'}
        </button>
      </form>

      <div className={styles.switchRow}>
        <button onClick={toggleMode} className={styles.switchButton}>
          {isLogin
            ? 'Ainda não tem conta? Cadastre-se'
            : 'Já tem conta? Entrar'}
        </button>
      </div>
    </div>
  );
}

export default AuthForm;

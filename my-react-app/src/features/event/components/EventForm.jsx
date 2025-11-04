import React from 'react';
import { useEvent } from '../../../hooks/useEvent';
import styles from '../../../styles/event.module.css';

function EventForm() {
  const {
    formData,
    handleChange,
    handleSubmit,
    eventos,
    iniciarEdicao,
    handleDeletar,
    eventoEditando,
    usuarios,
    locais,
  } = useEvent();

  return (
    <div className={styles.eventContainer}>
      <h2 className={styles.eventTitle}>
        {eventoEditando ? 'Atualizar Evento' : 'Cadastro de Evento'}
      </h2>
      <form onSubmit={handleSubmit} className={styles.eventForm}>
        <label>
          Título:
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Descrição:
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Data e Hora:
          <input
            type="datetime-local"
            name="data"
            value={formData.data}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Tipo do Evento:
          <select
            name="tipoEvento"
            value={formData.tipoEvento}
            onChange={handleChange}
            required
          >
            <option value="REMOTO">Remoto</option>
            <option value="PRESENCIAL">Presencial</option>
            <option value="HIBRIDO">Híbrido</option>
          </select>
        </label>

        <label>
          Estado do Evento:
          <select
            name="estadoEvento"
            value={formData.estadoEvento}
            onChange={handleChange}
            required
          >
            <option value="ABERTO">Aberto</option>
            <option value="FECHADO">Fechado</option>
            <option value="CANCELADO">Cancelado</option>
          </select>
        </label>

        <label>
          Número de Vagas:
          <input
            type="number"
            name="vagas"
            value={formData.vagas}
            onChange={handleChange}
            min="1"
            required
          />
        </label>

        <label>
          Local:
          <select
            name="localId"
            value={formData.localId || ''}
            onChange={handleChange}
            required
            className={styles.select}
          >
            <option value="">Selecione um local</option>
            {locais.map((local) => {
              console.log('Comparando local.id:', local.id, 'com formData.localId:', formData.localId, 'Igual?:', local.id === formData.localId);
              return (
                <option key={local.id} value={local.id}>
                  {local.nome} - {local.endereco.cidade}, {local.endereco.estado}
                </option>
              );
            })}
          </select>
        </label>

        <label>
          Palestrante:
          <select
            name="palestranteId"
            value={formData.palestranteId || ''}
            onChange={handleChange}
            required
            className={styles.select}
          >
            <option value="">Selecione um palestrante</option>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.nome} - {usuario.email}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">
          {eventoEditando ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>

      <h2>Eventos Cadastrados</h2>
      {eventos.length === 0 ? (
        <p>Não há eventos cadastrados.</p>
      ) : (
        <ul>
          {eventos.map((evento) => (
            <li key={evento.id}>
              <div className={styles.eventInfo}>
                <h3>{evento.titulo}</h3>
                <p>
                  <strong>Data:</strong>{' '}
                  {new Date(evento.data).toLocaleString('pt-BR')}
                </p>
                <p>
                  <strong>Tipo:</strong> {evento.tipoEvento}
                </p>
                <p>
                  <strong>Estado:</strong> {evento.estadoEvento}
                </p>
                <p>
                  <strong>Vagas:</strong> {evento.vagas}
                </p>
              </div>
              <div className={styles.eventActions}>
                <button onClick={() => iniciarEdicao(evento)}>Editar</button>
                <button onClick={() => handleDeletar(evento.id)}>
                  Deletar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EventForm;

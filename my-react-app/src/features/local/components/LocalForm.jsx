import React from 'react';
import { useLocal } from '../../../hooks/useLocal';

function LocalComponent() {
  const {
    formData,
    handleChange,
    handleSubmit,
    locais,
    iniciarEdicao,
    handleDeletar,
    localEditando,
  } = useLocal();

  return (
    <div className="locais-container">
      <h2 className="locaisComp-titulo">
        {localEditando ? 'Atualizar Local' : 'Cadastro de Local'}
      </h2>
      <form onSubmit={handleSubmit} className="locais-form">
        <label>
          Nome:
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
          />
        </label>

        <fieldset>
          <legend>Endereço</legend>
          <label>
            Rua:
            <input
              type="text"
              name="rua"
              value={formData.endereco.rua}
              onChange={handleChange}
            />
          </label>
          <label>
            Bairro:
            <input
              type="text"
              name="bairro"
              value={formData.endereco.bairro}
              onChange={handleChange}
            />
          </label>
          <label>
            Cidade:
            <input
              type="text"
              name="cidade"
              value={formData.endereco.cidade}
              onChange={handleChange}
            />
          </label>
          <label>
            Estado:
            <input
              type="text"
              name="estado"
              value={formData.endereco.estado}
              onChange={handleChange}
            />
          </label>
          <label>
            Número:
            <input
              type="text"
              name="numero"
              value={formData.endereco.numero}
              onChange={handleChange}
            />
          </label>
          <label>
            CEP:
            <input
              type="text"
              name="cep"
              value={formData.endereco.cep}
              onChange={handleChange}
            />
          </label>
        </fieldset>

        <label>
          Capacidade:
          <input
            type="number"
            name="capacidade"
            value={formData.capacidade}
            onChange={handleChange}
          />
        </label>

        <button type="submit">{localEditando ? 'Atualizar' : 'Salvar'}</button>
      </form>

      <h2>Locais cadastrados</h2>
      {locais.length === 0 ? (
        <p>Não há locais disponíveis.</p>
      ) : (
        <ul>
          {locais.map((local) => (
            <li key={local.id}>
              {local.nome} - {local.endereco.cidade}, {local.endereco.estado}{' '}
              <button onClick={() => iniciarEdicao(local)}>Editar</button>
              <button onClick={() => handleDeletar(local.id)}>Deletar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LocalComponent;

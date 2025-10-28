import { useState, useEffect } from 'react';
import {
  criarLocal,
  getLocais,
  editarLocal,
  deletarLocal,
} from '../services/localService';

export function useLocal() {
  const [formData, setFormData] = useState({
    nome: '',
    endereco: {
      rua: '',
      bairro: '',
      cidade: '',
      estado: '',
      numero: '',
      cep: '',
    },
    capacidade: '',
  });

  const [locais, setLocais] = useState([]);
  const [localEditando, setLocalEditando] = useState(null);

  useEffect(() => {
    async function fetchLocais() {
      try {
        const data = await getLocais();
        setLocais(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchLocais();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.endereco) {
      setFormData((prev) => ({
        ...prev,
        endereco: { ...prev.endereco, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (localEditando) {
        const atualizado = await editarLocal(localEditando.id, formData);
        setLocais((prev) =>
          prev.map((l) => (l.id === atualizado.id ? atualizado : l)),
        );
        setLocalEditando(null);
      } else {
        const novoLocal = await criarLocal(formData);
        setLocais((prev) => [...prev, novoLocal]);
      }

      setFormData({
        nome: '',
        endereco: {
          rua: '',
          bairro: '',
          cidade: '',
          estado: '',
          numero: '',
          cep: '',
        },
        capacidade: '',
      });
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar local.');
    }
  };

  const iniciarEdicao = (local) => {
    setLocalEditando(local);
    setFormData(local);
  };

  const handleDeletar = async (id) => {
    try {
      await deletarLocal(id);
      setLocais((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      console.error(err);
      alert('Erro ao deletar local.');
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    locais,
    iniciarEdicao,
    handleDeletar,
    localEditando,
  };
}

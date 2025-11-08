import { useState, useEffect } from 'react';
import {
  criarLocal,
  getLocais,
  editarLocal,
  deletarLocal,
} from '../api/localApi';

const buscarCepViaCep = async (cep) => {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!response.ok) {
      throw new Error('CEP não encontrado');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar CEP:', error);
    throw error;
  }
};

export function useLocal() {
  const [formData, setFormData] = useState({
    nome: '',
    endereco: {
      cep: '',
      numero: '',
      rua: '',
      bairro: '',
      cidade: '',
      estado: '',
    },
    capacidade: '',
  });

  const [locais, setLocais] = useState([]);
  const [localEditando, setLocalEditando] = useState(null);

  useEffect(() => {
    async function fetchLocais() {
      try {
        const data = await getLocais();
        const normalized = Array.isArray(data)
          ? data.map((l, i) => ({ ...l, id: l.id ?? l._id ?? `tmp-${i}` }))
          : [];
        setLocais(normalized);
      } catch (err) {
        console.error(err);
      }
    }
    fetchLocais();
  }, []);

  const handleBuscarCep = async (cep) => {
    const cepLimpo = cep.replace(/\D/g, '');

    if (!cepLimpo || cepLimpo.length !== 8) {
      alert('Por favor, insira um CEP válido com 8 dígitos');
      return;
    }

    try {
      const dadosCep = await buscarCepViaCep(cepLimpo);
      if (dadosCep.erro) {
        alert('CEP não encontrado');
        return;
      }

      setFormData((prev) => ({
        ...prev,
        endereco: {
          ...prev.endereco,
          cep: cepLimpo.replace(/(\d{5})(\d{3})/, '$1-$2'),
          rua: dadosCep.logradouro || '',
          bairro: dadosCep.bairro || '',
          cidade: dadosCep.localidade || '',
          estado: dadosCep.uf || '',
        },
      }));
    } catch (error) {
      alert('Erro ao buscar o CEP');
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.endereco) {
      let formattedValue = value;
      if (name === 'cep') {
        formattedValue = value.replace(/\D/g, '');
      } else if (name === 'numero') {
        formattedValue = value === '' ? '' : parseInt(value, 10);
      }

      setFormData((prev) => ({
        ...prev,
        endereco: { ...prev.endereco, [name]: formattedValue },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        nome: formData.nome,
        endereco: {
          cep: formData.endereco.cep.replace(/\D/g, ''),
          numero: Number(formData.endereco.numero) || 0,
        },
        capacidade: Number(formData.capacidade) || 1,
      };

      if (localEditando) {
        await editarLocal(localEditando.id, payload);
        const data = await getLocais();
        const normalized = Array.isArray(data)
          ? data.map((l, i) => ({ ...l, id: l.id ?? l._id ?? `tmp-${i}` }))
          : [];
        setLocais(normalized);
        setLocalEditando(null);
      } else {
        await criarLocal(payload);
        const atualizados = await getLocais();
        const normalized = Array.isArray(atualizados)
          ? atualizados.map((l, i) => ({
              ...l,
              id: l.id ?? l._id ?? `tmp-${i}`,
            }))
          : [];
        setLocais(normalized);
      }

      setFormData({
        nome: '',
        endereco: {
          cep: '',
          numero: '',
          rua: '',
          bairro: '',
          cidade: '',
          estado: '',
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
    handleBuscarCep,
  };
}

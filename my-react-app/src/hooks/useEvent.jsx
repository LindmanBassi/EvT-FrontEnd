import { useState, useEffect } from 'react';
import {
  criarEvento,
  getEventos,
  editarEvento,
  deletarEvento,
} from '../api/eventosApi';
import { getUsuarios } from '../api/usuariosApi';
import { getLocais } from '../api/localApi';

export function useEvent() {
  const [formData, setFormData] = useState({
    localId: '',
    estadoEvento: 'ABERTO',
    tipoEvento: 'REMOTO',
    data: '',
    titulo: '',
    descricao: '',
    vagas: '',
    palestranteId: '',
  });

  const [eventos, setEventos] = useState([]);
  const [eventoEditando, setEventoEditando] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [locais, setLocais] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [eventosData, usuariosData, locaisData] = await Promise.all([
          getEventos(),
          getUsuarios(),
          getLocais(),
        ]);

        setEventos(
          Array.isArray(eventosData)
            ? eventosData.map((e, i) => ({
                ...e,
                id: e.id ?? e._id ?? `tmp-${i}`,
              }))
            : [],
        );

        setUsuarios(
          Array.isArray(usuariosData)
            ? usuariosData.map((u, i) => ({
                ...u,
                id: u.id ?? u._id ?? `tmp-${i}`,
              }))
            : [],
        );

        setLocais(
          Array.isArray(locaisData)
            ? locaisData.map((l, i) => ({
                ...l,
                id: l.id ?? l._id ?? `tmp-${i}`,
              }))
            : [],
        );
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchEventos() {
      try {
        const data = await getEventos();
        const normalized = Array.isArray(data)
          ? data.map((e, i) => ({ ...e, id: e.id ?? e._id ?? `tmp-${i}` }))
          : [];
        setEventos(normalized);
      } catch (err) {
        console.error(err);
      }
    }
    fetchEventos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'vagas' || name === 'localId' || name === 'palestranteId') {
      // Converter para número se não estiver vazio
      const numValue = value === '' ? '' : parseInt(value, 10);
      setFormData((prev) => ({ ...prev, [name]: numValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        vagas: Number(formData.vagas) || 1,
        localId: Number(formData.localId) || 0,
        palestranteId: Number(formData.palestranteId) || 0,
      };

      if (eventoEditando) {
        await editarEvento(eventoEditando.id, payload);
        const data = await getEventos();
        const normalized = Array.isArray(data)
          ? data.map((e, i) => ({ ...e, id: e.id ?? e._id ?? `tmp-${i}` }))
          : [];
        setEventos(normalized);
        setEventoEditando(null);
      } else {
        await criarEvento(payload);
        const atualizados = await getEventos();
        const normalized = Array.isArray(atualizados)
          ? atualizados.map((e, i) => ({
              ...e,
              id: e.id ?? e._id ?? `tmp-${i}`,
            }))
          : [];
        setEventos(normalized);
      }

      setFormData({
        localId: '',
        estadoEvento: 'ABERTO',
        tipoEvento: 'REMOTO',
        data: '',
        titulo: '',
        descricao: '',
        vagas: '',
        palestranteId: '',
      });
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar evento.');
    }
  };

  const iniciarEdicao = (evento) => {
    setEventoEditando(evento);
    setFormData({
      ...evento,
      localId: evento.local?.id || evento.localId, // Garantir que o localId seja corretamente preenchido
      data: new Date(evento.data).toISOString().slice(0, 16), // Formato para datetime-local
    });
  };

  const handleDeletar = async (id) => {
    try {
      await deletarEvento(id);
      setEventos((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error(err);
      alert('Erro ao deletar evento.');
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    eventos,
    iniciarEdicao,
    handleDeletar,
    eventoEditando,
    usuarios,
    locais,
  };
}

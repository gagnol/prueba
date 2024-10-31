'use client';
import { useState } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useContactCount = () => {
  const { data, error } = useSWR('/api/mensajes', fetcher);

  // Asegúrate de que data sea un objeto y accede a la propiedad 'mensajes'
  const count = data?.mensajes ? data.mensajes.length : 0; // Access the mensajes array

  if (error) {
    console.error('Error fetching messages:', error);
  }

  return { count, error }; // Devuelve el conteo y el error (si hay)
};

export default useContactCount;

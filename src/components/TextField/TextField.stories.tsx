import React from 'react';
import TextField from './index';

export default {
  title: 'Components/TextField',
  component: TextField,
};

export const Default = () => <TextField placeholder="Digite algo" />;
export const WithLabel = () => <TextField label="Nome" placeholder="Digite seu nome" />;
export const WithError = () => <TextField error="Campo obrigatório" />;

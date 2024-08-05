import React from 'react';
import CustomToast, { notifySuccess, notifyError, notifyWarn, notifyInfo } from '../index';


export default {
  title: 'Components/CustomToast',
  component: CustomToast,
};

export const Default = () => <CustomToast />;

export const Success = () => (
  <div>
    <CustomToast />
    <button onClick={() => notifySuccess('Operação realizada com sucesso!')}>Mostrar Sucesso</button>
  </div>
);

export const Error = () => (
  <div>
    <CustomToast />
    <button onClick={() => notifyError('Ocorreu um erro!')}>Mostrar Erro</button>
  </div>
);

export const Warn = () => (
  <div>
    <CustomToast />
    <button onClick={() => notifyWarn('Atenção!')}>Mostrar Aviso</button>
  </div>
);

export const Info = () => (
  <div>
    <CustomToast />
    <button onClick={() => notifyInfo('Informação importante.')}>Mostrar Informação</button>
  </div>
);

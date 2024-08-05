import { act } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { toast } from 'react-toastify';
import CustomToast, { notifySuccess, notifyError, notifyWarn, notifyInfo } from '../index';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
  },
  ToastContainer: () => <div>Mocked ToastContainer</div>
}));

describe('Componente CustomToast', () => {
  it('deve renderizar o ToastContainer', () => {
    render(<CustomToast />);
    const toastContainerElement = screen.getByText(/Mocked ToastContainer/i);
    expect(toastContainerElement).toBeInTheDocument();
  });

  it('deve chamar toast.success com a mensagem correta e opções', () => {
    notifySuccess('Operação bem-sucedida!');
    expect(toast.success).toHaveBeenCalledWith('Operação bem-sucedida!', { autoClose: 5000 });
  });

  it('deve chamar toast.error com a mensagem correta e opções', () => {
    notifyError('Ocorreu um erro!');
    expect(toast.error).toHaveBeenCalledWith('Ocorreu um erro!', { autoClose: 5000 });
  });

  it('deve chamar toast.warn com a mensagem correta e opções', () => {
    notifyWarn('Aviso importante!');
    expect(toast.warn).toHaveBeenCalledWith('Aviso importante!', { autoClose: 5000 });
  });

  it('deve chamar toast.info com a mensagem correta e opções', () => {
    notifyInfo('Informação útil!');
    expect(toast.info).toHaveBeenCalledWith('Informação útil!', { autoClose: 5000 });
  });

});

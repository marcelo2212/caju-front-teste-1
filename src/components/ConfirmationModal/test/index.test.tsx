import { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConfirmationModal from '..';

describe('Componente ConfirmationModal', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  const renderComponent = (isOpen: boolean, message: string) => {
    return render(
      <ConfirmationModal
        isOpen={isOpen}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        message={message}
      />
    );
  };

  it('deve não renderizar o modal quando isOpen for false', () => {
    renderComponent(false, 'Tem certeza que deseja continuar?');
    const elementoModal = screen.queryByText(/tem certeza que deseja continuar\?/i);
    expect(elementoModal).not.toBeInTheDocument();
  });

  it('deve renderizar o modal com a mensagem correta quando isOpen for true', () => {
    renderComponent(true, 'Tem certeza que deseja continuar?');
    const elementoMensagem = screen.getByText(/tem certeza que deseja continuar\?/i);
    expect(elementoMensagem).toBeInTheDocument();
  });

  it('deve chamar onConfirm quando o botão "Sim" for clicado', () => {
    renderComponent(true, 'Tem certeza que deseja continuar?');
    const botaoSim = screen.getByText(/sim/i);
    fireEvent.click(botaoSim);
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onClose quando o botão "Não" for clicado', () => {
    renderComponent(true, 'Tem certeza que deseja continuar?');
    const botaoNao = screen.getByText(/não/i);
    fireEvent.click(botaoNao);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('deve aplicar os estilos corretos ao modal', () => {
    renderComponent(true, 'Tem certeza que deseja continuar?');
    const elementoModal = screen.getByText(/tem certeza que deseja continuar\?/i).parentElement;
    expect(elementoModal).toHaveStyle('display: block');
  });
});

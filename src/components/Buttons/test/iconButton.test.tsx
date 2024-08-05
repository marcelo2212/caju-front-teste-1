import { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';import { IconButton } from '../IconButton';


describe('Componente IconButton', () => {
  it('deve renderizar o IconButton com filhos', () => {
    render(<IconButton>Ícone</IconButton>);
    const elementoIconButton = screen.getByText(/ícone/i);
    expect(elementoIconButton).toBeInTheDocument();
  });

  it('deve aplicar os estilos corretos ao IconButton', () => {
    render(<IconButton>Ícone</IconButton>);
    const elementoIconButton = screen.getByText(/ícone/i);
    expect(elementoIconButton).toHaveStyle('border: 2px solid #64a98c');
  });

  it('deve chamar o manipulador onClick quando o IconButton for clicado', () => {
    const handleClick = jest.fn();
    render(<IconButton onClick={handleClick}>Ícone</IconButton>);
    const elementoIconButton = screen.getByText(/ícone/i);
    fireEvent.click(elementoIconButton);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

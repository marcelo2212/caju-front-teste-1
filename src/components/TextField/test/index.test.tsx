import { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextField from '..';

describe('Componente TextField', () => {
  it('deve renderizar o componente com o label', () => {
    render(<TextField label="Nome" id="nome" />);
    const labelElement = screen.getByText(/Nome/i);
    expect(labelElement).toBeInTheDocument();
  });

  it('deve renderizar o componente sem o label', () => {
    render(<TextField id="nome" />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  it('deve exibir o erro corretamente', () => {
    render(<TextField error="Campo obrigatório" />);
    const errorElement = screen.getByText(/Campo obrigatório/i);
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveStyle('color: red');
  });

  it('deve mudar o estilo do input quando focado', () => {
    render(<TextField />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.focus(inputElement);
    expect(inputElement).toHaveStyle(`
      border: 1px solid rgba(36, 28, 21, 0.3);
    `);
  });

  it('deve passar as props corretamente para o input', () => {
    render(<TextField id="nome" placeholder="Digite seu nome" />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveAttribute('id', 'nome');
    expect(inputElement).toHaveAttribute('placeholder', 'Digite seu nome');
  });

  it('deve renderizar o input com valor inicial', () => {
    render(<TextField value="Texto inicial" />);
    const inputElement = screen.getByDisplayValue('Texto inicial');
    expect(inputElement).toBeInTheDocument();
  });
});

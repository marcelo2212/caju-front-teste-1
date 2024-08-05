import { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button, { ButtonSmall } from '..';

describe('Componente Button', () => {
  it('deve renderizar o botão com o rótulo correto', () => {
    render(<Button>Salvar Dados</Button>);
    const elementoBotao = screen.getByText(/salvar dados/i);
    expect(elementoBotao).toBeInTheDocument();
  });

  it('deve aplicar a cor correta ao botão', () => {
    render(<Button color="#fff">Salvar Dados</Button>);
    const elementoBotao = screen.getByText(/salvar dados/i);
    expect(elementoBotao).toBeInTheDocument();
    expect(elementoBotao).toHaveStyle('color: #fff');
  });

  it('deve renderizar um botão com o papel "button"', () => {
    render(<Button>Ativar</Button>);
    const elementoBotao = screen.getByRole('button', { name: /ativar/i });
    expect(elementoBotao).toBeInTheDocument();
  });

  it('deve renderizar um botão pequeno com o rótulo correto', () => {
    render(<ButtonSmall>Ativar</ButtonSmall>);
    const elementoBotaoPequeno = screen.getByRole('button', { name: /ativar/i });
    expect(elementoBotaoPequeno).toBeInTheDocument();
  });

  it('deve renderizar o botão pequeno com a cor correta', () => {
    render(<ButtonSmall color="#FFFFFF">Clique Aqui</ButtonSmall>);
    const elementoBotaoPequeno = screen.getByText(/clique aqui/i);
    expect(elementoBotaoPequeno).toBeInTheDocument();
    expect(elementoBotaoPequeno).toHaveStyle('color: #FFFFFF');
  });

  it('deve aplicar a cor de fundo correta ao botão pequeno', () => {
    render(<ButtonSmall bgcolor="#FF0000">Clique Aqui</ButtonSmall>);
    const elementoBotaoPequeno = screen.getByText(/clique aqui/i);
    expect(elementoBotaoPequeno).toBeInTheDocument();
    expect(elementoBotaoPequeno).toHaveStyle('background-color: #FF0000');
  });

  it('deve chamar o manipulador onClick quando o botão for clicado', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Enviar</Button>);
    const elementoBotao = screen.getByText(/enviar/i);
    fireEvent.click(elementoBotao);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

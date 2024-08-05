import { act } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingModal from '..';

describe('Componente LoadingModal', () => {
  it('deve renderizar o modal de carregamento quando isLoading é true', () => {
    render(<LoadingModal isLoading={true} />);
    const loadingModalElement = screen.getByTestId('spinner');
    expect(loadingModalElement).toBeInTheDocument();
  });

  it('não deve renderizar o modal de carregamento quando isLoading é false', () => {
    const { container } = render(<LoadingModal isLoading={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('deve renderizar o spinner dentro do modal de carregamento', () => {
    render(<LoadingModal isLoading={true} />);
    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toBeInTheDocument();
  });
});

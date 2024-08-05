import { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchBar } from '..';
import { useRegistrations } from '~/contexts/RegistrationContext';
import { Registration } from '~/types/Registration';

jest.mock('~/contexts/RegistrationContext');

const mockUseRegistrations = useRegistrations as jest.MockedFunction<typeof useRegistrations>;

describe('Componente SearchBar', () => {
  const mockFetchRegistrations = jest.fn();
  const mockFilterRegistrationsByCpf = jest.fn();
  const mockUpdateRegistrationStatus = jest.fn();
  const mockAddRegistration = jest.fn();
  const mockDeleteRegistration = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRegistrations.mockReturnValue({
      registrations: [] as Registration[],
      fetchRegistrations: mockFetchRegistrations,
      filterRegistrationsByCpf: mockFilterRegistrationsByCpf,
      updateRegistrationStatus: mockUpdateRegistrationStatus,
      addRegistration: mockAddRegistration,
      deleteRegistration: mockDeleteRegistration,
    });
  });

  it('deve renderizar o campo de texto e os botões', () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText('Digite um CPF válido')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /refetch/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /nova admissão/i })).toBeInTheDocument();
  });

  it('deve formatar e desmascarar o CPF corretamente ao digitar', () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText('Digite um CPF válido');
    fireEvent.change(input, { target: { value: '510.129.055-55' } });

    expect(mockFilterRegistrationsByCpf).toHaveBeenCalledWith('51012905555');
  });

  it('deve buscar todos os registros ao limpar o campo de CPF', () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText('Digite um CPF válido');
    fireEvent.change(input, { target: { value: '' } });

    expect(mockFetchRegistrations).toHaveBeenCalled();
  });

  it('deve chamar fetchRegistrations ao clicar no botão de refresh', () => {
    render(<SearchBar />);

    const refreshButton = screen.getByRole('button', { name: /refetch/i });
    fireEvent.click(refreshButton);

    expect(mockFetchRegistrations).toHaveBeenCalled();
  });

  it('deve redirecionar para a página de nova admissão ao clicar no botão Nova Admissão', () => {
    const history = { push: jest.fn() };
    jest.spyOn(require('react-router-dom'), 'useHistory').mockReturnValue(history);

    render(<SearchBar />);

    const newAdmissionButton = screen.getByRole('button', { name: /nova admissão/i });
    fireEvent.click(newAdmissionButton);

    expect(history.push).toHaveBeenCalledWith('/new-user');
  });
});

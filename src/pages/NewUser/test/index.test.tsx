import { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useHistory } from 'react-router-dom';
import { useRegistrations } from '~/contexts/RegistrationContext';
import { newUser } from '~/mocks/newUser-mock';
import { StatusEnum } from '~/types/StatusEnum';
import { notifyError } from '~/components/CustomToast';
import { formatDate, isValidDate } from '~/utils/admissionDateUtils';
import { isValidEmployeeName } from '~/utils/employeeNameUtils';
import { formatCpf, isValidCPF, unmaskCpf } from '~/utils/cpfUtils';
import { isValidEmail } from '~/utils/emailUtils';
import NewUserPage from '..';
import routes from '~/router/routes';

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
}));

jest.mock('~/contexts/RegistrationContext', () => ({
  useRegistrations: jest.fn(),
}));

jest.mock('~/components/CustomToast', () => ({
  notifyError: jest.fn(),
}));

jest.mock('~/utils/admissionDateUtils', () => ({
  formatDate: jest.fn((date) => date),
  isValidDate: jest.fn(() => true),
}));

jest.mock('~/utils/employeeNameUtils', () => ({
  isValidEmployeeName: jest.fn(() => true),
}));

jest.mock('~/utils/cpfUtils', () => ({
  formatCpf: jest.fn((cpf) => cpf),
  isValidCPF: jest.fn(() => true),
  unmaskCpf: jest.fn((cpf) => cpf.replace(/\D/g, '')),
}));

jest.mock('~/utils/emailUtils', () => ({
  isValidEmail: jest.fn(() => true),
}));

describe('Componente NewUserPage', () => {
  const mockAddRegistration = jest.fn();
  const mockFilterRegistrationsByCpf = jest.fn();
  const mockFetchRegistrations = jest.fn();
  const mockHistoryPush = jest.fn();

  beforeEach(() => {
    (useHistory as jest.Mock).mockReturnValue({ push: mockHistoryPush });
    (useRegistrations as jest.Mock).mockReturnValue({
      addRegistration: mockAddRegistration,
      filterRegistrationsByCpf: mockFilterRegistrationsByCpf,
      fetchRegistrations: mockFetchRegistrations,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar todos os campos de entrada e o botão de cadastro', () => {
    render(<NewUserPage />);
    expect(screen.getByPlaceholderText('Nome Completo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('CPF')).toBeInTheDocument();
    expect(screen.getByLabelText('Data de admissão')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cadastrar/i })).toBeInTheDocument();
  });

  it('deve validar e mostrar erros no formulário', async () => {
    (isValidEmail as jest.Mock).mockReturnValue(false);
    (isValidCPF as jest.Mock).mockReturnValue(false);
    (isValidEmployeeName as jest.Mock).mockReturnValue(false);
    (isValidDate as jest.Mock).mockReturnValue(false);

    render(<NewUserPage />);
    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

    await waitFor(() => {
      expect(screen.getByText('Email inválido.')).toBeInTheDocument();
      expect(screen.getByText('CPF inválido.')).toBeInTheDocument();
      expect(screen.getByText('Nome inválido ou imcompleto.')).toBeInTheDocument();
      expect(screen.getByText('Data de admissão inválida.')).toBeInTheDocument();
      expect(notifyError).toHaveBeenCalledWith('Por favor, corrija os erros no formulário.');
    });
  });

  it('deve adicionar um novo registro ao submeter o formulário', async () => {
    mockFilterRegistrationsByCpf.mockResolvedValue([]);
    render(<NewUserPage />);

    fireEvent.change(screen.getByPlaceholderText('Nome Completo'), { target: { value: 'João Silva' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'joao@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('CPF'), { target: { value: '51012905055' } });
    fireEvent.change(screen.getByLabelText('Data de admissão'), { target: { value: '2022-01-01' } });

    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

    await waitFor(() => {
      expect(mockAddRegistration).toHaveBeenCalledWith({
        ...newUser,
        employeeName: 'João Silva',
        email: 'joao@example.com',
        cpf: '51012905055',
        admissionDate: '01/01/2022',
        status: StatusEnum.REVIEW,
      });
      expect(mockFilterRegistrationsByCpf).toHaveBeenCalledWith('51012905055');
    });
  });

  it('deve notificar erro se o CPF já estiver cadastrado', async () => {
    mockFilterRegistrationsByCpf.mockResolvedValue([newUser]);
    render(<NewUserPage />);

    fireEvent.change(screen.getByPlaceholderText('CPF'), { target: { value: '51012905055' } });
    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

    await waitFor(() => {
      expect(mockFilterRegistrationsByCpf).toHaveBeenCalledWith('51012905055');
      expect(screen.getByText('O registro digitado já foi cadastrado.')).toBeInTheDocument();
    });
  });

  it('deve redirecionar para o dashboard ao clicar no botão de voltar', () => {
    render(<NewUserPage />);
    fireEvent.click(screen.getByRole('button', { name: /back/i }));
    expect(mockFetchRegistrations).toHaveBeenCalled();
    expect(mockHistoryPush).toHaveBeenCalledWith(routes.dashboard);
  });
});

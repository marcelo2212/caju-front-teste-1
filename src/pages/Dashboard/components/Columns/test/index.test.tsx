import { act } from 'react';
import { render, screen } from '@testing-library/react';
import Columns from '..';
import { RegistrationContext } from '../../../../../contexts/RegistrationContext';
import { listStatusMock } from '../../../../../mocks/listStatus-mock';
import { StatusEnum } from '~/types/StatusEnum';


jest.mock('../RegistrationCard', () => {
  return jest.fn(({ data }) => <div>Card: {data.id}</div>);
});

describe('Columns Component', () => {
  const mockRegistrations = [
    { id: '1', employeeName: 'John Doe', status: StatusEnum.REVIEW, email:'john1@gmail.com',cpf:'61836621000',admissionDate:'22/12/2024' },
    { id: '2', employeeName: 'Jane Doe', status: StatusEnum.APPROVED, email:'john1@gmail.com',cpf:'93357932059',admissionDate:'22/12/2023' }
  ];

  const mockUpdateRegistrationStatus = jest.fn();
  const mockDeleteRegistration = jest.fn();
  const mockAddRegistration = jest.fn();
  const mockFilterRegistrationsByCpf = jest.fn();
  const mockFetchRegistrations = jest.fn();

  const wrapper = ( children:any ) => (
    <RegistrationContext.Provider value={{
      registrations: mockRegistrations,
      updateRegistrationStatus: mockUpdateRegistrationStatus,
      deleteRegistration: mockDeleteRegistration,
      addRegistration: mockAddRegistration,
      filterRegistrationsByCpf: mockFilterRegistrationsByCpf,
      fetchRegistrations: mockFetchRegistrations
    }}>
      {children}
    </RegistrationContext.Provider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar colunas para cada status do mock', () => {
    render(<Columns />, { wrapper });
    listStatusMock.forEach(status => {
      expect(screen.getByText(status.title)).toBeInTheDocument();
    });
  });

  it('deve renderizar RegistrationCard para cada registro filtrado', () => {
    render(<Columns />, { wrapper });
    mockRegistrations.forEach(reg => {
      expect(screen.getByText(`Card: ${reg.id}`)).toBeInTheDocument();
    });
  });
});

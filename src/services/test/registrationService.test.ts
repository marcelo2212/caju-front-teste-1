import { act } from 'react';
import axios from 'axios';
import { api } from '../axiosConfig';
import { getRegistrations, getRegistrationsByCpf, updateRegistration, createRegistration, removeRegistration } from '../registrationService';
import { Registration } from '~/types/Registration';
import { StatusEnum } from '~/types/StatusEnum';

jest.mock('axios');

const mockAxios = axios as jest.Mocked<typeof axios>;

const mockResponseData = [
  {
    id: '1',
    employeeName: 'João Silva',
    email: 'joao.silva@example.com',
    admissionDate: '10/08/2023',
    status: StatusEnum.REVIEW,
    cpf: '51012905055'
  }
];

describe('Serviço de Registro', () => {
  const uriRegistrations = 'http://localhost:3000/registrations';
  const uriRegistrationsFilterByCpf = '/cpf/';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve buscar todos os registros', async () => {
    mockAxios.get.mockResolvedValue({ data: mockResponseData });

    const result = await getRegistrations();
    expect(mockAxios.get).toHaveBeenCalledWith(`${uriRegistrations}`);
    expect(result).toEqual(mockResponseData);
  });

  it('deve buscar registros por CPF', async () => {
    const cpf = '51012905055';
    mockAxios.get.mockResolvedValue({ data: mockResponseData });

    const result = await getRegistrationsByCpf(cpf);
    expect(mockAxios.get).toHaveBeenCalledWith(`${uriRegistrations}${uriRegistrationsFilterByCpf}${cpf}`);
    expect(result).toEqual(mockResponseData);
  });

  it('deve atualizar um registro', async () => {
    const updateData: Registration = { ...mockResponseData[0], status: StatusEnum.APPROVED };
    mockAxios.put.mockResolvedValue({});

    await updateRegistration(updateData);
    expect(mockAxios.put).toHaveBeenCalledWith(`${uriRegistrations}/${updateData.id}`, updateData);
  });

  it('deve criar um novo registro', async () => {
    const newData: Registration = {
      id: '2',
      employeeName: 'Maria Souza',
      email: 'maria.souza@example.com',
      admissionDate: '2022-01-01',
      status: StatusEnum.REVIEW,
      cpf: '98765432100'
    };
    mockAxios.post.mockResolvedValue({});

    await createRegistration(newData);
    expect(mockAxios.post).toHaveBeenCalledWith(`${uriRegistrations}`, newData);
  });

  it('deve remover um registro', async () => {
    const id = '1';
    mockAxios.delete.mockResolvedValue({});

    await removeRegistration(id);
    expect(mockAxios.delete).toHaveBeenCalledWith(`${uriRegistrations}/${id}`);
  });
});

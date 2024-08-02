import { api } from './axiosConfig';
import { Registration } from '../types/Registration';

const uriRegistrations = import.meta.env.VITE_APP_URI_REGISTRATIONS;
const uriRegistrationsFilterByCpf = import.meta.env.VITE_APP_URI_REGISTRATIONS_FILTER_BY_CPF;

export const getRegistrations = async (): Promise<Registration[]> => {
  const response = await api.get(`${uriRegistrations}`);
  return response.data;
};

export const getRegistrationsByCpf = async (cpf: string): Promise<Registration[]> => {
  const response = await api.get(`${uriRegistrations}${uriRegistrationsFilterByCpf}${cpf}`);
  return response.data;
};

export const updateRegistration = async (data: Registration): Promise<void> => {
  await api.put(`${uriRegistrations}/${data.id}`, data);
};

export const createRegistration = async (data: Registration): Promise<void> => {
  await api.post(`${uriRegistrations}`, data);
};

export const removeRegistration = async (id: string): Promise<void> => {
  await api.delete(`${uriRegistrations}/${id}`);
};

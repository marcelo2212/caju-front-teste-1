import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getRegistrations, updateRegistration, getRegistrationsByCpf, createRegistration, removeRegistration } from '../services/registrationService';
import { Registration } from '../types/Registration';

interface RegistrationContextProps {
  registrations: Registration[];
  fetchRegistrations: () => void;
  updateRegistrationStatus: (registration: Registration) => void;
  filterRegistrationsByCpf: (cpf: string) => Promise<Registration[]>;
  addRegistration: (registration: Registration) => void;
  deleteRegistration: (id: string) => void;
}

interface RegistrationProviderProps {
  children: ReactNode;
}

const RegistrationContext = createContext<RegistrationContextProps | undefined>(undefined);

export const RegistrationProvider: React.FC<RegistrationProviderProps> = ({ children }) => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  const fetchRegistrations = async () => {
    const data = await getRegistrations();
    setRegistrations(data);
  };

  const updateRegistrationStatus = async (registration: Registration) => {
    await updateRegistration(registration);
    setRegistrations((prevRegistrations) =>
      prevRegistrations.map((reg) =>
        reg.id === registration.id ? { ...reg, status: registration.status } : reg
      )
    );
  };

  const filterRegistrationsByCpf = async (cpf: string): Promise<Registration[]> => {
    try {
      const data = await getRegistrationsByCpf(cpf);
      setRegistrations(data);
      return data;
    } catch (error) {
      console.error("Erro ao filtrar registros:", error);
      return [];
    }
  };

  const addRegistration = async (registration: Registration) => {
    await createRegistration(registration);
    setRegistrations((prevRegistrations) => [...prevRegistrations, registration]);
  };

  const deleteRegistration = async (id: string) => {
    await removeRegistration(id);
    fetchRegistrations();
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  return (
    <RegistrationContext.Provider value={{ registrations, fetchRegistrations, updateRegistrationStatus, filterRegistrationsByCpf, addRegistration, deleteRegistration }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistrations = () => {
  const context = useContext(RegistrationContext);
  if (!context) throw new Error('useRegistrations must be used within a RegistrationProvider');
  return context;
};

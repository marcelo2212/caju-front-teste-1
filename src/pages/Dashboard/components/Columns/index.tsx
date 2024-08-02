import React from 'react';
import * as S from './styles';
import RegistrationCard from '../RegistrationCard';
import { useRegistrations } from '../../../../contexts/RegistrationContext';
import { listStatusMock } from '../../../../mocks/listStatus-mock';

const allColumns = listStatusMock;

const Columns: React.FC = () => {
  const { registrations, updateRegistrationStatus, deleteRegistration } = useRegistrations();

  return (
    <S.Container>
      {allColumns.map((column) => {
        const filteredRegistrations = registrations.filter(
          (registration) => registration.status === column.status
        );

        return (
          <S.Column status={column.status} key={column.title}>
            <>
              <S.TitleColumn status={column.status}>
                {column.title}
              </S.TitleColumn>
              <S.CollumContent>
                {filteredRegistrations.map((registration) => (
                  <RegistrationCard
                    data={registration}
                    key={registration.id}
                    onUpdateStatus={(registration, status) => updateRegistrationStatus({ ...registration, status })}
                    onDelete={(id) => deleteRegistration(id)}
                  />
                ))}
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};

export default Columns;

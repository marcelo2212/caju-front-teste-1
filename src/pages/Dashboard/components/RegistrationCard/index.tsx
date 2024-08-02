import React, { useState } from 'react';
import { ButtonSmall } from '../../../../components/Buttons';
import * as S from './styles';
import { HiOutlineMail, HiOutlineUser, HiOutlineCalendar, HiOutlineTrash } from 'react-icons/hi';
import { StatusEnum } from '../../../../types/StatusEnum';
import { Registration } from '../../../../types/Registration';
import ConfirmationModal from '../../../../components/ConfirmationModal';
import { listStatusMock } from '../../../../mocks/listStatus-mock';

type Props = {
  data: Registration;
  onUpdateStatus: (registration: Registration, status: StatusEnum) => void;
  onDelete: (id: string) => void;
};

const RegistrationCard = ({ data, onUpdateStatus, onDelete }: Props) => {
  const [isStatusModalOpen, setStatusModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [statusToUpdate, setStatusToUpdate] = useState<StatusEnum | null>(null);

  const handleStatusChange = (status: StatusEnum) => {
    setStatusToUpdate(status);
    setStatusModalOpen(true);
  };

  const handleConfirmStatusChange = () => {
    if (statusToUpdate) {
      onUpdateStatus(data, statusToUpdate);
      setStatusToUpdate(null);
    }
    setStatusModalOpen(false);
  };

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(data.id || '1');
    setDeleteModalOpen(false);
  };

  const handleClose = () => {
    setStatusToUpdate(null);
    setStatusModalOpen(false);
    setDeleteModalOpen(false);
  };

  const getConfirmationMessage = (status: StatusEnum) => {
    const statusItem = listStatusMock.find(item => item.status === status);
    return statusItem ? statusItem.title.toUpperCase() : '';
  };

  return (
    <>
      <S.Card>
        <S.IconAndText>
          <HiOutlineUser />
          <h3>{data.employeeName}</h3>
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineMail />
          <p>{data.email}</p>
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineCalendar />
          <span>{data.admissionDate}</span>
        </S.IconAndText>
        <S.Actions>
          {data.status !== StatusEnum.REPROVED && (
            <ButtonSmall
              bgcolor="rgb(255, 145, 154)"
              onClick={() => handleStatusChange(StatusEnum.REPROVED)}
            >
              Reprovar
            </ButtonSmall>
          )}
          {data.status !== StatusEnum.APPROVED && (
            <ButtonSmall
              bgcolor="rgb(155, 229, 155)"
              onClick={() => handleStatusChange(StatusEnum.APPROVED)}
            >
              Aprovar
            </ButtonSmall>
          )}
          {data.status !== StatusEnum.REVIEW && (
            <ButtonSmall
              bgcolor="#ff8858"
              onClick={() => handleStatusChange(StatusEnum.REVIEW)}
            >
              Revisar novamente
            </ButtonSmall>
          )}
          <HiOutlineTrash onClick={handleDeleteClick} />
        </S.Actions>
      </S.Card>

      <ConfirmationModal
        isOpen={isStatusModalOpen}
        onClose={handleClose}
        onConfirm={handleConfirmStatusChange}
        message={`Deseja mudar o status de ${data.employeeName.toUpperCase()} para ${getConfirmationMessage(statusToUpdate || StatusEnum.REVIEW)}?`}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleClose}
        onConfirm={handleConfirmDelete}
        message={`Deseja realmente excluir o registro de ${data.employeeName.toUpperCase()}?`}
      />
    </>
  );
};

export default RegistrationCard;

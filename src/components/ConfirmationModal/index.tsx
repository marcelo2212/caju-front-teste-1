import React from 'react';
import * as S from './styles';
import Button, { Buttons } from '../Buttons';


type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
};

const ConfirmationModal: React.FC<Props> = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <S.Modal>
      <S.ModalContent>
        <S.Message>{message}</S.Message>
        <Buttons>
          <Button onClick={onConfirm}>Sim</Button>
          <Button onClick={onClose}>Não</Button>
        </Buttons>
      </S.ModalContent>
    </S.Modal>
  );
};

export default ConfirmationModal;

import React from 'react';
import ConfirmationModal from '../index';

export default {
  title: 'Components/ConfirmationModal',
  component: ConfirmationModal,
};

export const Default = () => (
  <ConfirmationModal
    isOpen={true}
    onClose={() => {}}
    onConfirm={() => {}}
    message="Você tem certeza?"
  />
);
export const Closed = () => (
  <ConfirmationModal
    isOpen={false}
    onClose={() => {}}
    onConfirm={() => {}}
    message="Você tem certeza?"
  />
);

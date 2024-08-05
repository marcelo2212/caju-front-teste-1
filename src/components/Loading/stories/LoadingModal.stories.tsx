import React from 'react';
import LoadingModal from '../index';

export default {
  title: 'Components/LoadingModal',
  component: LoadingModal,
};

export const Default = () => <LoadingModal isLoading={true} />;
export const Hidden = () => <LoadingModal isLoading={false} />;

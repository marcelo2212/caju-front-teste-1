import React from 'react';

interface LoadingModalProps {
  isLoading: boolean;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="loading-modal">
      <div className="spinner" data-testid="spinner"></div>
    </div>
  );
};

export default LoadingModal;

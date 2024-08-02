import React from 'react';
import './index.css';

interface LoadingModalProps {
  isLoading: boolean;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="loading-modal">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingModal;

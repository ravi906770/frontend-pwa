import React from 'react';

interface ExportProps {
    onExport: (value: string) => void;
    children?: React.ReactNode; 
}

const ExportButton: React.FC<ExportProps> = ({ onExport , children}) => (
  <button
    style={{
      backgroundColor: '#4CAF50',
      border: 'none',
      color: 'white',
      padding: '12px 24px',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '16px',
      margin: '4px 2px',
      cursor: 'pointer',
      borderRadius: '8px',
    }}
    onClick={() => onExport('')}
  >
    {children}
  </button>
);

export default ExportButton;

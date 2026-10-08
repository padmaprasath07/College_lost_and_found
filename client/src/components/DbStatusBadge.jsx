import React from 'react';
import { Database } from 'lucide-react';

export const DbStatusBadge = ({ dbStatus }) => {
  const isConnected = dbStatus?.connected;
  const isCloud = dbStatus?.isAtlasCloud;

  return (
    <div
      className={`db-badge-pill ${isConnected ? 'connected' : 'offline'}`}
      title="Live MongoDB Atlas Cloud Connectivity"
    >
      <span className="db-pulse-dot">
        {isConnected && <span className="db-pulse-ring"></span>}
        <span className={`db-dot ${isConnected ? 'green' : 'amber'}`}></span>
      </span>
      <Database className="db-badge-icon" size={14} />
      <span className="db-badge-text">
        {isConnected ? (isCloud !== false ? 'MongoDB Atlas' : 'MongoDB Live') : 'Connecting...'}
      </span>
    </div>
  );
};

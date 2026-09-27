import React, { useState } from 'react';
import { Database, CheckCircle2, AlertCircle, RefreshCw, X, Server, HardDrive, ShieldCheck } from 'lucide-react';

export const DbStatusBadge = ({ dbStatus, onRefresh, onReseed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isReseeding, setIsReseeding] = useState(false);

  const isConnected = dbStatus?.connected;
  const isCloud = dbStatus?.isAtlasCloud;

  const handleReseed = async () => {
    setIsReseeding(true);
    await onReseed();
    setIsReseeding(false);
  };

  return (
    <>
      {/* Clickable Pill Badge */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`db-badge-pill ${isConnected ? 'connected' : 'offline'}`}
        title="Click to view MongoDB Connection Diagnostics"
      >
        <span className="db-pulse-dot">
          {isConnected && <span className="db-pulse-ring"></span>}
          <span className={`db-dot ${isConnected ? 'green' : 'amber'}`}></span>
        </span>
        <Database className="db-badge-icon" />
        <span className="db-badge-text">
          {isConnected ? (isCloud ? 'MongoDB Atlas' : 'MongoDB Live') : 'Demo Mode'}
        </span>
      </button>

      {/* Database Diagnostic Modal */}
      {isOpen && (
        <div 
          className="modal-backdrop" 
          onClick={(e) => { if (e.target === e.currentTarget) setIsOpen(false); }}
        >
          <div className="db-modal-card">
            {/* Header */}
            <div className="db-modal-header">
              <div className="db-modal-title-group">
                <div className={`db-icon-box ${isConnected ? 'green' : 'amber'}`}>
                  <Database size={20} />
                </div>
                <div>
                  <h3 className="db-modal-title">Database Diagnostics</h3>
                  <p className="db-modal-subtitle">CampusFind Full-Stack MERN Architecture</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="modal-close-btn"
              >
                <X size={18} />
              </button>
            </div>

            {/* Diagnostic Metrics */}
            <div className="db-metrics-list">
              <div className="db-metric-row">
                <div className="db-metric-label">
                  <Server size={15} />
                  <span>Connection State</span>
                </div>
                <div className="db-metric-value">
                  {isConnected ? (
                    <span className="status-live">
                      <CheckCircle2 size={15} /> Connected & Active
                    </span>
                  ) : (
                    <span className="status-offline">
                      <AlertCircle size={15} /> Offline Fallback
                    </span>
                  )}
                </div>
              </div>

              <div className="db-metric-row">
                <div className="db-metric-label">
                  <HardDrive size={15} />
                  <span>Database Engine</span>
                </div>
                <span className="db-metric-value font-mono">
                  {dbStatus?.engine || 'MongoDB v8.2 + Mongoose ODM'}
                </span>
              </div>

              <div className="db-metric-row">
                <div className="db-metric-label">
                  <ShieldCheck size={15} />
                  <span>Cluster Host</span>
                </div>
                <span className="db-metric-value font-mono">
                  {dbStatus?.host || 'localhost:27017'}
                </span>
              </div>

              {/* Collections Status */}
              <div className="db-collections-box">
                <span className="db-collections-title">Live MongoDB Collections:</span>
                <div className="db-collections-grid">
                  <div className="db-collection-card">
                    <div className="db-count">{dbStatus?.counts?.items ?? 6}</div>
                    <div className="db-label">Items Listed</div>
                  </div>
                  <div className="db-collection-card">
                    <div className="db-count">{dbStatus?.counts?.claims ?? 1}</div>
                    <div className="db-label">Verified Claims</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="db-actions-row">
              <button
                type="button"
                onClick={onRefresh}
                className="btn-refresh-diag"
              >
                <RefreshCw size={14} /> Refresh Check
              </button>
              {isConnected && (
                <button
                  type="button"
                  onClick={handleReseed}
                  disabled={isReseeding}
                  className="btn-reseed-diag"
                >
                  <RefreshCw size={14} className={isReseeding ? 'spin' : ''} />
                  {isReseeding ? 'Reseeding...' : 'Reseed Sample Data'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Tag, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  Filter, 
  ShieldCheck, 
  X, 
  Sparkles,
  ArrowRight,
  Clock,
  Compass,
  FileText,
  HelpCircle,
  Eye
} from 'lucide-react';
import { INITIAL_ITEMS, CATEGORIES, CAMPUS_LOCATIONS } from './mockData';
import './App.css';

export default function App() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'lost', 'found', 'claimed'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportType, setReportType] = useState('lost');
  const [activeItemDetail, setActiveItemDetail] = useState(null);
  const [activeClaimItem, setActiveClaimItem] = useState(null);
  const [claimProof, setClaimProof] = useState('');
  const [claimSuccess, setClaimSuccess] = useState(false);

  // New Item Form
  const [formData, setFormData] = useState({
    title: '',
    category: 'Electronics',
    location: 'Central Library',
    date: new Date().toISOString().split('T')[0],
    time: '12:00 PM',
    description: '',
    image: '',
    reportedBy: '',
    securityQuestion: ''
  });

  // Toast
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Type/Status Tab Filter
      if (activeTab === 'lost' && item.type !== 'lost') return false;
      if (activeTab === 'found' && item.type !== 'found') return false;
      if (activeTab === 'claimed' && item.status !== 'claimed') return false;

      // Category Filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;

      // Location Filter
      if (selectedLocation !== 'All Locations' && !item.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
        return false;
      }

      // Search Query Filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesLoc = item.location.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesLoc) return false;
      }

      return true;
    });
  }, [items, activeTab, selectedCategory, selectedLocation, searchQuery]);

  // Handle reporting new item
  const handleCreateReport = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      showToast('⚠️ Please fill out all required fields.');
      return;
    }

    const newItem = {
      id: `item-${Date.now()}`,
      type: reportType,
      title: formData.title,
      category: formData.category,
      location: formData.location,
      date: formData.date,
      time: formData.time,
      status: 'available',
      description: formData.description,
      image: formData.image || 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80',
      reportedBy: formData.reportedBy || 'Student (Verified)',
      securityQuestion: formData.securityQuestion || 'Describe unique identifiable marks or features'
    };

    setItems([newItem, ...items]);
    setIsReportModalOpen(false);
    setFormData({
      title: '',
      category: 'Electronics',
      location: 'Central Library',
      date: new Date().toISOString().split('T')[0],
      time: '12:00 PM',
      description: '',
      image: '',
      reportedBy: '',
      securityQuestion: ''
    });
    showToast(`✅ Successfully reported ${reportType.toUpperCase()} item!`);
  };

  // Handle claim submission
  const handleClaimSubmit = (e) => {
    e.preventDefault();
    if (!claimProof.trim()) {
      showToast('⚠️ Please provide verification details or answers to the security question.');
      return;
    }

    setClaimSuccess(true);
    setTimeout(() => {
      // Mark item as claimed
      setItems(items.map(item => item.id === activeClaimItem.id ? { ...item, status: 'claimed' } : item));
      setActiveClaimItem(null);
      setClaimProof('');
      setClaimSuccess(false);
      showToast('🎉 Claim submitted! The finder has been notified.');
    }, 1200);
  };

  return (
    <div className="app-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-banner">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <header className="navbar">
        <div className="nav-content">
          <div className="brand-logo">
            <div className="brand-icon">
              <Compass className="icon-pulse" size={24} />
            </div>
            <div>
              <span className="brand-name">Campus<span className="highlight">Find</span></span>
              <span className="campus-badge">📍 University Central</span>
            </div>
          </div>

          <div className="nav-actions">
            <button 
              className="btn btn-secondary"
              onClick={() => {
                setReportType('lost');
                setIsReportModalOpen(true);
              }}
            >
              <AlertCircle size={16} className="text-orange" />
              <span>Report Lost</span>
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setReportType('found');
                setIsReportModalOpen(true);
              }}
            >
              <Plus size={16} />
              <span>Report Found</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-pill">
            <Sparkles size={14} className="sparkle-icon" />
            <span>Campus Community Lost & Found Network</span>
          </div>
          <h1 className="hero-title">
            Lost Something on Campus? <br />
            <span className="hero-gradient">Let's Help You Recover It.</span>
          </h1>
          <p className="hero-description">
            A verified platform for students and faculty. Easily report missing belongings, 
            browse items discovered across campus, and verify ownership safely.
          </p>

          <div className="hero-stats">
            <div className="stat-card">
              <span className="stat-number">340+</span>
              <span className="stat-label">Items Reconnected</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-card">
              <span className="stat-number">95%</span>
              <span className="stat-label">Verification Rate</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-card">
              <span className="stat-number">&lt; 24h</span>
              <span className="stat-label">Avg. Claim Time</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Search & Tabs Controls */}
        <div className="control-panel">
          <div className="search-bar-wrapper">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search items by name, description, or building (e.g. 'AirPods', 'Calculus')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                <X size={16} />
              </button>
            )}
          </div>

          <div className="filters-row">
            {/* Status Tabs */}
            <div className="tabs-container">
              <button 
                className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All Items
              </button>
              <button 
                className={`tab-btn tab-lost ${activeTab === 'lost' ? 'active' : ''}`}
                onClick={() => setActiveTab('lost')}
              >
                Lost Items
              </button>
              <button 
                className={`tab-btn tab-found ${activeTab === 'found' ? 'active' : ''}`}
                onClick={() => setActiveTab('found')}
              >
                Found Items
              </button>
              <button 
                className={`tab-btn ${activeTab === 'claimed' ? 'active' : ''}`}
                onClick={() => setActiveTab('claimed')}
              >
                Claimed / Resolved
              </button>
            </div>

            {/* Campus Location Filter */}
            <div className="location-select-wrapper">
              <MapPin size={16} className="filter-location-icon" />
              <select 
                value={selectedLocation} 
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="location-select"
              >
                {CAMPUS_LOCATIONS.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Chips */}
          <div className="category-scroll">
            {CATEGORIES.map(category => (
              <button
                key={category}
                className={`category-chip ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter & Info */}
        <div className="results-header">
          <p className="results-count">
            Showing <strong>{filteredItems.length}</strong> {filteredItems.length === 1 ? 'item' : 'items'}
          </p>
          {(searchQuery || selectedCategory !== 'All' || selectedLocation !== 'All Locations' || activeTab !== 'all') && (
            <button 
              className="reset-filters-btn"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedLocation('All Locations');
                setActiveTab('all');
              }}
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <HelpCircle size={48} />
            </div>
            <h3>No items found</h3>
            <p>We couldn't find any listings matching your current criteria. Try adjusting your search or report a new item.</p>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setReportType('lost');
                setIsReportModalOpen(true);
              }}
            >
              <Plus size={16} /> Report Item
            </button>
          </div>
        ) : (
          <div className="items-grid">
            {filteredItems.map(item => (
              <article key={item.id} className="item-card">
                <div className="card-image-wrapper">
                  <img src={item.image} alt={item.title} className="card-image" loading="lazy" />
                  <span className={`status-badge badge-${item.type}`}>
                    {item.type.toUpperCase()}
                  </span>
                  {item.status === 'claimed' && (
                    <span className="claimed-overlay-badge">
                      <CheckCircle2 size={13} /> CLAIMED
                    </span>
                  )}
                  <span className="category-tag">
                    <Tag size={12} /> {item.category}
                  </span>
                </div>

                <div className="card-body">
                  <h3 className="card-title" title={item.title}>{item.title}</h3>
                  
                  <div className="meta-row">
                    <MapPin size={14} className="meta-icon" />
                    <span className="meta-text">{item.location}</span>
                  </div>

                  <div className="meta-row">
                    <Calendar size={14} className="meta-icon" />
                    <span className="meta-text">{item.date} • {item.time}</span>
                  </div>

                  <p className="card-description">{item.description}</p>

                  <div className="card-reporter">
                    <ShieldCheck size={14} className="shield-icon" />
                    <span>Reported by: <strong>{item.reportedBy}</strong></span>
                  </div>

                  <div className="card-actions">
                    <button 
                      className="btn-card-detail"
                      onClick={() => setActiveItemDetail(item)}
                    >
                      <Eye size={15} /> Details
                    </button>
                    {item.status !== 'claimed' ? (
                      <button 
                        className={`btn-card-claim ${item.type === 'found' ? 'claim-found' : 'claim-lost'}`}
                        onClick={() => setActiveClaimItem(item)}
                      >
                        {item.type === 'found' ? 'This is Mine' : 'I Found This'}
                      </button>
                    ) : (
                      <span className="resolved-tag">Resolved</span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Item Detail Modal */}
      {activeItemDetail && (
        <div className="modal-backdrop" onClick={() => setActiveItemDetail(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setActiveItemDetail(null)}>
              <X size={20} />
            </button>
            <div className="detail-modal-layout">
              <div className="detail-modal-image-col">
                <img src={activeItemDetail.image} alt={activeItemDetail.title} className="detail-modal-img" />
                <span className={`status-badge badge-${activeItemDetail.type}`}>
                  {activeItemDetail.type.toUpperCase()}
                </span>
              </div>
              <div className="detail-modal-info-col">
                <h2>{activeItemDetail.title}</h2>
                <div className="detail-tags-row">
                  <span className="pill-tag"><Tag size={13} /> {activeItemDetail.category}</span>
                  <span className="pill-tag"><MapPin size={13} /> {activeItemDetail.location}</span>
                  <span className="pill-tag"><Calendar size={13} /> {activeItemDetail.date}</span>
                </div>
                
                <div className="detail-block">
                  <h4>Full Description</h4>
                  <p>{activeItemDetail.description}</p>
                </div>

                <div className="detail-block">
                  <h4>Security Verification Prompt</h4>
                  <div className="security-prompt-box">
                    <ShieldCheck size={18} className="shield-icon" />
                    <div>
                      <strong>Required verification from claimant:</strong>
                      <p>{activeItemDetail.securityQuestion}</p>
                    </div>
                  </div>
                </div>

                <div className="detail-block">
                  <h4>Reported By</h4>
                  <p>{activeItemDetail.reportedBy} (Verified Campus Member)</p>
                </div>

                <div className="detail-actions">
                  {activeItemDetail.status !== 'claimed' && (
                    <button 
                      className="btn btn-primary"
                      onClick={() => {
                        const target = activeItemDetail;
                        setActiveItemDetail(null);
                        setActiveClaimItem(target);
                      }}
                    >
                      {activeItemDetail.type === 'found' ? 'Claim This Item' : 'I Found This Item'}
                    </button>
                  )}
                  <button className="btn btn-secondary" onClick={() => setActiveItemDetail(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Claim Modal */}
      {activeClaimItem && (
        <div className="modal-backdrop" onClick={() => setActiveClaimItem(null)}>
          <div className="modal-card modal-small" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setActiveClaimItem(null)}>
              <X size={20} />
            </button>
            <div className="claim-modal-content">
              <div className="claim-icon-wrapper">
                <ShieldCheck size={32} />
              </div>
              <h3>Claim Verification: {activeClaimItem.title}</h3>
              <p className="claim-subtitle">
                To prevent false claims and protect students' property, please answer the owner's verification question.
              </p>

              <div className="security-challenge-card">
                <span className="challenge-label">Security Question / Identifier:</span>
                <p className="challenge-text">{activeClaimItem.securityQuestion}</p>
              </div>

              <form onSubmit={handleClaimSubmit}>
                <div className="form-group">
                  <label>Your Verification Answer / Unique Marks *</label>
                  <textarea 
                    rows={4}
                    placeholder="Provide details only the genuine owner would know (serial no, unique stickers, wallpaper, precise contents)..."
                    value={claimProof}
                    onChange={(e) => setClaimProof(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Your Contact / College Roll Number *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 2024CS0892 or your student email" 
                    required 
                  />
                </div>

                <div className="modal-footer-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setActiveClaimItem(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={claimSuccess}>
                    {claimSuccess ? 'Submitting...' : 'Submit Claim for Review'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Report Item Modal */}
      {isReportModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsReportModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsReportModalOpen(false)}>
              <X size={20} />
            </button>

            <div className="report-modal-header">
              <h2>Report an Item</h2>
              <p>Fill out the details below to broadcast this item to the campus community.</p>

              {/* Type Switcher */}
              <div className="report-type-toggle">
                <button 
                  type="button"
                  className={`type-btn ${reportType === 'lost' ? 'active-lost' : ''}`}
                  onClick={() => setReportType('lost')}
                >
                  <AlertCircle size={16} /> I Lost Something
                </button>
                <button 
                  type="button"
                  className={`type-btn ${reportType === 'found' ? 'active-found' : ''}`}
                  onClick={() => setReportType('found')}
                >
                  <Plus size={16} /> I Found Something
                </button>
              </div>
            </div>

            <form onSubmit={handleCreateReport} className="report-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Item Name / Title *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Casio Scientific Calculator fx-991EX"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {CATEGORIES.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Campus Location *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Central Library 2nd Floor, Desk #4"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Date *</label>
                  <input 
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Approximate Time</label>
                  <input 
                    type="text"
                    placeholder="e.g. 02:30 PM"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Your Name / Roll No</label>
                  <input 
                    type="text"
                    placeholder="e.g. Rahul S. (Roll: 2024EC110)"
                    value={formData.reportedBy}
                    onChange={(e) => setFormData({ ...formData, reportedBy: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Security Question / Proof Requirement</label>
                <input 
                  type="text" 
                  placeholder="e.g. What is written on the inner sticker? Or what color is the pouch?"
                  value={formData.securityQuestion}
                  onChange={(e) => setFormData({ ...formData, securityQuestion: e.target.value })}
                />
                <span className="field-hint">
                  Only the genuine owner should be able to answer this.
                </span>
              </div>

              <div className="form-group">
                <label>Photo URL (Optional)</label>
                <input 
                  type="url" 
                  placeholder="https://example.com/item-photo.jpg"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Detailed Description *</label>
                <textarea 
                  rows={3}
                  placeholder="Describe color, brand, condition, or circumstances where it was lost/found..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="modal-footer-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setIsReportModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Publish {reportType === 'lost' ? 'Lost' : 'Found'} Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="brand-logo">
              <Compass size={20} className="text-primary" />
              <span className="brand-name">Campus<span className="highlight">Find</span></span>
            </div>
            <p>Empowering university communities to return lost belongings with safety and transparency.</p>
          </div>
          <div className="footer-links">
            <div>
              <h4>Campus Zones</h4>
              <ul>
                <li>Library & Study Hub</li>
                <li>Sports & Gym</li>
                <li>Cafeteria & Mess</li>
                <li>Hostel Quad</li>
              </ul>
            </div>
            <div>
              <h4>Safety & Security</h4>
              <ul>
                <li>Verification Rules</li>
                <li>Campus Security Desk</li>
                <li>Privacy Policy</li>
                <li>Report Misuse</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 CampusFind. Built for Student Success.</p>
        </div>
      </footer>
    </div>
  );
}

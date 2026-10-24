import { useState } from 'react';
import { TALENT_PROFILES } from '../utils/constants';
import Icons from '../components/Icons';
import { useAuth } from '../context/AuthContext';

export const HireTalentPage = () => {
  const { openSignUp, showToast } = useAuth();
  const [filterRole, setFilterRole] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTalents = TALENT_PROFILES.filter((t) => {
    const matchSearch =
      !searchTerm ||
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchRole =
      filterRole === 'All' ||
      t.role.toLowerCase().includes(filterRole.toLowerCase());

    return matchSearch && matchRole;
  });

  const handleHireClick = (talentName) => {
    showToast(`Hiring inquiry sent for ${talentName}! An agent will connect you within 15 mins.`, 'success');
  };

  return (
    <div className="hire-talent-page animate-fade-in">
      {/* Hero Banner */}
      <section className="hire-hero-section">
        <div className="section-container">
          <div className="hire-hero-content">
            <span className="section-subtag">PRE-SCREENED &amp; VERIFIED</span>
            <h1 className="section-title">Hire Top 1% Tech &amp; Creative Talent</h1>
            <p className="section-subtitle">
              Scale your team in 48 hours with vetted software engineers, designers, and growth marketers.
            </p>

            <div className="hire-search-bar">
              <Icons.Search size={20} className="hire-search-icon" />
              <input
                type="text"
                placeholder="Search by skill, name or job role (e.g. React, UI/UX, AI)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="hire-search-input"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Talent Filter Pills & Cards Grid */}
      <section className="hire-talents-section">
        <div className="section-container">
          <div className="talent-roles-tabs">
            {['All', 'Developer', 'Designer', 'AI & Machine Learning', 'Marketing'].map((cat) => (
              <button
                key={cat}
                className={`talent-role-pill ${filterRole === cat ? 'active' : ''}`}
                onClick={() => setFilterRole(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="talent-cards-grid">
            {filteredTalents.map((t) => (
              <div key={t.id} className="talent-profile-card">
                <div className="talent-card-header">
                  <div
                    className="talent-initial-badge"
                    style={{
                      backgroundColor: t.bg || '#fff7ed',
                      color: t.color || '#ff5c00',
                      border: `1.5px solid ${t.color || '#ff5c00'}`,
                    }}
                  >
                    {t.initial || t.name.charAt(0)}
                  </div>
                  <div className="talent-identity">
                    <h3 className="talent-name">{t.name}</h3>
                    <p className="talent-role">{t.role}</p>
                    <div className="talent-rating-row">
                      <Icons.Star size={14} />
                      <span className="talent-rating-val">{t.rating}</span>
                      <span className="talent-reviews-text">({t.reviews} verified reviews)</span>
                    </div>
                  </div>
                  <div className="talent-rate-badge">{t.hourlyRate}</div>
                </div>

                <p className="talent-bio">{t.bio}</p>

                <div className="talent-skills-row">
                  {t.skills.map((s) => (
                    <span key={s} className="talent-skill-tag">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="talent-card-footer">
                  <div className="talent-stats-pair">
                    <span className="t-stat-num">{t.completedJobs} Jobs</span>
                    <span className="meta-bullet">•</span>
                    <span className="t-stat-num">{t.earned} Earned</span>
                  </div>
                  <button
                    onClick={() => handleHireClick(t.name)}
                    className="btn-hire-talent"
                  >
                    Hire {t.name.split(' ')[0]}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise / Employer Banner */}
      <section className="hire-enterprise-banner">
        <div className="section-container">
          <div className="enterprise-banner-card">
            <div>
              <h3 className="enterprise-heading">Need to hire multiple engineers or a full squad?</h3>
              <p className="enterprise-sub">
                Our dedicated technical recruiters source, screen, and interview candidates tailored to your tech stack.
              </p>
            </div>
            <button onClick={() => openSignUp('Employer')} className="btn-employer-cta">
              Schedule Hiring Call
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HireTalentPage;

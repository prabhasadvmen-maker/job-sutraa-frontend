import { useState } from 'react';
import { FEATURED_JOBS } from '../utils/constants';
import Icons from '../components/Icons';
import { useAuth } from '../context/AuthContext';

export const JobDetailPage = () => {
  const { selectedJobId, savedJobs, toggleSaveJob, applyToJob, appliedJobs, navigateTo, showToast } = useAuth();
  const [activeTab, setActiveTab] = useState('Overview');

  const job = FEATURED_JOBS.find((j) => j.id === selectedJobId) || FEATURED_JOBS[0];
  const isSaved = savedJobs.includes(job.id);
  const isApplied = appliedJobs.includes(job.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Job link copied to clipboard!', 'success');
    } else {
      showToast('Sharing job link...', 'info');
    }
  };

  const renderCompanyLogo = (j) => {
    switch (j.logoType) {
      case 'google':
        return <Icons.Google size={36} />;
      case 'microsoft':
        return <Icons.Microsoft size={36} />;
      case 'adobe':
        return <Icons.Adobe size={36} />;
      case 'amazon':
        return <Icons.Amazon size={36} />;
      default:
        return (
          <span
            className="company-initial-circle large"
            style={{ backgroundColor: j.badgeBg, color: j.badgeColor }}
          >
            {j.companyInitial}
          </span>
        );
    }
  };

  return (
    <div className="job-detail-page animate-fade-in">
      {/* Breadcrumb Navigation */}
      <div className="section-container breadcrumb-container">
        <nav className="breadcrumb-nav">
          <span className="breadcrumb-link" onClick={() => navigateTo('home')}>Home</span>
          <span className="breadcrumb-sep">&gt;</span>
          <span className="breadcrumb-link" onClick={() => navigateTo('jobs')}>Jobs</span>
          <span className="breadcrumb-sep">&gt;</span>
          <span className="breadcrumb-current">{job.title}</span>
        </nav>
      </div>

      <div className="section-container job-detail-layout">
        {/* Left Column: Job Info & Tabs Content */}
        <div className="job-detail-main">
          {/* Top Job Header Box */}
          <div className="job-detail-header-card">
            <div className="detail-header-top-row">
              <div className="detail-logo-box">
                {renderCompanyLogo(job)}
              </div>
              <div className="detail-title-info">
                <h1 className="detail-job-title">{job.title}</h1>
                <div className="detail-company-sub">
                  <span className="detail-company-name">{job.company}</span>
                  <span className="detail-rating-badge">
                    <Icons.Star size={14} /> {job.rating}
                  </span>
                  <span className="detail-reviews-count">({job.reviews})</span>
                </div>
              </div>
            </div>

            <div className="detail-meta-pills-row">
              <span className="detail-meta-pill">
                <Icons.MapPin size={14} /> {job.location}
              </span>
              <span className="detail-meta-pill">
                <Icons.Briefcase size={14} /> {job.workType}
              </span>
              <span className="detail-meta-pill">
                <Icons.Clock size={14} /> {job.experience}
              </span>
              <span className="detail-salary-badge">
                {job.salary}
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="detail-cta-row">
              <button
                onClick={() => applyToJob(job.id, job.title)}
                className={`btn-detail-apply ${isApplied ? 'applied' : ''}`}
              >
                {isApplied ? 'Applied Successfully ✓' : 'Apply Now'}
              </button>

              <button
                onClick={() => toggleSaveJob(job.id)}
                className={`btn-detail-secondary ${isSaved ? 'saved' : ''}`}
              >
                <Icons.Heart size={16} filled={isSaved} />
                {isSaved ? 'Saved' : 'Save Job'}
              </button>

              <button onClick={handleShare} className="btn-detail-secondary">
                <Icons.Share size={16} />
                Share
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="detail-tabs-bar">
            {['Overview', 'About Company', 'Reviews', 'Similar Jobs'].map((tab) => (
              <button
                key={tab}
                className={`detail-tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="detail-tab-content-card">
            {activeTab === 'Overview' && (
              <>
                <section className="detail-section-block">
                  <h3 className="detail-block-title">Job Description</h3>
                  <p className="detail-body-text">{job.description}</p>
                </section>

                <section className="detail-section-block">
                  <h3 className="detail-block-title">Key Responsibilities</h3>
                  <ul className="detail-bullet-list">
                    {job.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </section>

                <section className="detail-section-block">
                  <h3 className="detail-block-title">Requirements</h3>
                  <ul className="detail-bullet-list">
                    {job.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </section>

                <section className="detail-section-block">
                  <h3 className="detail-block-title">Skills</h3>
                  <div className="detail-skills-tags-grid">
                    {job.skills.map((skill) => (
                      <span key={skill} className="detail-skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              </>
            )}

            {activeTab === 'About Company' && (
              <section className="detail-section-block">
                <h3 className="detail-block-title">About {job.company}</h3>
                <p className="detail-body-text">{job.companyDetails.about}</p>
                <div className="company-stats-row">
                  <div className="c-stat-box">
                    <span className="c-stat-val">{job.companyDetails.employees}</span>
                    <span className="c-stat-lbl">Company Size</span>
                  </div>
                  <div className="c-stat-box">
                    <span className="c-stat-val">{job.companyDetails.industry}</span>
                    <span className="c-stat-lbl">Industry</span>
                  </div>
                  <div className="c-stat-box">
                    <span className="c-stat-val">{job.companyDetails.openJobsCount}+</span>
                    <span className="c-stat-lbl">Open Positions</span>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'Reviews' && (
              <section className="detail-section-block">
                <h3 className="detail-block-title">Employee Reviews & Ratings</h3>
                <div className="reviews-summary-card">
                  <div className="review-rating-big">{job.rating}</div>
                  <div>
                    <div className="review-stars-row">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Icons.Star key={s} size={18} />
                      ))}
                    </div>
                    <p className="reviews-count-sub">Based on {job.reviews} across verified employees</p>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'Similar Jobs' && (
              <section className="detail-section-block">
                <h3 className="detail-block-title">Similar Jobs You Might Like</h3>
                <div className="similar-jobs-list">
                  {FEATURED_JOBS.filter((j) => j.id !== job.id).slice(0, 3).map((simJob) => (
                    <div
                      key={simJob.id}
                      className="similar-job-mini-card"
                      onClick={() => navigateTo('job-detail', simJob.id)}
                    >
                      <div>
                        <h4 className="sim-title">{simJob.title}</h4>
                        <p className="sim-company">{simJob.company} • {simJob.location}</p>
                      </div>
                      <span className="sim-salary">{simJob.salary}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Right Sidebar: Company Info & Job Insights */}
        <aside className="job-detail-sidebar">
          {/* Company Info Box */}
          <div className="sidebar-info-card">
            <h4 className="sidebar-card-heading">Company Info</h4>
            <div className="company-sidebar-header">
              <div className="company-sidebar-logo">
                {renderCompanyLogo(job)}
              </div>
              <div>
                <h5 className="sidebar-company-name">{job.company}</h5>
                <span className="sidebar-company-type">
                  {job.companyDetails.industry} • {job.companyDetails.employees}
                </span>
              </div>
            </div>
            <p className="sidebar-about-preview">{job.companyDetails.about}</p>

            <div className="sidebar-links-list">
              <a href={job.companyDetails.website} target="_blank" rel="noopener noreferrer" className="sidebar-link-item">
                <Icons.Briefcase size={15} /> Website
              </a>
              <a href={job.companyDetails.linkedin} target="_blank" rel="noopener noreferrer" className="sidebar-link-item">
                <Icons.LinkedIn size={15} /> LinkedIn
              </a>
              <span className="sidebar-link-item highlight" onClick={() => navigateTo('jobs')}>
                View all jobs ({job.companyDetails.openJobsCount})
              </span>
            </div>
          </div>

          {/* Office Culture Teaser */}
          <div className="sidebar-info-card culture-highlights-card">
            <h4 className="sidebar-card-heading">Why Work at {job.company}?</h4>
            <div className="culture-perks-list">
              <div className="culture-perk-item">
                <span className="culture-perk-icon">⚡</span>
                <div>
                  <strong>High Growth & Ownership</strong>
                  <p>Work directly on core products with transparent milestones</p>
                </div>
              </div>
              <div className="culture-perk-item">
                <span className="culture-perk-icon">🛡️</span>
                <div>
                  <strong>Health & Wellness</strong>
                  <p>Comprehensive health coverage and annual fitness stipends</p>
                </div>
              </div>
              <div className="culture-perk-item">
                <span className="culture-perk-icon">🎯</span>
                <div>
                  <strong>Learning Allowance</strong>
                  <p>Annual stipend for professional certifications and conferences</p>
                </div>
              </div>
            </div>
          </div>

          {/* Job Insights Card */}
          <div className="sidebar-info-card">
            <h4 className="sidebar-card-heading">Job Insights</h4>
            <div className="insight-match-row">
              <span className="insight-lbl">Skills Match</span>
              <span className="match-val-green">High (95%)</span>
            </div>
            <div className="match-progress-bar">
              <div className="match-progress-fill" style={{ width: '95%' }} />
            </div>

            <div className="insights-metrics-list">
              <div className="insight-item">
                <span className="insight-icon"><Icons.Award size={15} /></span>
                <div>
                  <span className="insight-sub">Job Level</span>
                  <span className="insight-val">{job.jobLevel}</span>
                </div>
              </div>

              <div className="insight-item">
                <span className="insight-icon"><Icons.Briefcase size={15} /></span>
                <div>
                  <span className="insight-sub">Employment Type</span>
                  <span className="insight-val">{job.employmentType}</span>
                </div>
              </div>

              <div className="insight-item">
                <span className="insight-icon"><Icons.MapPin size={15} /></span>
                <div>
                  <span className="insight-sub">Location</span>
                  <span className="insight-val">{job.location}</span>
                </div>
              </div>

              <div className="insight-item">
                <span className="insight-icon"><Icons.Clock size={15} /></span>
                <div>
                  <span className="insight-sub">Posted</span>
                  <span className="insight-val">{job.posted}</span>
                </div>
              </div>

              <div className="insight-item">
                <span className="insight-icon"><Icons.Users size={15} /></span>
                <div>
                  <span className="insight-sub">Applicants</span>
                  <span className="insight-val">{job.applicants}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default JobDetailPage;

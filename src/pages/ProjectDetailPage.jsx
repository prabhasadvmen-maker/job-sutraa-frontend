import { FREELANCE_PROJECTS } from '../utils/constants';
import Icons from '../components/Icons';
import { useAuth } from '../context/AuthContext';

export const ProjectDetailPage = () => {
  const {
    selectedProjectId,
    savedProjects,
    toggleSaveProject,
    applyToProject,
    appliedProjects,
    navigateTo,
    showToast,
  } = useAuth();

  const project =
    FREELANCE_PROJECTS.find((p) => p.id === selectedProjectId) || FREELANCE_PROJECTS[0];

  const isSaved = savedProjects.includes(project.id);
  const isApplied = appliedProjects.includes(project.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Project link copied to clipboard!', 'success');
    } else {
      showToast('Sharing project link...', 'info');
    }
  };

  const handleDownload = (fileName) => {
    showToast(`Downloading attachment: ${fileName}`, 'success');
  };

  return (
    <div className="project-detail-page animate-fade-in">
      {/* Breadcrumb Navigation */}
      <div className="section-container breadcrumb-container">
        <nav className="breadcrumb-nav">
          <span className="breadcrumb-link" onClick={() => navigateTo('home')}>Home</span>
          <span className="breadcrumb-sep">&gt;</span>
          <span className="breadcrumb-link" onClick={() => navigateTo('freelance')}>Freelance Projects</span>
          <span className="breadcrumb-sep">&gt;</span>
          <span className="breadcrumb-current">{project.title}</span>
        </nav>
      </div>

      <div className="section-container project-detail-layout">
        {/* Left Column: Project Overview & Specs */}
        <div className="project-detail-main">
          {/* Header Card */}
          <div className="project-header-card">
            <div className="project-title-row">
              <div
                className="client-initial-badge large"
                style={{
                  backgroundColor: project.clientColor || '#ff5c00',
                  color: '#ffffff',
                }}
              >
                {project.clientInitial || project.clientName.charAt(0)}
              </div>
              <div className="project-title-group">
                <h1 className="project-heading">{project.title}</h1>
                <div className="project-meta-badges-row">
                  <span className="badge-fixed-price">{project.budgetType}</span>
                  <span className="project-price-amount">{project.budget}</span>
                </div>
              </div>
            </div>

            <div className="project-stats-indicators">
              <span className="p-stat-item">
                <Icons.Users size={15} /> {project.proposalsCount} Proposals
              </span>
              <span className="meta-bullet">•</span>
              <span className="p-stat-item">
                <Icons.Clock size={15} /> Posted {project.postedTime}
              </span>
              <span className="meta-bullet">•</span>
              <span className="p-stat-item time-remaining">
                {project.timeLeft}
              </span>
            </div>
          </div>

          {/* Description Section */}
          <div className="project-card-section">
            <h3 className="project-section-title">Project Description</h3>
            <p className="project-desc-body">{project.description}</p>
          </div>

          {/* Skills Required */}
          <div className="project-card-section">
            <h3 className="project-section-title">Skills Required</h3>
            <div className="project-skills-grid">
              {project.skills.map((skill) => (
                <span key={skill} className="project-skill-pill">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Attachments Section */}
          <div className="project-card-section">
            <h3 className="project-section-title">Attachments</h3>
            <div className="attachments-list">
              {project.attachments.map((att, i) => (
                <div key={i} className="attachment-item-card">
                  <div className="att-left">
                    <span className="att-icon-pdf">
                      <Icons.FileText size={20} />
                    </span>
                    <div>
                      <h4 className="att-name">{att.name}</h4>
                      <span className="att-size">{att.size}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownload(att.name)}
                    className="btn-download-att"
                    aria-label={`Download ${att.name}`}
                  >
                    <Icons.Download size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Client Details & Send Proposal */}
        <aside className="project-detail-sidebar">
          {/* Client Details Box */}
          <div className="sidebar-client-card">
            <h4 className="sidebar-card-heading">Client Details</h4>
            <div className="client-profile-header">
              <div
                className="client-initial-badge"
                style={{
                  backgroundColor: project.clientColor || '#ff5c00',
                  color: '#ffffff',
                }}
              >
                {project.clientInitial || project.clientName?.charAt(0)}
              </div>
              <div>
                <h5 className="client-profile-name">{project.clientName}</h5>
                <span className="client-profile-rating">
                  <Icons.Star size={14} /> {project.clientRating} ({project.clientReviews} reviews)
                </span>
                <span className="client-profile-meta">
                  Member since {project.clientMemberSince} • <Icons.MapPin size={12} /> {project.clientCountry}
                </span>
              </div>
            </div>
          </div>

          {/* Actions Buttons */}
          <div className="sidebar-cta-group">
            <button
              onClick={() => applyToProject(project.id, project.title)}
              className={`btn-send-proposal ${isApplied ? 'applied' : ''}`}
            >
              {isApplied ? 'Proposal Sent ✓' : 'Send Proposal'}
            </button>

            <button
              onClick={() => toggleSaveProject(project.id)}
              className={`btn-sidebar-secondary ${isSaved ? 'saved' : ''}`}
            >
              <Icons.Heart size={16} filled={isSaved} />
              {isSaved ? 'Project Saved' : 'Save Project'}
            </button>

            <button onClick={handleShare} className="btn-sidebar-secondary">
              <Icons.Share size={16} />
              Share Project
            </button>
          </div>

          {/* Similar Projects */}
          <div className="sidebar-client-card">
            <div className="similar-card-head">
              <h4 className="sidebar-card-heading">Similar Projects</h4>
              <span
                className="similar-view-all"
                onClick={() => navigateTo('freelance')}
              >
                View all
              </span>
            </div>
            <div className="similar-projects-mini-list">
              {project.similarProjects.map((sim) => (
                <div
                  key={sim.id}
                  className="similar-proj-item"
                  onClick={() => navigateTo('project-detail', sim.id)}
                >
                  <div className="sim-icon-box">
                    <Icons.Laptop size={16} />
                  </div>
                  <div>
                    <h5 className="sim-proj-title">{sim.title}</h5>
                    <span className="sim-proj-budget">{sim.budget}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProjectDetailPage;

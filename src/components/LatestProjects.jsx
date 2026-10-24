import { FREELANCE_PROJECTS } from '../utils/constants';
import Icons from './Icons';
import { useAuth } from '../context/AuthContext';

export const LatestProjects = () => {
  const { appliedJobs, applyToJob, savedJobs, toggleSaveJob, showToast, navigateTo } = useAuth();

  return (
    <section id="freelance-projects" className="projects-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-row reveal-top">
          <div>
            <span className="section-subtag">FREELANCE PROJECTS</span>
            <h2 className="section-title">Latest Projects</h2>
            <p className="section-subtitle">
              Work on real projects, build your portfolio and earn.
            </p>
          </div>
          <a
            href="#freelance"
            className="section-header-link"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('freelance');
            }}
          >
            View all projects <Icons.ArrowRight size={16} />
          </a>
        </div>

        {/* 5 Project Cards Responsive Grid */}
        <div className="projects-grid">
          {FREELANCE_PROJECTS.map((proj, idx) => {
            const isApplied = appliedJobs.includes(proj.id);
            const isSaved = savedJobs.includes(proj.id);
            const directions = ['reveal-left', 'reveal-bottom', 'reveal-right'];
            const animDir = directions[idx % 3];

            return (
              <div key={proj.id} className={`project-card ${animDir} delay-${(idx % 3) + 1}`}>
                {/* Header: Company Initial Badge + Bookmark */}
                <div className="project-card-header">
                  <div
                    className="company-initial-badge"
                    style={{
                      backgroundColor: proj.badgeBg,
                      color: proj.badgeColor,
                    }}
                  >
                    {proj.companyInitial}
                  </div>
                  <button
                    className={`btn-save-job ${isSaved ? 'saved' : ''}`}
                    onClick={() => toggleSaveJob(proj.id)}
                    aria-label="Save Project"
                  >
                    <Icons.Heart size={18} filled={isSaved} />
                  </button>
                </div>

                {/* Title & Company */}
                <h3
                  className="project-title"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigateTo('project-detail', proj.id)}
                >
                  {proj.title}
                </h3>
                <p className="project-company">{proj.company}</p>

                {/* Budget & Duration */}
                <div className="project-budget-row">
                  <div className="project-meta-item">
                    <span className="meta-icon-dot">₹</span>
                    <span className="meta-bold-val">{proj.budget}</span>
                  </div>
                  <div className="project-meta-item duration-item">
                    <Icons.Clock size={13} />
                    <span>{proj.duration}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="job-tags-row">
                  {(proj.tags || proj.skills || []).map((tag, i) => (
                    <span key={i} className="job-tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Apply Button */}
                <button
                  className={`btn-job-apply ${isApplied ? 'applied' : ''}`}
                  onClick={() => applyToJob(proj.id, proj.title)}
                >
                  {isApplied ? (
                    <>
                      Applied <Icons.Check size={16} />
                    </>
                  ) : (
                    <>
                      Apply <Icons.ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LatestProjects;

import { useState } from 'react';
import { FREELANCE_PROJECTS, FREELANCE_MARKETPLACE_CATEGORIES } from '../utils/constants';
import Icons from '../components/Icons';
import { useAuth } from '../context/AuthContext';

export const FreelanceMarketplacePage = () => {
  const { navigateTo, openSignUp, showToast } = useAuth();
  const [searchService, setSearchService] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = FREELANCE_PROJECTS.filter((p) => {
    const q = searchService.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.skills.some((s) => s.toLowerCase().includes(q));

    const matchesCat =
      activeCategory === 'All' ||
      p.skills.some((s) => s.toLowerCase().includes(activeCategory.toLowerCase()));

    return matchesSearch && matchesCat;
  });

  const renderCatIcon = (icon) => {
    switch (icon) {
      case 'laptop':
        return <Icons.Laptop size={20} />;
      case 'smartphone':
        return <Icons.Smartphone size={20} />;
      case 'palette':
        return <Icons.Palette size={20} />;
      case 'fileText':
        return <Icons.FileText size={20} />;
      case 'megaphone':
        return <Icons.Megaphone size={20} />;
      case 'cpu':
        return <Icons.Cpu size={20} />;
      default:
        return <Icons.Briefcase size={20} />;
    }
  };

  return (
    <div className="freelance-marketplace-page animate-fade-in">
      {/* Top Search Hero */}
      <section className="marketplace-hero-section">
        <div className="section-container">
          <div className="marketplace-search-box">
            <Icons.Search size={20} className="search-icon-left" />
            <input
              type="text"
              placeholder="What service do you need?"
              value={searchService}
              onChange={(e) => setSearchService(e.target.value)}
              className="marketplace-search-input"
            />
            <button
              onClick={() => showToast(`Searching for "${searchService || 'all gigs'}"`, 'info')}
              className="btn-marketplace-search"
            >
              Search
            </button>
          </div>

          {/* Category Icons Row */}
          <div className="marketplace-categories-row">
            <button
              className={`cat-pill-btn ${activeCategory === 'All' ? 'active' : ''}`}
              onClick={() => setActiveCategory('All')}
            >
              <Icons.Briefcase size={18} />
              <span>All Services</span>
            </button>
            {FREELANCE_MARKETPLACE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`cat-pill-btn ${activeCategory === cat.title ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.title)}
              >
                {renderCatIcon(cat.icon)}
                <span>{cat.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Grid Section */}
      <section className="marketplace-projects-section">
        <div className="section-container">
          <div className="section-header-row">
            <div>
              <h2 className="section-title">Featured Projects</h2>
              <p className="section-subtitle">
                Explore verified client gigs, send proposals, and get hired on your terms.
              </p>
            </div>
            <a
              href="#projects"
              className="section-header-link"
              onClick={(e) => {
                e.preventDefault();
                showToast('Showing all open freelance gigs', 'info');
              }}
            >
              View all <Icons.ArrowRight size={16} />
            </a>
          </div>

          <div className="marketplace-projects-grid">
            {filteredProjects.map((proj) => (
              <div key={proj.id} className="marketplace-project-card">
                {/* Visual Header / Thumbnail banner */}
                <div className="project-card-visual">
                  <div className="project-thumbnail-container">
                    <div
                      className="client-initial-badge"
                      style={{
                        backgroundColor: proj.clientBg || '#fff7ed',
                        color: proj.clientColor || '#ff5c00',
                      }}
                    >
                      {proj.clientInitial || proj.clientName.charAt(0)}
                    </div>
                    <div className="proj-client-details">
                      <h4 className="proj-client-name">{proj.clientName}</h4>
                      <span className="proj-client-geo">
                        <Icons.MapPin size={12} /> {proj.clientCountry} • ★ {proj.clientRating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="project-card-body">
                  <h3
                    className="marketplace-proj-title"
                    onClick={() => navigateTo('project-detail', proj.id)}
                  >
                    {proj.title}
                  </h3>

                  <div className="proj-budget-line">
                    <span className="budget-type-tag">{proj.budgetType}</span>
                    <span className="budget-amount-bold">{proj.budget}</span>
                  </div>

                  <p className="proj-summary-text">{proj.description}</p>

                  <div className="proj-meta-indicators">
                    <span>Posted {proj.postedTime}</span>
                    <span>•</span>
                    <span className="proposals-count-text">{proj.proposalsCount} Proposals</span>
                    <span>•</span>
                    <span className="time-left-tag">{proj.timeLeft}</span>
                  </div>

                  <div className="proj-skills-tags-row">
                    {proj.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="proj-skill-badge">
                        {skill}
                      </span>
                    ))}
                    {proj.skills.length > 3 && (
                      <span className="proj-skill-badge more">+{proj.skills.length - 3}</span>
                    )}
                  </div>

                  <button
                    onClick={() => navigateTo('project-detail', proj.id)}
                    className="btn-view-project"
                  >
                    View Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="marketplace-cta-section">
        <div className="section-container">
          <div className="custom-project-banner">
            <div>
              <h3 className="custom-project-title">Need a custom project?</h3>
              <p className="custom-project-desc">
                Post your project and get proposals from top rated, pre-vetted freelancers in minutes.
              </p>
            </div>
            <button
              onClick={() => openSignUp('Employer')}
              className="btn-post-project"
            >
              Post a Project
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FreelanceMarketplacePage;

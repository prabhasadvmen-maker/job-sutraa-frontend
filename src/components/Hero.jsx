import { QUICK_LINKS } from '../utils/constants';
import Icons from './Icons';
import { useAuth } from '../context/AuthContext';
import heroWomanImg from '../assets/hero-woman.png';

export const Hero = () => {
  const {
    searchQuery,
    setSearchQuery,
    locationQuery,
    setLocationQuery,
    activeQuickLink,
    setActiveQuickLink,
    showToast,
    navigateTo,
  } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    navigateTo('jobs');
    showToast(`Showing search results for "${searchQuery || 'All'}" in "${locationQuery || 'Anywhere'}"`, 'info');
  };

  const handleQuickLinkClick = (tag) => {
    setActiveQuickLink(tag === activeQuickLink ? '' : tag);
    if (tag === 'Freelance Projects') {
      navigateTo('freelance');
    } else {
      setSearchQuery(tag);
      navigateTo('jobs');
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Left Column: Text & Search Form */}
        <div className="hero-content reveal-left">
          {/* Badge */}
          <div className="hero-badge">
            <span className="hero-badge-dot">●</span>
            <span>JOBS + FREELANCE PROJECTS + CAREER GROWTH</span>
          </div>

          {/* Heading */}
          <h1 className="hero-title">
            Find Your Next Job.{' '}
            <span className="hero-title-highlight">Build Your Future.</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-description">
            Discover exciting job opportunities, freelance projects and grow your career — all on one platform. Get hired, work on meaningful projects, and achieve your goals.
          </p>

          {/* Search Box */}
          <form className="hero-search-box" onSubmit={handleSearch}>
            <div className="search-field">
              <span className="search-field-icon">
                <Icons.Search size={20} />
              </span>
              <input
                id="hero-search-input"
                type="text"
                placeholder="Job title, skill or company"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="search-divider" />

            <div className="search-field">
              <span className="search-field-icon">
                <Icons.MapPin size={20} />
              </span>
              <input
                type="text"
                placeholder="Location: City or remote"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                className="search-input"
              />
            </div>

            <button type="submit" className="search-btn">
              Search
            </button>
          </form>

          {/* Quick Links */}
          <div className="quick-links-row">
            <span className="quick-links-label">Quick Links:</span>
            <div className="quick-links-list">
              {QUICK_LINKS.map((link) => (
                <button
                  key={link}
                  type="button"
                  className={`quick-link-pill ${activeQuickLink === link ? 'active' : ''}`}
                  onClick={() => handleQuickLinkClick(link)}
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Visuals with Sun Aura & Floating Cards */}
        <div className="hero-visual reveal-right">
          <div className="hero-sun-backdrop" />

          {/* Decorative Sparkles */}
          <div className="sparkle-star sparkle-top-right">✦</div>
          <div className="sparkle-star sparkle-left">✦</div>
          <div className="sparkle-dot sparkle-bottom-left" />

          {/* Handwritten Annotation */}
          <div className="handwritten-doodle">
            <span className="handwritten-text">Your Goals<br />Our Priority</span>
            <svg className="doodle-arrow" width="55" height="40" viewBox="0 0 55 40" fill="none">
              <path d="M5 5 C 20 2, 45 10, 48 30" stroke="#ff5c00" strokeWidth="2" strokeDasharray="3 3" fill="none" />
              <path d="M43 25 L 48 31 L 52 23" stroke="#ff5c00" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          </div>

          {/* Hero Portrait Photo */}
          <div className="hero-image-wrapper">
            <img
              src={heroWomanImg}
              alt="JobSutraa Professional"
              className="hero-image"
            />
          </div>

          {/* Floating Feature Card 1: Find Jobs */}
          <div className="floating-card floating-card-1 reveal-top delay-2">
            <div className="floating-icon-box orange-box">
              <Icons.Briefcase size={20} />
            </div>
            <div className="floating-info">
              <h4 className="floating-title">Find Jobs</h4>
              <p className="floating-sub">Great opportunities for your career</p>
            </div>
          </div>

          {/* Floating Feature Card 2: Freelance Projects */}
          <div className="floating-card floating-card-2 reveal-right delay-3">
            <div className="floating-icon-box orange-box">
              <Icons.Laptop size={20} />
            </div>
            <div className="floating-info">
              <h4 className="floating-title">Freelance Projects</h4>
              <p className="floating-sub">Work on exciting projects</p>
            </div>
          </div>

          {/* Floating Feature Card 3: Hire Talent */}
          <div className="floating-card floating-card-3 reveal-bottom delay-4">
            <div className="floating-icon-box orange-box">
              <Icons.Users size={20} />
            </div>
            <div className="floating-info">
              <h4 className="floating-title">Hire Talent</h4>
              <p className="floating-sub">Find the right people for your team</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

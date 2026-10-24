import { useState } from 'react';
import { NAV_LINKS } from '../utils/constants';
import Icons from './Icons';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { openLogin, openSignUp, user, logout, currentPage, navigateTo } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLinkActive = (path) => {
    if (path === 'jobs' && (currentPage === 'jobs' || currentPage === 'job-detail')) return true;
    if (path === 'freelance' && (currentPage === 'freelance' || currentPage === 'project-detail')) return true;
    return currentPage === path;
  };

  return (
    <header className="navbar-wrapper">
      <div className="navbar-container">
        {/* Brand Logo */}
        <a
          href="#"
          className="navbar-brand"
          onClick={(e) => {
            e.preventDefault();
            navigateTo('home');
          }}
        >
          <img src="/logo.png" alt="JobSutraa Logo" className="navbar-logo-img" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="navbar-nav">
          {NAV_LINKS.map((link) => {
            const active = isLinkActive(link.path);
            return (
              <a
                key={link.name}
                href={`#${link.path}`}
                className={`nav-link ${active ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo(link.path);
                }}
              >
                {link.name}
                {active && <span className="active-dot-indicator" />}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="navbar-actions">
          <button
            className="nav-icon-btn"
            aria-label="Search"
            onClick={() => {
              navigateTo('jobs');
            }}
          >
            <Icons.Search size={19} />
          </button>

          {user ? (
            <div className="user-profile-badge">
              <span className="user-avatar-initial">
                {user.initial || user.name?.charAt(0).toUpperCase()}
              </span>
              <span className="user-name">{user.name}</span>
              <button onClick={logout} className="btn-logout" title="Sign Out">
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons-group">
              <button onClick={() => openLogin('Job Seeker')} className="btn-login">
                Login
              </button>
              <button onClick={() => openSignUp('Job Seeker')} className="btn-signup">
                Sign Up
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <Icons.X size={24} /> : <Icons.Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <nav className="mobile-nav-links">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={`#${link.path}`}
                className={`mobile-nav-link ${isLinkActive(link.path) ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo(link.path);
                  setMobileMenuOpen(false);
                }}
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="mobile-auth-actions">
            {user ? (
              <div className="mobile-user-row">
                <span>Signed in as <strong>{user.name}</strong></span>
                <button onClick={logout} className="btn-logout-mobile">
                  Logout
                </button>
              </div>
            ) : (
              <div className="mobile-btn-group">
                <button
                  onClick={() => {
                    openLogin('Job Seeker');
                    setMobileMenuOpen(false);
                  }}
                  className="btn-login-mobile"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    openSignUp('Job Seeker');
                    setMobileMenuOpen(false);
                  }}
                  className="btn-signup-mobile"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

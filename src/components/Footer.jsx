import { FOOTER_LINKS } from '../utils/constants';
import Icons from './Icons';
import footerLogoImg from '../assets/footer-logo.png';
import { useAuth } from '../context/AuthContext';

export const Footer = () => {
  const { showToast, navigateTo } = useAuth();

  const handleLinkClick = (e, name) => {
    e.preventDefault();
    const lower = name.toLowerCase();
    if (lower.includes('job') || lower.includes('work') || lower.includes('alert')) {
      navigateTo('jobs');
    } else if (lower.includes('project') || lower.includes('freelance') || lower.includes('gig')) {
      navigateTo('freelance');
    } else if (lower.includes('talent') || lower.includes('hire') || lower.includes('post a job')) {
      navigateTo('hire-talent');
    } else if (lower.includes('about')) {
      navigateTo('about');
    } else if (lower.includes('contact') || lower.includes('support')) {
      navigateTo('contact');
    } else if (lower.includes('career') || lower.includes('advice') || lower.includes('salary')) {
      navigateTo('career-hub');
    } else {
      showToast(`Navigating to ${name}`, 'info');
    }
  };

  return (
    <footer id="footer" className="footer-section">
      <div className="section-container">
        {/* Main Footer Row */}
        <div className="footer-main-grid">
          {/* Brand Info with Circular Badge Logo */}
          <div className="footer-brand-col">
            <div className="footer-logo-wrap">
              <img
                src="/footer-logo.png"
                alt="JobSutraa"
                className="footer-circle-logo"
              />
            </div>
            <p className="footer-tagline">
              Your Career. Our Guidance.
              <br />
              <span className="footer-subtagline">Helping you discover what&apos;s next.</span>
            </p>

            {/* Phone Contact Badge */}
            <a href="tel:+918375008009" className="footer-phone-badge">
              <span className="footer-phone-icon">
                <Icons.Phone size={15} />
              </span>
              <span className="footer-phone-text">
                <span className="footer-phone-prefix">Phone:</span> +91 83750 08009
              </span>
            </a>

            {/* Registered Office Address */}
            <div className="footer-address-badge">
              <span className="footer-address-icon">
                <Icons.MapPin size={16} />
              </span>
              <div className="footer-address-text">
                <span className="footer-address-title">Registered Office:</span>
                <p>T-4B-506, NX One Plot no.17, Techzone-4</p>
                <p>Greater Noida West, GAUTAM BUDDHA NAGAR, Pin 201308</p>
              </div>
            </div>
          </div>

          {/* Column 1: For Job Seekers */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">{FOOTER_LINKS.jobSeekers.title}</h4>
            <ul className="footer-links-list">
              {FOOTER_LINKS.jobSeekers.links.map((link) => (
                <li key={link}>
                  <a
                    href="#featured-jobs"
                    className="footer-link"
                    onClick={(e) => handleLinkClick(e, link)}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: For Freelancers */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">{FOOTER_LINKS.freelancers.title}</h4>
            <ul className="footer-links-list">
              {FOOTER_LINKS.freelancers.links.map((link) => (
                <li key={link}>
                  <a
                    href="#freelance-projects"
                    className="footer-link"
                    onClick={(e) => handleLinkClick(e, link)}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: For Employers */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">{FOOTER_LINKS.employers.title}</h4>
            <ul className="footer-links-list">
              {FOOTER_LINKS.employers.links.map((link) => (
                <li key={link}>
                  <a
                    href="#categories"
                    className="footer-link"
                    onClick={(e) => handleLinkClick(e, link)}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Explore */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">{FOOTER_LINKS.explore.title}</h4>
            <ul className="footer-links-list">
              {FOOTER_LINKS.explore.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="footer-link"
                    onClick={(e) => handleLinkClick(e, link)}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Vertical Divider Line */}
          <div className="footer-vertical-divider" />

          {/* Column 5: Stay Connected */}
          <div className="footer-social-col">
            <h4 className="footer-col-title">Stay Connected</h4>
            <p className="footer-social-sub">
              Keep moving towards your next opportunity.
            </p>
            <div className="footer-social-icons">
              <a
                href="#"
                className="social-icon-btn"
                aria-label="Facebook"
                onClick={(e) => handleLinkClick(e, 'Facebook')}
              >
                <Icons.Facebook size={16} />
              </a>
              <a
                href="#"
                className="social-icon-btn"
                aria-label="LinkedIn"
                onClick={(e) => handleLinkClick(e, 'LinkedIn')}
              >
                <Icons.LinkedIn size={16} />
              </a>
              <a
                href="https://www.instagram.com/jobsutraa?obrf=MXJtemRmMDhsYWszdA%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="Instagram"
              >
                <Icons.Instagram size={16} />
              </a>
              <a
                href="#"
                className="social-icon-btn"
                aria-label="Discord"
                onClick={(e) => handleLinkClick(e, 'Discord')}
              >
                <Icons.Discord size={16} />
              </a>
              <a
                href="#"
                className="social-icon-btn"
                aria-label="Twitter X"
                onClick={(e) => handleLinkClick(e, 'Twitter')}
              >
                <Icons.TwitterX size={16} />
              </a>
            </div>

            {/* Quick Call Row under Social */}
            <div className="footer-phone-secondary">
              <span className="footer-phone-secondary-label">Direct Support:</span>
              <a href="tel:+918375008009" className="footer-phone-secondary-link">
                +91 83750 08009
              </a>
            </div>
          </div>
        </div>

        {/* Sub-footer Copyright */}
        <div className="footer-bottom-row">
          <p className="copyright-text">
            © 2025 JobSutraa. All rights reserved.
          </p>
          <p className="built-with-text">
            Built for your next big opportunity <span className="heart-icon">❤️</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

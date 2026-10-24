import Icons from './Icons';

export const TrustBanner = () => {
  return (
    <section className="trust-banner-section">
      <div className="section-container">
        <div className="trust-banner-container reveal-bottom">
          {/* Handwritten Annotation on Left */}
          <div className="trust-handwritten-note reveal-left delay-1">
            <span className="handwritten-title">
              Join a platform<br />built for your success!
            </span>
            <svg className="trust-doodle-arrow" width="45" height="25" viewBox="0 0 45 25" fill="none">
              <path d="M2 15 C 15 22, 30 18, 38 6" stroke="#ff5c00" strokeWidth="2" strokeDasharray="3 3" fill="none" />
              <path d="M30 6 L 39 5 L 39 15" stroke="#ff5c00" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          </div>

          {/* Trusted Headline */}
          <div className="trust-center-info reveal-bottom delay-2">
            <h4 className="trust-headline">
              Trusted by <span className="trust-number-highlight">50,000+</span>
            </h4>
            <p className="trust-subtext">Job seekers, freelancers and employers</p>
          </div>

          {/* 3 Trust Badges */}
          <div className="trust-badges-grid reveal-right delay-3">
            <div className="trust-badge-item">
              <div className="trust-badge-icon-box">
                <Icons.Briefcase size={18} />
              </div>
              <div className="trust-badge-text">
                <h5 className="trust-badge-title">Verified Employers</h5>
                <p className="trust-badge-sub">for safe hiring</p>
              </div>
            </div>

            <div className="trust-badge-item">
              <div className="trust-badge-icon-box">
                <Icons.Shield size={18} />
              </div>
              <div className="trust-badge-text">
                <h5 className="trust-badge-title">Secure Payments</h5>
                <p className="trust-badge-sub">for freelance projects</p>
              </div>
            </div>

            <div className="trust-badge-item">
              <div className="trust-badge-icon-box">
                <Icons.Award size={18} />
              </div>
              <div className="trust-badge-text">
                <h5 className="trust-badge-title">Career Guidance</h5>
                <p className="trust-badge-sub">for long-term growth</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBanner;

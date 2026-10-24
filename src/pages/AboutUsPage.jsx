import Icons from '../components/Icons';
import { useAuth } from '../context/AuthContext';

export const AboutUsPage = () => {
  const { navigateTo, openSignUp } = useAuth();

  const values = [
    {
      title: 'Candidate First',
      desc: 'We guarantee 100% verified job postings with transparent salary disclosures, zero spam, and authentic hiring leads.',
      icon: 'users',
      color: '#ff5c00',
      bg: '#fff7ed',
    },
    {
      title: 'Fast-Track Hiring',
      desc: 'AI-assisted skill matching cuts recruitment time by 60%, connecting employers directly with pre-screened talent.',
      icon: 'briefcase',
      color: '#0284c7',
      bg: '#f0f9ff',
    },
    {
      title: 'Equal Opportunity',
      desc: 'Democratizing career opportunities across Tier 1, 2, and 3 cities in India with tailored regional & remote roles.',
      icon: 'building',
      color: '#10b981',
      bg: '#ecfdf5',
    },
    {
      title: 'Secure Escrow Freelancing',
      desc: 'Milestone-based project payments protect both clients and freelancers, ensuring prompt payouts upon deliverables.',
      icon: 'fileText',
      color: '#8b5cf6',
      bg: '#f5f3ff',
    },
  ];

  const milestones = [
    { year: '2023', title: 'Platform Inception', desc: 'JobSutraa launched with 500 initial tech openings in Bengaluru & Delhi NCR.' },
    { year: '2024', title: 'Freelance Marketplace', desc: 'Introduced milestone contracts, cross-border payments, and verified portfolio badges.' },
    { year: '2025', title: 'Pan-India Expansion', desc: 'Crossed 35,000+ active candidates and onboarded 1,500+ top employers.' },
    { year: '2026', title: 'AI Matching & Skill Badges', desc: 'Instant skill matching, automated candidate scoring, and 50K+ vibrant users.' },
  ];

  const team = [
    {
      name: 'Aditya Srivastava',
      role: 'Founder & CEO',
      initials: 'AS',
      color: '#ff5c00',
      bg: '#fff7ed',
      bio: 'Ex-Tech Lead passionate about creating equitable job opportunities across emerging tech corridors.',
    },
    {
      name: 'Pooja Kashyap',
      role: 'Head of Product & Growth',
      initials: 'PK',
      color: '#0284c7',
      bg: '#f0f9ff',
      bio: 'Former HR tech strategist dedicated to building delightful, intuitive recruitment workflows.',
    },
    {
      name: 'Rohan Mehra',
      role: 'VP of Engineering',
      initials: 'RM',
      color: '#10b981',
      bg: '#ecfdf5',
      bio: 'Architecting high-scale recommendation engines and secure freelance escrow infrastructure.',
    },
  ];

  return (
    <div className="about-page-wrapper">
      {/* Hero Section */}
      <section className="about-hero-section reveal-on-scroll">
        <div className="about-hero-container">
          <span className="section-subtag">ABOUT JOBSUTRAA</span>
          <h1 className="about-hero-title">
            Empowering India's Next Generation of <span className="highlight-orange">Talent & Builders</span>
          </h1>
          <p className="about-hero-desc">
            JobSutraa is India’s modern unified platform bridging ambitious job seekers, elite freelance professionals, and visionary companies in one seamless, transparent ecosystem.
          </p>

          <div className="about-hero-stats-row">
            <div className="about-stat-box">
              <span className="stat-number">50K+</span>
              <span className="stat-caption">Registered Talent</span>
            </div>
            <div className="about-stat-divider" />
            <div className="about-stat-box">
              <span className="stat-number">10K+</span>
              <span className="stat-caption">Active Jobs & Gigs</span>
            </div>
            <div className="about-stat-divider" />
            <div className="about-stat-box">
              <span className="stat-number">2,000+</span>
              <span className="stat-caption">Verified Companies</span>
            </div>
            <div className="about-stat-divider" />
            <div className="about-stat-box">
              <span className="stat-number">98%</span>
              <span className="stat-caption">Hiring Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Grid */}
      <section className="about-mission-section reveal-on-scroll">
        <div className="about-content-container">
          <div className="mission-vision-grid">
            <div className="mission-card">
              <div className="card-badge-pill">OUR MISSION</div>
              <h2 className="mission-card-title">Democratizing Career Growth</h2>
              <p className="mission-card-text">
                To eliminate hiring friction and geographical bias by connecting every skilled professional with high-impact, fairly compensated career opportunities and freelance projects.
              </p>
            </div>
            <div className="vision-card">
              <div className="card-badge-pill light">OUR VISION</div>
              <h2 className="mission-card-title">Bharat's Most Trusted Career Hub</h2>
              <p className="mission-card-text">
                To become the definitive ecosystem where job seekers get certified, discover dream roles, build portfolios, and collaborate with top global enterprises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="about-values-section reveal-on-scroll">
        <div className="about-content-container">
          <div className="section-header-center">
            <span className="section-subtag">WHAT DRIVES US</span>
            <h2 className="section-title">Our Core Principles</h2>
            <p className="section-subtitle">The standards that guide every decision and product we build.</p>
          </div>

          <div className="values-grid">
            {values.map((val) => (
              <div key={val.title} className="value-card">
                <div className="value-icon-circle" style={{ backgroundColor: val.bg, color: val.color }}>
                  {val.icon === 'users' && <Icons.Users size={24} />}
                  {val.icon === 'briefcase' && <Icons.Briefcase size={24} />}
                  {val.icon === 'building' && <Icons.Building size={24} />}
                  {val.icon === 'fileText' && <Icons.FileText size={24} />}
                </div>
                <h3 className="value-card-title">{val.title}</h3>
                <p className="value-card-desc">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones / Journey */}
      <section className="about-timeline-section reveal-on-scroll">
        <div className="about-content-container">
          <div className="section-header-center">
            <span className="section-subtag">OUR JOURNEY</span>
            <h2 className="section-title">How We Got Here</h2>
            <p className="section-subtitle">From a tiny community to a fast-growing hiring network.</p>
          </div>

          <div className="milestones-timeline">
            {milestones.map((m, index) => (
              <div key={m.year} className="milestone-item">
                <div className="milestone-badge">{m.year}</div>
                <div className="milestone-content">
                  <h4 className="milestone-title">{m.title}</h4>
                  <p className="milestone-desc">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="about-team-section reveal-on-scroll">
        <div className="about-content-container">
          <div className="section-header-center">
            <span className="section-subtag">LEADERSHIP</span>
            <h2 className="section-title">Meet The Minds Behind JobSutraa</h2>
            <p className="section-subtitle">Experienced industry veterans and builders leading the mission.</p>
          </div>

          <div className="team-grid">
            {team.map((member) => (
              <div key={member.name} className="team-card">
                <div
                  className="team-avatar-wrapper initials"
                  style={{
                    backgroundColor: member.bg,
                    color: member.color,
                    border: `2.5px solid ${member.color}`,
                  }}
                >
                  <span className="team-initials-text">{member.initials}</span>
                </div>
                <h3 className="team-name">{member.name}</h3>
                <span className="team-role">{member.role}</span>
                <p className="team-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="about-cta-section reveal-on-scroll">
        <div className="about-cta-box">
          <h2>Ready to Take the Next Step in Your Career?</h2>
          <p>Join over 50,000+ talented professionals finding full-time roles and lucrative freelance projects.</p>
          <div className="about-cta-buttons">
            <button onClick={() => navigateTo('jobs')} className="btn-about-primary">
              Browse Open Jobs <Icons.ArrowRight size={16} />
            </button>
            <button onClick={() => openSignUp('Employer')} className="btn-about-secondary">
              Hire Top Talent
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;

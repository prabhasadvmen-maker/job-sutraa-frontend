import { STATS } from '../utils/constants';
import Icons from './Icons';
import { useAuth } from '../context/AuthContext';

export const StatsSection = () => {
  const { openSignUp } = useAuth();

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'briefcase':
        return <Icons.Briefcase size={22} />;
      case 'building':
        return <Icons.Building size={22} />;
      case 'users':
        return <Icons.Users size={22} />;
      default:
        return <Icons.Briefcase size={22} />;
    }
  };

  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stats-grid">
          {STATS.map((stat, idx) => (
            <div key={idx} className={`stat-card reveal-bottom delay-${idx + 1}`}>
              <div
                className="stat-icon-wrapper"
                style={{ backgroundColor: stat.bg, color: stat.color }}
              >
                {renderIcon(stat.icon)}
              </div>
              <div className="stat-details">
                <h3 className="stat-number">{stat.count}</h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            </div>
          ))}

          {/* Join CTA Callout */}
          <div className="stat-cta-box reveal-right delay-4">
            <p className="stat-cta-text">
              Join thousands of job seekers, freelancers and employers on{' '}
              <strong className="text-dark">JobSutraa.</strong>
            </p>
            <button onClick={openSignUp} className="btn-get-started">
              Get Started <Icons.ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

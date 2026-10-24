import { WHY_CHOOSE_ITEMS } from '../utils/constants';
import Icons from './Icons';

export const WhyChooseUs = () => {
  const renderItemIcon = (icon) => {
    switch (icon) {
      case 'shield':
        return <Icons.Shield size={18} />;
      case 'lock':
        return <Icons.Lock size={18} />;
      case 'lightning':
        return <Icons.Lightning size={18} />;
      case 'support':
        return <Icons.Support size={18} />;
      default:
        return <Icons.Check size={18} />;
    }
  };

  return (
    <section id="why-choose" className="why-choose-section">
      <div className="section-container">
        <div className="why-choose-banner">
          {/* Ambient Glow */}
          <div className="why-choose-glow" />

          {/* Left Text */}
          <div className="why-choose-left reveal-left">
            <h2 className="why-choose-title">
              Why Choose <span className="highlight-orange">JobSutraa?</span>
            </h2>
            <p className="why-choose-desc">
              More than just a job portal — it&apos;s your complete career and gig economy platform.
            </p>
          </div>

          {/* Right Features Grid */}
          <div className="why-choose-grid reveal-right">
            {WHY_CHOOSE_ITEMS.map((item) => (
              <div key={item.id} className="why-choose-card">
                <div className="why-choose-badge-wrap">
                  <span className="why-choose-number-badge">{item.number}</span>
                  <div className="why-choose-icon-badge">
                    {renderItemIcon(item.icon)}
                  </div>
                </div>
                <div className="why-choose-text-group">
                  <h3 className="why-choose-item-title">{item.title}</h3>
                  <p className="why-choose-item-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

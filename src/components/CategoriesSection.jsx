import { CATEGORIES } from '../utils/constants';
import Icons from './Icons';
import { useAuth } from '../context/AuthContext';

export const CategoriesSection = () => {
  const { setSelectedCategory, setSearchQuery, showToast, navigateTo } = useAuth();

  const renderCategoryIcon = (icon) => {
    switch (icon) {
      case 'laptop':
        return <Icons.Laptop size={24} />;
      case 'barChart':
        return <Icons.BarChart size={24} />;
      case 'megaphone':
        return <Icons.Megaphone size={24} />;
      case 'palette':
        return <Icons.Palette size={24} />;
      case 'usersGroup':
        return <Icons.UsersGroup size={24} />;
      case 'trendingUp':
        return <Icons.TrendingUp size={24} />;
      default:
        return <Icons.Briefcase size={24} />;
    }
  };

  const handleCategorySelect = (title) => {
    setSelectedCategory(title);
    setSearchQuery('');
    navigateTo('jobs');
    showToast(`Showing all ${title} jobs`, 'success');
  };

  const handleExploreAll = (e) => {
    e.preventDefault();
    setSelectedCategory('All');
    setSearchQuery('');
    navigateTo('jobs');
    showToast('Showing all jobs across categories', 'info');
  };

  return (
    <section id="categories" className="categories-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-row reveal-top">
          <div>
            <span className="section-subtag">EXPLORE OPPORTUNITIES</span>
            <h2 className="section-title">Browse by Category</h2>
            <p className="section-subtitle">Find the right role in a field you love.</p>
          </div>
          <a
            href="#jobs"
            className="section-header-link"
            onClick={handleExploreAll}
          >
            Explore all jobs <Icons.ArrowRight size={16} />
          </a>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="categories-grid">
          {CATEGORIES.map((cat, idx) => (
            <div
              key={cat.id}
              className={`category-card ${idx < 3 ? 'reveal-left' : 'reveal-right'} delay-${(idx % 3) + 1}`}
              onClick={() => handleCategorySelect(cat.title)}
            >
              <div
                className="category-icon-box"
                style={{ backgroundColor: cat.iconBg, color: cat.iconColor }}
              >
                {renderCategoryIcon(cat.icon)}
              </div>
              <h3 className="category-title">{cat.title}</h3>
              <p className="category-count">{cat.jobsCount}</p>
              <button
                className="category-action-btn"
                aria-label={`View ${cat.title} jobs`}
              >
                <Icons.ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;

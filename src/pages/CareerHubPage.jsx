import { useState } from 'react';
import { CAREER_HUB_ARTICLES } from '../utils/constants';
import Icons from '../components/Icons';
import { useAuth } from '../context/AuthContext';

export const CareerHubPage = () => {
  const { showToast } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredArticles = CAREER_HUB_ARTICLES.filter(
    (a) => selectedCategory === 'All' || a.category === selectedCategory
  );

  const handleToolClick = (toolName) => {
    showToast(`Launching ${toolName}...`, 'info');
  };

  const renderArticleIcon = (type) => {
    switch (type) {
      case 'Laptop': return <Icons.Laptop size={32} />;
      case 'BarChart': return <Icons.BarChart size={32} />;
      case 'FileText': return <Icons.FileText size={32} />;
      case 'Award': return <Icons.Award size={32} />;
      default: return <Icons.Briefcase size={32} />;
    }
  };

  return (
    <div className="career-hub-page animate-fade-in">
      {/* Hero Section */}
      <section className="hub-hero-section">
        <div className="section-container">
          <div className="hub-hero-content">
            <span className="section-subtag">CAREER ACCELERATOR</span>
            <h1 className="section-title">Career Hub &amp; Growth Insights</h1>
            <p className="section-subtitle">
              Expert guides, compensation benchmarks, interview blueprints, and freelance playbooks.
            </p>
          </div>
        </div>
      </section>

      {/* Free Interactive Tools Strip */}
      <section className="hub-tools-strip">
        <div className="section-container">
          <div className="tools-grid-bar">
            <div className="hub-tool-card" onClick={() => handleToolClick('AI Resume ATS Score Checker')}>
              <div className="hub-tool-icon"><Icons.FileText size={22} /></div>
              <div>
                <h4 className="hub-tool-name">ATS Resume Checker</h4>
                <p className="hub-tool-desc">Score your resume against job descriptions</p>
              </div>
            </div>

            <div className="hub-tool-card" onClick={() => handleToolClick('India Tech Salary Calculator')}>
              <div className="hub-tool-icon"><Icons.TrendingUp size={22} /></div>
              <div>
                <h4 className="hub-tool-name">Salary Benchmark Tool</h4>
                <p className="hub-tool-desc">Compare current tech compensation by city &amp; tier</p>
              </div>
            </div>

            <div className="hub-tool-card" onClick={() => handleToolClick('Interview Simulator')}>
              <div className="hub-tool-icon"><Icons.Award size={22} /></div>
              <div>
                <h4 className="hub-tool-name">Mock Interview Questions</h4>
                <p className="hub-tool-desc">100+ company specific coding &amp; behavioral prompts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="hub-articles-section">
        <div className="section-container">
          {/* Category Tabs */}
          <div className="hub-categories-tabs">
            {['All', 'Interview Prep', 'Salary & Compensation', 'Resume & Portfolio', 'Freelancing Mastery'].map((cat) => (
              <button
                key={cat}
                className={`hub-cat-tab ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="hub-articles-grid">
            {filteredArticles.map((article) => (
              <div key={article.id} className="hub-article-card">
                <div
                  className="article-banner-wrap"
                  style={{
                    background: article.bgGradient || 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
                    color: article.accentColor || '#ff5c00',
                  }}
                >
                  <div className="article-banner-icon">
                    {renderArticleIcon(article.iconType)}
                  </div>
                  <span className="article-cat-badge">{article.category}</span>
                </div>

                <div className="article-card-body">
                  <div className="article-meta-row">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="article-card-title">{article.title}</h3>
                  <p className="article-card-excerpt">{article.excerpt}</p>

                  <div className="article-author-row">
                    <span className="author-name">By {article.author}</span>
                    <button
                      onClick={() => showToast(`Reading article: ${article.title}`, 'info')}
                      className="btn-read-article"
                    >
                      Read Guide <Icons.ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareerHubPage;

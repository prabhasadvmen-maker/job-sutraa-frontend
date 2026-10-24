import { useState, useMemo } from 'react';
import { FEATURED_JOBS } from '../utils/constants';
import Icons from '../components/Icons';
import { useAuth } from '../context/AuthContext';

export const JobListingPage = () => {
  const {
    savedJobs,
    toggleSaveJob,
    applyToJob,
    appliedJobs,
    navigateTo,
    selectedCategory,
    setSelectedCategory,
  } = useAuth();

  const [keyword, setKeyword] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [jobTypes, setJobTypes] = useState(['Full-time']);
  const [selectedExperience, setSelectedExperience] = useState(['1-3 years']);
  const [maxSalary, setMaxSalary] = useState(35);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [sortBy, setSortBy] = useState('Relevance');

  const handleJobTypeToggle = (type) => {
    setJobTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleExpToggle = (exp) => {
    setSelectedExperience((prev) =>
      prev.includes(exp) ? prev.filter((e) => e !== exp) : [...prev, exp]
    );
  };

  const handleCompanyToggle = (company) => {
    setSelectedCompanies((prev) =>
      prev.includes(company) ? prev.filter((c) => c !== company) : [...prev, company]
    );
  };

  const resetFilters = () => {
    setKeyword('');
    setSelectedLocation('All');
    setSelectedCategory('All');
    setJobTypes([]);
    setSelectedExperience([]);
    setMaxSalary(50);
    setSelectedCompanies([]);
    setSortBy('Relevance');
  };

  const filteredJobs = useMemo(() => {
    return FEATURED_JOBS.filter((job) => {
      const matchCategory =
        !selectedCategory ||
        selectedCategory === 'All' ||
        job.category === selectedCategory;

      const matchKeyword =
        !keyword ||
        job.title.toLowerCase().includes(keyword.toLowerCase()) ||
        job.company.toLowerCase().includes(keyword.toLowerCase()) ||
        (job.category && job.category.toLowerCase().includes(keyword.toLowerCase())) ||
        job.tags.some((t) => t.toLowerCase().includes(keyword.toLowerCase()));

      const matchLocation =
        selectedLocation === 'All' ||
        job.location.toLowerCase().includes(selectedLocation.toLowerCase());

      const matchCompany =
        selectedCompanies.length === 0 || selectedCompanies.includes(job.company);

      return matchCategory && matchKeyword && matchLocation && matchCompany;
    });
  }, [keyword, selectedLocation, selectedCompanies, selectedCategory]);

  const renderCompanyLogo = (job) => {
    switch (job.logoType) {
      case 'google':
        return <Icons.Google size={24} />;
      case 'microsoft':
        return <Icons.Microsoft size={24} />;
      case 'adobe':
        return <Icons.Adobe size={24} />;
      case 'amazon':
        return <Icons.Amazon size={24} />;
      default:
        return (
          <span
            className="company-initial-circle"
            style={{ backgroundColor: job.badgeBg, color: job.badgeColor }}
          >
            {job.companyInitial}
          </span>
        );
    }
  };

  return (
    <div className="job-listing-page animate-fade-in">
      {/* Top Search Bar Banner */}
      <section className="listing-search-hero">
        <div className="section-container">
          <div className="listing-search-wrapper">
            <div className="search-input-group">
              <Icons.Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search jobs, skills or company"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="listing-input"
              />
            </div>

            <div className="search-input-divider" />

            <div className="search-input-group location-group">
              <Icons.MapPin size={20} className="search-icon" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="listing-select"
              >
                <option value="All">All Locations</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Noida">Noida / Delhi NCR</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <button type="button" className="btn-listing-search">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Category Filter Pills Bar */}
      <section className="listing-categories-bar">
        <div className="section-container">
          <div className="listing-cat-pills-row">
            <span className="listing-cat-label">Browse by Category:</span>
            <div className="listing-cat-pills-list">
              {['All', 'IT & Software', 'Finance', 'Marketing', 'Design', 'Human Resources', 'Sales'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`listing-cat-pill ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main 2-Column Content */}
      <div className="section-container listing-main-layout">
        {/* Left Sidebar Filters */}
        <aside className="filters-sidebar">
          <div className="filters-header">
            <div className="filters-title-wrap">
              <Icons.Sliders size={18} />
              <h3 className="filters-title">Filters</h3>
            </div>
            <button onClick={resetFilters} className="btn-reset-filters">
              Reset
            </button>
          </div>

          {/* Filter Group: Job Type */}
          <div className="filter-group">
            <h4 className="filter-group-title">Job Type</h4>
            <div className="filter-options-list">
              {[
                { label: 'Full-time', count: '3,420' },
                { label: 'Part-time', count: '680' },
                { label: 'Internship', count: '420' },
                { label: 'Contract', count: '1,120' },
                { label: 'Work From Home', count: '980' },
              ].map((item) => (
                <label key={item.label} className="filter-checkbox-label">
                  <input
                    type="checkbox"
                    checked={jobTypes.includes(item.label)}
                    onChange={() => handleJobTypeToggle(item.label)}
                    className="filter-checkbox"
                  />
                  <span className="checkbox-text">{item.label}</span>
                  <span className="checkbox-count">({item.count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter Group: Experience */}
          <div className="filter-group">
            <h4 className="filter-group-title">Experience</h4>
            <div className="filter-options-list">
              {[
                { label: 'Fresher', count: '1,240' },
                { label: '1 - 3 years', count: '2,310' },
                { label: '3 - 5 years', count: '1,120' },
                { label: '5+ years', count: '640' },
              ].map((item) => (
                <label key={item.label} className="filter-checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedExperience.includes(item.label)}
                    onChange={() => handleExpToggle(item.label)}
                    className="filter-checkbox"
                  />
                  <span className="checkbox-text">{item.label}</span>
                  <span className="checkbox-count">({item.count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter Group: Salary Range Slider */}
          <div className="filter-group">
            <div className="salary-filter-header">
              <h4 className="filter-group-title">Salary Range</h4>
              <span className="salary-val-badge">₹0 – ₹{maxSalary} LPA</span>
            </div>
            <input
              type="range"
              min="3"
              max="50"
              value={maxSalary}
              onChange={(e) => setMaxSalary(Number(e.target.value))}
              className="salary-range-slider"
            />
            <div className="salary-scale-labels">
              <span>₹0</span>
              <span>₹25 LPA</span>
              <span>₹50 LPA</span>
            </div>
          </div>

          {/* Filter Group: Company */}
          <div className="filter-group">
            <h4 className="filter-group-title">Company</h4>
            <div className="filter-options-list">
              {[
                { label: 'Google', count: '240' },
                { label: 'Microsoft', count: '185' },
                { label: 'Adobe', count: '112' },
                { label: 'Amazon', count: '320' },
                { label: 'Accenture', count: '450' },
                { label: 'TCS', count: '520' },
              ].map((c) => (
                <label key={c.label} className="filter-checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedCompanies.includes(c.label)}
                    onChange={() => handleCompanyToggle(c.label)}
                    className="filter-checkbox"
                  />
                  <span className="checkbox-text">{c.label}</span>
                  <span className="checkbox-count">({c.count})</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Main Column: Jobs List */}
        <main className="jobs-results-column">
          <div className="results-header-bar">
            <div>
              <h2 className="results-count-title">
                <strong>{filteredJobs.length}</strong> {selectedCategory === 'All' ? 'Jobs' : `${selectedCategory} Jobs`} Found
              </h2>
              {selectedCategory !== 'All' && (
                <div className="active-cat-filter-tag">
                  <span>Filtered: <strong>{selectedCategory}</strong></span>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('All')}
                    className="btn-clear-cat-filter"
                  >
                    ✕ View All
                  </button>
                </div>
              )}
            </div>
            <div className="sort-dropdown-wrap">
              <span className="sort-label">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="Relevance">Relevance</option>
                <option value="Latest">Latest</option>
                <option value="SalaryHigh">Salary: High to Low</option>
              </select>
            </div>
          </div>

          {/* Job List Items */}
          <div className="job-cards-vertical-list">
            {filteredJobs.map((job) => {
              const isSaved = savedJobs.includes(job.id);
              const isApplied = appliedJobs.includes(job.id);

              return (
                <div key={job.id} className="job-list-row-card">
                  <div className="job-card-top-row">
                    <div className="job-card-brand-group">
                      <div className="job-card-logo-box">
                        {renderCompanyLogo(job)}
                      </div>
                      <div>
                        <h3
                          className="job-card-heading-link"
                          onClick={() => navigateTo('job-detail', job.id)}
                        >
                          {job.title}
                        </h3>
                        <div className="job-company-rating-row">
                          <span className="job-company-name">{job.company}</span>
                          <span className="job-rating-pill">
                            <Icons.Star size={13} /> {job.rating}
                          </span>
                          <span className="job-reviews-text">({job.reviews})</span>
                        </div>
                      </div>
                    </div>

                    <div className="job-card-actions-top">
                      {job.featured && <span className="featured-job-badge">Featured</span>}
                      <button
                        onClick={() => toggleSaveJob(job.id)}
                        className={`btn-bookmark-action ${isSaved ? 'saved' : ''}`}
                        aria-label="Save Job"
                      >
                        <Icons.Heart size={18} filled={isSaved} />
                      </button>
                    </div>
                  </div>

                  {/* Meta items: Location, Work Type, Experience */}
                  <div className="job-card-meta-line">
                    <span className="meta-info-item">
                      <Icons.MapPin size={14} /> {job.location}
                    </span>
                    <span className="meta-bullet">•</span>
                    <span className="meta-info-item">{job.workType}</span>
                    <span className="meta-bullet">•</span>
                    <span className="meta-info-item">{job.experience}</span>
                  </div>

                  {/* Tags & Salary Row */}
                  <div className="job-card-bottom-row">
                    <div className="job-skills-tags-wrap">
                      {job.tags.map((tag) => (
                        <span key={tag} className="job-skill-tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="job-salary-apply-group">
                      <span className="job-salary-highlight">{job.salary}</span>
                      <button
                        onClick={() => applyToJob(job.id, job.title)}
                        className={`btn-apply-direct ${isApplied ? 'applied' : ''}`}
                      >
                        {isApplied ? 'Applied ✓' : 'Apply Now'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default JobListingPage;

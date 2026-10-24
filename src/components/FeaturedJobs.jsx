import { FEATURED_JOBS } from '../utils/constants';
import Icons from './Icons';
import { useAuth } from '../context/AuthContext';

export const FeaturedJobs = () => {
  const {
    savedJobs,
    toggleSaveJob,
    appliedJobs,
    applyToJob,
    searchQuery,
    locationQuery,
    selectedCategory,
    setSelectedCategory,
    showToast,
    navigateTo,
  } = useAuth();

  // Filter jobs based on active search and category state
  const filteredJobs = FEATURED_JOBS.filter((job) => {
    const q = searchQuery.toLowerCase().trim();
    const loc = locationQuery.toLowerCase().trim();

    const matchesCategory =
      !selectedCategory ||
      selectedCategory === 'All' ||
      job.category === selectedCategory;

    const matchesSearch =
      !q ||
      job.title.toLowerCase().includes(q) ||
      job.company.toLowerCase().includes(q) ||
      (job.category && job.category.toLowerCase().includes(q)) ||
      job.tags.some((t) => t.toLowerCase().includes(q));

    const matchesLoc =
      !loc ||
      job.location.toLowerCase().includes(loc) ||
      (loc === 'remote' && job.location.toLowerCase() === 'remote');

    return matchesCategory && matchesSearch && matchesLoc;
  });

  const allMatchingJobs = filteredJobs.length > 0 ? filteredJobs : FEATURED_JOBS;
  const displayJobs = allMatchingJobs.slice(0, 8);

  return (
    <section id="featured-jobs" className="jobs-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-row reveal-left">
          <div>
            <span className="section-subtag">HANDPICKED FOR YOU</span>
            <h2 className="section-title">
              {selectedCategory && selectedCategory !== 'All' ? `${selectedCategory} Jobs` : 'Featured Jobs'}
            </h2>
            <p className="section-subtitle">
              {selectedCategory && selectedCategory !== 'All'
                ? `Showing ${displayJobs.length} of ${allMatchingJobs.length} handpicked roles in ${selectedCategory}`
                : `Showing ${displayJobs.length} of ${FEATURED_JOBS.length}+ curated opportunities across top companies.`}
            </p>
          </div>
          <a
            href="#jobs"
            className="section-header-link reveal-right"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('jobs');
            }}
          >
            View all jobs <Icons.ArrowRight size={16} />
          </a>
        </div>

        {/* 6 Job Cards Grid */}
        <div className="jobs-grid">
          {displayJobs.map((job, idx) => {
            const isSaved = savedJobs.includes(job.id);
            const isApplied = appliedJobs.includes(job.id);
            const animDirection = idx % 2 === 0 ? 'reveal-left' : 'reveal-right';
            const delayClass = `delay-${(idx % 4) + 1}`;

            return (
              <div key={job.id} className={`job-card ${animDirection} ${delayClass}`}>
                {/* Header: Company Icon & Bookmark */}
                <div className="job-card-header">
                  <div
                    className="company-initial-badge"
                    style={{
                      backgroundColor: job.badgeBg,
                      color: job.badgeColor,
                    }}
                  >
                    {job.companyInitial}
                  </div>
                  <button
                    className={`btn-save-job ${isSaved ? 'saved' : ''}`}
                    onClick={() => toggleSaveJob(job.id)}
                    aria-label="Save Job"
                  >
                    <Icons.Heart size={18} filled={isSaved} />
                  </button>
                </div>

                {/* Job Title & Company */}
                <h3
                  className="job-title"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigateTo('job-detail', job.id)}
                >
                  {job.title}
                </h3>
                <p className="job-company">{job.company}</p>

                {/* Meta details (Location, Work Type) */}
                <div className="job-meta-row">
                  <span className="job-meta-item">
                    <Icons.MapPin size={14} />
                    {job.location}
                  </span>
                  <span className="meta-bullet">•</span>
                  <span className="job-meta-item">{job.workType}</span>
                </div>

                {/* Salary */}
                <div className="job-salary">{job.salary}</div>

                {/* Tags */}
                <div className="job-tags-row">
                  {job.tags.map((tag, i) => (
                    <span key={i} className="job-tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Apply Button */}
                <button
                  className={`btn-job-apply ${isApplied ? 'applied' : ''}`}
                  onClick={() => applyToJob(job.id, job.title)}
                >
                  {isApplied ? (
                    <>
                      Applied <Icons.Check size={16} />
                    </>
                  ) : (
                    <>
                      Apply <Icons.ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {allMatchingJobs.length > 8 && (
          <div className="view-more-jobs-wrap">
            <button
              type="button"
              onClick={() => navigateTo('jobs')}
              className="btn-view-all-jobs-cta"
            >
              Explore All {allMatchingJobs.length} Jobs <Icons.ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedJobs;

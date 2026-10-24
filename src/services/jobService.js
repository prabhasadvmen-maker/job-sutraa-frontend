import { FEATURED_JOBS, FREELANCE_PROJECTS, CATEGORIES } from '../utils/constants';

/**
 * Service to handle jobs, projects, and categories data fetching
 */
export const jobService = {
  getFeaturedJobs: async () => {
    // Simulating API latency
    return Promise.resolve(FEATURED_JOBS);
  },

  getFreelanceProjects: async () => {
    return Promise.resolve(FREELANCE_PROJECTS);
  },

  getCategories: async () => {
    return Promise.resolve(CATEGORIES);
  },

  applyForJob: async (jobId, applicantData) => {
    return Promise.resolve({
      success: true,
      jobId,
      message: 'Application submitted successfully!',
      timestamp: new Date().toISOString(),
    });
  },

  searchJobs: async (query = '', location = '') => {
    const q = query.toLowerCase().trim();
    const loc = location.toLowerCase().trim();

    return FEATURED_JOBS.filter((job) => {
      const matchQuery =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.tags.some((t) => t.toLowerCase().includes(q));

      const matchLoc =
        !loc ||
        job.location.toLowerCase().includes(loc) ||
        (loc === 'remote' && job.location.toLowerCase() === 'remote');

      return matchQuery && matchLoc;
    });
  },
};

export default jobService;

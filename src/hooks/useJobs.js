import { useState, useMemo } from 'react';
import { FEATURED_JOBS, FREELANCE_PROJECTS, CATEGORIES } from '../utils/constants';

export const useJobs = (initialSearch = '', initialLocation = '', initialCategory = 'All') => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [locationTerm, setLocationTerm] = useState(initialLocation);
  const [category, setCategory] = useState(initialCategory);

  const filteredJobs = useMemo(() => {
    return FEATURED_JOBS.filter((job) => {
      const matchSearch =
        !searchTerm ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchLocation =
        !locationTerm ||
        job.location.toLowerCase().includes(locationTerm.toLowerCase());

      return matchSearch && matchLocation;
    });
  }, [searchTerm, locationTerm]);

  return {
    jobs: filteredJobs,
    projects: FREELANCE_PROJECTS,
    categories: CATEGORIES,
    searchTerm,
    setSearchTerm,
    locationTerm,
    setLocationTerm,
    category,
    setCategory,
  };
};

export default useJobs;

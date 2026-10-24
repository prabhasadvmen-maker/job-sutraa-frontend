import { FEATURED_JOBS, FREELANCE_PROJECTS } from '../../utils/constants';

// Initial state for Redux Job Slice
export const initialJobState = {
  jobs: FEATURED_JOBS,
  projects: FREELANCE_PROJECTS,
  savedJobIds: [],
  appliedJobIds: [],
  activeCategory: 'All',
  searchQuery: '',
  locationQuery: '',
  loading: false,
  error: null,
};

// Redux Action Types
export const JOB_ACTIONS = {
  SET_SEARCH_QUERY: 'jobs/setSearchQuery',
  SET_LOCATION_QUERY: 'jobs/setLocationQuery',
  TOGGLE_SAVE_JOB: 'jobs/toggleSaveJob',
  APPLY_JOB: 'jobs/applyJob',
  SET_CATEGORY: 'jobs/setCategory',
};

// Reducer function
export function jobReducer(state = initialJobState, action) {
  switch (action.type) {
    case JOB_ACTIONS.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    case JOB_ACTIONS.SET_LOCATION_QUERY:
      return { ...state, locationQuery: action.payload };
    case JOB_ACTIONS.TOGGLE_SAVE_JOB: {
      const jobId = action.payload;
      const isSaved = state.savedJobIds.includes(jobId);
      return {
        ...state,
        savedJobIds: isSaved
          ? state.savedJobIds.filter((id) => id !== jobId)
          : [...state.savedJobIds, jobId],
      };
    }
    case JOB_ACTIONS.APPLY_JOB: {
      const jobId = action.payload;
      if (state.appliedJobIds.includes(jobId)) return state;
      return {
        ...state,
        appliedJobIds: [...state.appliedJobIds, jobId],
      };
    }
    case JOB_ACTIONS.SET_CATEGORY:
      return { ...state, activeCategory: action.payload };
    default:
      return state;
  }
}

// Action Creators
export const setSearchQuery = (query) => ({
  type: JOB_ACTIONS.SET_SEARCH_QUERY,
  payload: query,
});

export const setLocationQuery = (loc) => ({
  type: JOB_ACTIONS.SET_LOCATION_QUERY,
  payload: loc,
});

export const toggleSaveJob = (id) => ({
  type: JOB_ACTIONS.TOGGLE_SAVE_JOB,
  payload: id,
});

export const applyJob = (id) => ({
  type: JOB_ACTIONS.APPLY_JOB,
  payload: id,
});

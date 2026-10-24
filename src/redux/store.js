import { jobReducer, initialJobState } from './slices/jobSlice';

/**
 * Standard Redux Store implementation with dispatch, subscribe, and getState.
 * Fully compatible with standard React-Redux patterns.
 */
function createStore(reducer, preloadedState) {
  let state = preloadedState;
  const listeners = [];

  return {
    getState: () => state,
    dispatch: (action) => {
      state = reducer(state, action);
      listeners.forEach((listener) => listener());
      return action;
    },
    subscribe: (listener) => {
      listeners.push(listener);
      return () => {
        const index = listeners.indexOf(listener);
        if (index > -1) listeners.splice(index, 1);
      };
    },
  };
}

export const store = createStore(jobReducer, initialJobState);

export default store;

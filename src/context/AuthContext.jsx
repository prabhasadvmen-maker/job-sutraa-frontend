import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedJobId, setSelectedJobId] = useState('google-se');
  const [selectedProjectId, setSelectedProjectId] = useState('proj-wordpress');
  const [user, setUser] = useState(null);
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login', defaultRole: 'Job Seeker' });
  const [savedJobs, setSavedJobs] = useState([]);
  const [savedProjects, setSavedProjects] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [appliedProjects, setAppliedProjects] = useState([]);
  const [toast, setToast] = useState({ message: '', type: 'success', isVisible: false });
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [activeQuickLink, setActiveQuickLink] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Sync hash routing with currentPage
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) {
        setCurrentPage('home');
      } else if (hash.startsWith('job/')) {
        const id = hash.replace('job/', '');
        setSelectedJobId(id);
        setCurrentPage('job-detail');
      } else if (hash.startsWith('project/')) {
        const id = hash.replace('project/', '');
        setSelectedProjectId(id);
        setCurrentPage('project-detail');
      } else {
        setCurrentPage(hash);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page, paramId = null) => {
    if (page === 'job-detail') {
      if (paramId) setSelectedJobId(paramId);
      window.location.hash = `job/${paramId || selectedJobId}`;
    } else if (page === 'project-detail') {
      if (paramId) setSelectedProjectId(paramId);
      window.location.hash = `project/${paramId || selectedProjectId}`;
    } else if (page === 'home') {
      window.location.hash = '';
      setCurrentPage('home');
    } else {
      window.location.hash = page;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, 3200);
  };

  const openLogin = (role = 'Job Seeker') => setAuthModal({ isOpen: true, mode: 'login', defaultRole: role });
  const openSignUp = (role = 'Job Seeker') => setAuthModal({ isOpen: true, mode: 'signup', defaultRole: role });
  const closeAuthModal = () => setAuthModal({ isOpen: false, mode: 'login', defaultRole: 'Job Seeker' });

  const login = (email, password, role = 'Job Seeker') => {
    const userName = email.split('@')[0] || 'User';
    setUser({
      name: userName,
      email,
      role,
      initial: userName.charAt(0).toUpperCase(),
    });
    closeAuthModal();
    showToast(`Welcome back, ${userName}!`, 'success');
  };

  const signup = (name, email, role = 'Job Seeker') => {
    setUser({
      name,
      email,
      role,
      initial: (name || 'U').charAt(0).toUpperCase(),
    });
    closeAuthModal();
    showToast(`Account created successfully as ${role}!`, 'success');
  };

  const logout = () => {
    setUser(null);
    showToast('Signed out successfully.', 'info');
  };

  const toggleSaveJob = (jobId) => {
    setSavedJobs((prev) => {
      const isSaved = prev.includes(jobId);
      const updated = isSaved ? prev.filter((id) => id !== jobId) : [...prev, jobId];
      showToast(
        isSaved ? 'Job removed from saved list' : 'Job saved to your bookmarks!',
        isSaved ? 'info' : 'success'
      );
      return updated;
    });
  };

  const toggleSaveProject = (projectId) => {
    setSavedProjects((prev) => {
      const isSaved = prev.includes(projectId);
      const updated = isSaved ? prev.filter((id) => id !== projectId) : [...prev, projectId];
      showToast(
        isSaved ? 'Project removed from saved list' : 'Project saved to bookmarks!',
        isSaved ? 'info' : 'success'
      );
      return updated;
    });
  };

  const applyToJob = (jobId, jobTitle) => {
    if (appliedJobs.includes(jobId)) {
      showToast(`You have already applied for ${jobTitle}!`, 'info');
      return;
    }
    setAppliedJobs((prev) => [...prev, jobId]);
    showToast(`Application submitted for ${jobTitle}! 🎉`, 'success');
  };

  const applyToProject = (projectId, projectTitle) => {
    if (appliedProjects.includes(projectId)) {
      showToast(`Proposal already sent for ${projectTitle}!`, 'info');
      return;
    }
    setAppliedProjects((prev) => [...prev, projectId]);
    showToast(`Proposal successfully submitted for ${projectTitle}! 🚀`, 'success');
  };

  return (
    <AuthContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedJobId,
        setSelectedJobId,
        selectedProjectId,
        setSelectedProjectId,
        navigateTo,
        user,
        authModal,
        openLogin,
        openSignUp,
        closeAuthModal,
        login,
        signup,
        logout,
        savedJobs,
        toggleSaveJob,
        savedProjects,
        toggleSaveProject,
        appliedJobs,
        applyToJob,
        appliedProjects,
        applyToProject,
        toast,
        showToast,
        searchQuery,
        setSearchQuery,
        locationQuery,
        setLocationQuery,
        activeQuickLink,
        setActiveQuickLink,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;

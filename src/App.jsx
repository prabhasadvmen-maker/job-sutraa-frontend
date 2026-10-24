import { useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';

import HomePage from './pages/HomePage';
import JobListingPage from './pages/JobListingPage';
import JobDetailPage from './pages/JobDetailPage';
import FreelanceMarketplacePage from './pages/FreelanceMarketplacePage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import HireTalentPage from './pages/HireTalentPage';
import CareerHubPage from './pages/CareerHubPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import './App.css';

const AppContent = () => {
  const { currentPage } = useAuth();

  // Scroll reveal animation observer
  useEffect(() => {
    // Select all directional and scroll reveal targets across the active page
    const elements = document.querySelectorAll(
      '.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-top, .reveal-bottom, section, .job-card, .project-card, .category-card, .talent-card, .article-card, .value-card, .contact-info-card, .stat-card, .stat-cta-box, .why-card, .step-card, .trust-banner-container'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elements.forEach((el) => {
      // If element is already in viewport on mount, reveal immediately
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('is-revealed');
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentPage]);

  const renderActivePage = () => {
    switch (currentPage) {
      case 'jobs':
        return <JobListingPage />;
      case 'job-detail':
        return <JobDetailPage />;
      case 'freelance':
        return <FreelanceMarketplacePage />;
      case 'project-detail':
        return <ProjectDetailPage />;
      case 'hire-talent':
        return <HireTalentPage />;
      case 'career-hub':
        return <CareerHubPage />;
      case 'about':
        return <AboutUsPage />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="jobsutraa-app-root">
      {/* Top Navbar */}
      <Navbar />

      {/* Dynamic Main Body Content */}
      <main className="app-main-body" id="main-content">
        {renderActivePage()}
      </main>

      {/* Light Footer */}
      <Footer />

      {/* Global Modals & Overlays */}
      <AuthModal />
      <Toast />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

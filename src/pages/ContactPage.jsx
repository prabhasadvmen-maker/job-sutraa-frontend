import { useState } from 'react';
import Icons from '../components/Icons';
import { useAuth } from '../context/AuthContext';

export const ContactPage = () => {
  const { showToast } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Job Seeker Support',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      showToast('Thank you! Your message has been sent. Our team will contact you shortly.', 'success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Job Seeker Support',
        message: '',
      });
    }, 800);
  };

  const faqs = [
    {
      q: 'How fast do employers respond to applications submitted on JobSutraa?',
      a: 'Most verified companies on JobSutraa review incoming profiles within 48-72 business hours. You will receive real-time email notifications and dashboard updates when your profile is shortlisted.',
    },
    {
      q: 'Is applying for jobs free for candidates and freelancers?',
      a: 'Yes, 100% free! We never charge candidates to browse listings, build resume profiles, or submit applications to employers.',
    },
    {
      q: 'How does freelance project escrow and payment release work?',
      a: 'When an employer hires you for a freelance project, funds are securely held in JobSutraa Escrow. Once milestones are delivered and reviewed, payments are disbursed directly into your bank account within 24 hours.',
    },
    {
      q: 'How do employers verify background credentials of applicants?',
      a: 'JobSutraa offers automated skill testing, verified employment tags, and portfolio verification badges to help employers review authenticated candidate credentials.',
    },
  ];

  return (
    <div className="contact-page-wrapper">
      {/* Header Banner */}
      <section className="contact-hero-section reveal-on-scroll">
        <div className="contact-hero-container">
          <span className="section-subtag">WE ARE HERE FOR YOU</span>
          <h1 className="contact-hero-title">
            Let’s Start a <span className="highlight-orange">Conversation</span>
          </h1>
          <p className="contact-hero-subtitle">
            Have questions about finding a job, hiring top talent, or posting freelance projects? Reach out to our dedicated support team anytime.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Info Cards */}
      <section className="contact-content-section reveal-on-scroll">
        <div className="contact-container">
          <div className="contact-layout-grid">
            {/* Left: Contact Form */}
            <div className="contact-form-card">
              <h2 className="contact-form-title">Send Us a Message</h2>
              <p className="contact-form-desc">
                Fill out the form below and an advisor will get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row-2col">
                  <div className="contact-field-group">
                    <label className="contact-label">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="contact-input"
                    />
                  </div>

                  <div className="contact-field-group">
                    <label className="contact-label">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="contact-input"
                    />
                  </div>
                </div>

                <div className="form-row-2col">
                  <div className="contact-field-group">
                    <label className="contact-label">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="contact-input"
                    />
                  </div>

                  <div className="contact-field-group">
                    <label className="contact-label">Inquiry Topic</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="contact-select"
                    >
                      <option value="Job Seeker Support">Job Seeker Support</option>
                      <option value="Employer Hiring & Pricing">Employer Hiring & Pricing</option>
                      <option value="Freelance Projects & Escrow">Freelance Projects & Escrow</option>
                      <option value="Partnership & Press">Partnership & Press</option>
                      <option value="Feedback / Report Issue">Feedback / Report Issue</option>
                    </select>
                  </div>
                </div>

                <div className="contact-field-group">
                  <label className="contact-label">Your Message *</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell us how we can assist you..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="contact-textarea"
                  />
                </div>

                <button type="submit" disabled={submitting} className="btn-contact-submit">
                  {submitting ? 'Sending...' : 'Send Message'} <Icons.ArrowRight size={16} />
                </button>
              </form>
            </div>

            {/* Right: Quick Info Cards */}
            <div className="contact-info-column">
              {/* Phone Card */}
              <div className="contact-info-card">
                <div className="contact-info-icon phone">
                  <Icons.Phone size={22} />
                </div>
                <div className="contact-info-text">
                  <span className="info-card-label">Direct Phone Line</span>
                  <a href="tel:+918375008009" className="info-card-value highlight">
                    +91 83750 08009
                  </a>
                  <p className="info-card-sub">Mon – Sat, 9:30 AM – 7:00 PM IST</p>
                </div>
              </div>

              {/* Email Card */}
              <div className="contact-info-card">
                <div className="contact-info-icon email">
                  <Icons.Mail size={22} />
                </div>
                <div className="contact-info-text">
                  <span className="info-card-label">Official Email</span>
                  <a href="mailto:contact@jobsutraa.com" className="info-card-value">
                    contact@jobsutraa.com
                  </a>
                  <p className="info-card-sub">Average response time: &lt; 4 hours</p>
                </div>
              </div>

              {/* Instagram Card */}
              <div className="contact-info-card">
                <div className="contact-info-icon instagram">
                  <Icons.Instagram size={22} />
                </div>
                <div className="contact-info-text">
                  <span className="info-card-label">Official Instagram</span>
                  <a
                    href="https://www.instagram.com/jobsutraa?obrf=MXJtemRmMDhsYWszdA%3D%3D&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="info-card-value"
                  >
                    @jobsutraa
                  </a>
                  <p className="info-card-sub">Daily hiring alerts, resume tips & reels</p>
                </div>
              </div>

              {/* Office Location Card */}
              <div className="contact-info-card">
                <div className="contact-info-icon location">
                  <Icons.MapPin size={22} />
                </div>
                <div className="contact-info-text">
                  <span className="info-card-label">Corporate Office</span>
                  <p className="info-card-value plain">T-4B-506, NX One Plot no.17, Techzone-4</p>
                  <p className="info-card-sub">Greater Noida West, GAUTAM BUDDHA NAGAR, Pin 201308</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Accordion */}
      <section className="contact-faq-section reveal-on-scroll">
        <div className="contact-container">
          <div className="section-header-center">
            <span className="section-subtag">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Quick answers to common queries from applicants and employers.</p>
          </div>

          <div className="faq-accordion-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className={`faq-card-item ${isOpen ? 'open' : ''}`}>
                  <button
                    className="faq-question-btn"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  >
                    <span>{faq.q}</span>
                    <span className="faq-toggle-icon">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="faq-answer-pane">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

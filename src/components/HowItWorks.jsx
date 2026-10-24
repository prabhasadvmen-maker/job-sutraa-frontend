import { HOW_IT_WORKS_STEPS } from '../utils/constants';

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-centered reveal-top">
          <span className="section-subtag">HOW IT WORKS</span>
          <h2 className="section-title">Simple Steps to Your Success</h2>
          <p className="section-subtitle">
            Whether you&apos;re job hunting, freelancing or hiring — JobSutraa makes it easy.
          </p>
        </div>

        {/* Steps Flow with Connector Line */}
        <div className="steps-flow-container">
          <div className="steps-connector-line" />
          <div className="steps-grid">
            {HOW_IT_WORKS_STEPS.map((step, idx) => (
              <div key={step.step} className={`step-card ${idx % 2 === 0 ? 'reveal-left' : 'reveal-right'} delay-${idx + 1}`}>
                <div className="step-circle-badge">
                  <span>{step.step}</span>
                </div>
                <h3 className="step-card-title">{step.title}</h3>
                <p className="step-card-desc">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Icons from './Icons';

export const AuthModal = () => {
  const { authModal, closeAuthModal, login, signup, showToast } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [activeRole, setActiveRole] = useState('Job Seeker'); // 'Job Seeker' | 'Freelancer' | 'Employer'
  const [identifier, setIdentifier] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  useEffect(() => {
    if (authModal.isOpen) {
      setMode(authModal.mode || 'login');
      if (authModal.defaultRole) {
        setActiveRole(authModal.defaultRole);
      }
    }
  }, [authModal]);

  if (!authModal.isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'login') {
      const email = identifier.includes('@') ? identifier : `${identifier}@jobsutraa.user`;
      login(email, password, activeRole);
    } else {
      const email = identifier.includes('@') ? identifier : `${identifier}@jobsutraa.user`;
      signup(name || 'Job Seeker', email, activeRole);
    }
  };

  const handleSocialAuth = (provider) => {
    const demoEmail = `${provider.toLowerCase()}.user@example.com`;
    login(demoEmail, 'social-auth-token', activeRole);
    showToast(`Signed in with ${provider} successfully!`, 'success');
  };

  return (
    <div className="modal-backdrop" onClick={closeAuthModal}>
      <div className="modal-card auth-modal-v2" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          className="modal-close-btn"
          onClick={closeAuthModal}
          aria-label="Close dialog"
        >
          <Icons.X size={20} />
        </button>

        {/* Brand Logo & Header */}
        <div className="auth-modal-header">
          <img src="/logo.png" alt="JobSutraa" className="auth-brand-logo" />
          <h2 className="auth-modal-title">
            {mode === 'login' ? 'Welcome Back' : 'Create an Account'}
          </h2>
          <p className="auth-modal-subtitle">
            {mode === 'login' ? 'Sign in to continue' : 'Join 50,000+ professionals and employers'}
          </p>
        </div>

        {/* Role Tabs */}
        <div className="auth-role-tabs">
          {['Job Seeker', 'Freelancer', 'Employer'].map((role) => (
            <button
              key={role}
              type="button"
              className={`auth-role-tab ${activeRole === role ? 'active' : ''}`}
              onClick={() => setActiveRole(role)}
            >
              {role}
              {activeRole === role && <span className="auth-role-indicator" />}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="auth-form-body">
          {mode === 'signup' && (
            <div className="auth-input-group">
              <label className="auth-input-label">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="auth-input-field"
                required
              />
            </div>
          )}

          <div className="auth-input-group">
            <label className="auth-input-label">Email or Mobile Number</label>
            <input
              type="text"
              placeholder="Enter your email or mobile"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="auth-input-field"
              required
            />
          </div>

          <div className="auth-input-group">
            <label className="auth-input-label">Password</label>
            <div className="auth-password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input-field"
                required
              />
              <button
                type="button"
                className="btn-toggle-eye"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <Icons.EyeOff size={18} /> : <Icons.Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember me & Forgot Password */}
          <div className="auth-extras-row">
            <label className="auth-checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="auth-checkbox"
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              className="auth-forgot-link"
              onClick={() => showToast('Password reset link sent to registered email', 'info')}
            >
              Forgot password?
            </button>
          </div>

          {/* Primary Action Button */}
          <button type="submit" className="btn-auth-primary">
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>

        {/* OR Divider */}
        <div className="auth-or-divider">
          <span>OR</span>
        </div>

        {/* Social SSO Buttons */}
        <div className="auth-social-buttons">
          <button
            type="button"
            className="btn-social-sso"
            onClick={() => handleSocialAuth('Google')}
          >
            <Icons.Google size={18} />
            <span>Continue with Google</span>
          </button>
          <button
            type="button"
            className="btn-social-sso"
            onClick={() => handleSocialAuth('Facebook')}
          >
            <Icons.Facebook size={18} />
            <span>Continue with Facebook</span>
          </button>
        </div>

        {/* Bottom Switch Link */}
        <div className="auth-bottom-switch">
          {mode === 'login' ? (
            <p>
              New to JobSutraa?{' '}
              <button
                type="button"
                className="auth-switch-link"
                onClick={() => setMode('signup')}
              >
                Create an account
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                className="auth-switch-link"
                onClick={() => setMode('login')}
              >
                Sign in
              </button>
            </p>
          )}
        </div>

        {/* Demo Fill Helper */}
        <div className="auth-demo-shortcut">
          <button
            type="button"
            className="btn-fill-demo"
            onClick={() => {
              setIdentifier('rahul.verma@example.com');
              setPassword('JobSutraa@2026');
              if (mode === 'signup') setName('Rahul Verma');
            }}
          >
            ⚡ Quick Demo Auto-Fill
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

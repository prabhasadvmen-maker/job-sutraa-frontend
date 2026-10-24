import { useAuth } from '../context/AuthContext';
import Icons from './Icons';

export const Toast = () => {
  const { toast } = useAuth();

  if (!toast.isVisible) return null;

  return (
    <div className={`toast-notification toast-${toast.type}`}>
      <span className="toast-icon">
        {toast.type === 'success' && <Icons.Check size={18} />}
        {toast.type === 'info' && <Icons.Award size={18} />}
        {toast.type === 'error' && <Icons.X size={18} />}
      </span>
      <span className="toast-message">{toast.message}</span>
    </div>
  );
};

export default Toast;

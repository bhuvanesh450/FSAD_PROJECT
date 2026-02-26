import { createContext, useContext, useState, useCallback } from 'react';

let _id = 0;
const ToastCtx = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback((msg, type = 'i') => {
    const id = ++_id;
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
  }, []);

  const icons = { s: '✓', e: '⚠', i: 'ℹ' };

  return (
    <ToastCtx.Provider value={toast}>
      {children}
      <div className="toast-ct">
        {toasts.map(t => (
          <div key={t.id} className={`toast t-${t.type}`}>
            <span style={{ fontSize: 16, fontWeight: 900 }}>{icons[t.type]}</span>
            <span>{t.msg}</span>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export const useToast = () => useContext(ToastCtx);

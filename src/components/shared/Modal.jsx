export default function Modal({ open, title, onClose, children, maxWidth = 520 }) {
  if (!open) return null;

  return (
    <div
      className="overlay open"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal" style={{ maxWidth }}>
        <div className="modal-hdr">
          <h2 style={{ fontSize: 18, fontWeight: 900 }}>{title}</h2>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

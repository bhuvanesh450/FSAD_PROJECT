export default function Topnav({ onBrandClick, children }) {
  return (
    <nav className="topnav">
      <div className="brand" onClick={onBrandClick}>
        <div className="brand-gem">CB</div>
        <span className="brand-name">CareerBridge</span>
      </div>
      <div className="flex items-center gap-3">
        {children}
      </div>
    </nav>
  );
}

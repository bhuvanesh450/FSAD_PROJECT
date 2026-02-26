export default function StatCard({ icon, value, label, color, borderColor }) {
  return (
    <div className="stat-card" style={{ borderColor }}>
      <div className="stat-glow" style={{ background: color }} />
      <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
      <div className="stat-val" style={{ color }}>{value}</div>
      <div className="stat-lbl">{label}</div>
    </div>
  );
}

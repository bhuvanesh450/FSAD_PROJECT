export default function EmptyState({ icon, text }) {
  return (
    <div className="empty">
      <div className="empty-ico">{icon}</div>
      <div>{text}</div>
    </div>
  );
}

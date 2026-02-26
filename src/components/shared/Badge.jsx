const MAP = {
  cyan: 'b-cyan', green: 'b-green', red: 'b-red',
  gold: 'b-gold', gray: 'b-gray',   purp: 'b-purp',
};

export default function Badge({ children, variant = 'cyan' }) {
  return (
    <span className={`badge ${MAP[variant] || 'b-cyan'}`}>
      {children}
    </span>
  );
}

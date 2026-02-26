import { useDB } from '../../context/DBContext';

export default function StatsStrip() {
  const { fairs, companies, students } = useDB();
  const totalRegs = fairs.reduce((s, f) => s + f.regCount, 0);

  const stats = [
    { val: fairs.length,     label: 'Career Fairs',   color: 'var(--c1)' },
    { val: companies.length, label: 'Companies',       color: '#a78bfa'   },
    { val: students.length,  label: 'Students',        color: 'var(--c4)' },
    { val: totalRegs,        label: 'Registrations',   color: 'var(--gold)'},
  ];

  return (
    <div style={{ background: 'var(--s1)', borderTop: '1px solid var(--b1)', borderBottom: '1px solid var(--b1)', padding: '32px 60px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', textAlign: 'center', gap: 20 }}>
      {stats.map((s, i) => (
        <div key={i}>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: 52, letterSpacing: 2, color: s.color }}>{s.val.toLocaleString()}</div>
          <div style={{ fontSize: 12, color: 'var(--t2)', marginTop: 4, fontWeight: 600 }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

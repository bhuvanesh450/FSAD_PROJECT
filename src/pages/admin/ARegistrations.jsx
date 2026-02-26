import { useDB }   from '../../context/DBContext';
import StatCard     from '../../components/shared/StatCard';
import Badge        from '../../components/shared/Badge';
import EmptyState   from '../../components/shared/EmptyState';

export default function ARegistrations() {
  const { students, fairs } = useDB();
  const all = students.flatMap(s => s.registeredFairs.map(fid => ({ stu: s, fair: fairs.find(f => f.id === fid) })));

  return (
    <div className="sec-anim">
      <div className="mb-6">
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 4 }}>Registrations</h1>
        <p style={{ color: 'var(--t2)', fontSize: 13 }}>All student fair registrations</p>
      </div>

      <div className="grid-4 mb-6">
        <StatCard icon="📋" value={all.length}                                                               label="Total"              color="var(--c1)"  borderColor="rgba(0,245,255,.18)"  />
        <StatCard icon="🎓" value={new Set(students.filter(s => s.registeredFairs.length > 0).map(s => s.id)).size} label="Registered Students" color="#a78bfa"   borderColor="rgba(124,58,237,.18)" />
        <StatCard icon="🎪" value={fairs.filter(f => f.regCount > 0).length}                                label="Active Fairs"        color="var(--c4)"  borderColor="rgba(0,255,136,.18)"  />
        <StatCard icon="📊" value={fairs.length > 0 ? (all.length / fairs.length).toFixed(1) : '0'}        label="Avg per Fair"        color="var(--gold)" borderColor="rgba(255,215,0,.18)"  />
      </div>

      {all.length === 0
        ? <EmptyState icon="📋" text="No registrations yet." />
        : (
          <div className="tbl-wrap">
            <table>
              <thead><tr><th>#</th><th>Student</th><th>University</th><th>Fair</th><th>Status</th></tr></thead>
              <tbody>
                {all.map((r, i) => {
                  const ini = r.stu.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
                  return (
                    <tr key={i}>
                      <td style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: 'var(--t3)' }}>{i + 1}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,var(--c1),var(--c2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 11, color: '#000', flexShrink: 0 }}>{ini}</div>
                          <div>
                            <div style={{ fontWeight: 800, fontSize: 13 }}>{r.stu.name}</div>
                            <div style={{ fontSize: 12, color: 'var(--t2)' }}>{r.stu.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ fontSize: 12, color: 'var(--t2)' }}>{r.stu.university || '—'}</td>
                      <td style={{ fontWeight: 700, fontSize: 13 }}>{r.fair?.banner} {r.fair?.title || 'Unknown'}</td>
                      <td><Badge variant="green">✓ Registered</Badge></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )
      }
    </div>
  );
}

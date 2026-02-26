import { useDB }   from '../../context/DBContext';
import { useToast } from '../../context/ToastContext';
import Badge         from '../../components/shared/Badge';
import EmptyState    from '../../components/shared/EmptyState';

export default function SFairs() {
  const { fairs, companies, currentUser, registerFair, unregisterFair } = useDB();
  const toast = useToast();
  const u = currentUser;

  const onRegister = (fair) => {
    if (u.registeredFairs.includes(fair.id)) return toast('Already registered!', 'i');
    registerFair(u.id, fair.id);
    toast(`✅ Registered for "${fair.title}"!`, 's');
  };

  const onUnregister = (fair) => {
    unregisterFair(u.id, fair.id);
    toast(`Unregistered from "${fair.title}"`, 'i');
  };

  if (fairs.length === 0) return <EmptyState icon="🎪" text="No career fairs available yet. Check back soon!" />;

  return (
    <div className="sec-anim">
      <div className="mb-6">
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 4 }}>Career Fairs</h1>
        <p style={{ color: 'var(--t2)', fontSize: 13 }}>Browse and register for upcoming virtual career events</p>
      </div>

      {fairs.map(fair => {
        const isReg = u?.registeredFairs.includes(fair.id);
        const cos   = companies.filter(c => c.fairId === fair.id);
        const pct   = Math.min(100, Math.round((fair.regCount / fair.capacity) * 100));

        return (
          <div key={fair.id} style={{ background: 'var(--s1)', border: `1px solid ${isReg ? 'rgba(0,255,136,.3)' : 'var(--b1)'}`, borderRadius: 20, overflow: 'hidden', marginBottom: 16 }}>
            {/* Color bar */}
            <div style={{ height: 3, background: isReg ? 'linear-gradient(90deg,var(--c4),#00b4d8)' : 'linear-gradient(90deg,var(--c1),var(--c2))' }} />

            <div style={{ padding: 24 }}>
              {/* Header row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 14 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 900 }}>{fair.banner} {fair.title}</h3>
                    {isReg && <Badge variant="green">✓ Registered</Badge>}
                    <Badge variant={fair.status === 'upcoming' ? 'cyan' : fair.status === 'completed' ? 'gray' : 'red'}>{fair.status}</Badge>
                  </div>
                  <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--t2)', flexWrap: 'wrap' }}>
                    <span>📅 {fair.date}</span>
                    {fair.time && <span>🕐 {fair.time}</span>}
                    <span>👥 {fair.regCount} registered</span>
                    <span>🏢 {cos.length} companies</span>
                  </div>
                </div>

                {/* Action button */}
                {fair.status === 'upcoming'
                  ? isReg
                    ? <button className="btn btn-danger btn-sm" onClick={() => onUnregister(fair)}>✕ Unregister</button>
                    : <button className="btn btn-primary btn-sm" onClick={() => onRegister(fair)}>Register Now</button>
                  : <Badge variant="gray">{fair.status}</Badge>
                }
              </div>

              {/* Progress */}
              <div style={{ marginBottom: 12 }}>
                <div className="prog"><div className="prog-b" style={{ width: `${pct}%` }} /></div>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: 'var(--t3)', marginTop: 6 }}>{fair.regCount} / {fair.capacity} spots · {pct}% full</div>
              </div>

              {fair.description && <p style={{ fontSize: 13, color: 'var(--t2)', lineHeight: 1.65 }}>{fair.description}</p>}

              {/* Participating companies */}
              {cos.length > 0 && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--b1)' }}>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: 'var(--t3)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>PARTICIPATING COMPANIES</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {cos.map(c => (
                      <span key={c.id} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--s2)', border: '1px solid var(--b1)', padding: '4px 12px', borderRadius: 8, fontSize: 12, color: 'var(--t2)' }}>
                        <span style={{ color: c.color }}>{c.logo}</span>{c.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

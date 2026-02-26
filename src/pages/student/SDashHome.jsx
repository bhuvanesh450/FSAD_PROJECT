import { useDB }    from '../../context/DBContext';
import StatCard      from '../../components/shared/StatCard';
import Badge         from '../../components/shared/Badge';
import EmptyState    from '../../components/shared/EmptyState';

const QUICK_ACTIONS = [
  { ico: '🎪', title: 'Browse Career Fairs',   sub: 'Register for upcoming events',   sec: 's-fairs',   c: '0,245,255' },
  { ico: '🏢', title: 'Explore Company Booths', sub: 'Visit booths & see open roles',  sec: 's-booths',  c: '124,58,237' },
  { ico: '📄', title: 'Submit Resume',           sub: 'Apply to companies of interest', sec: 's-resume',  c: '0,255,136' },
  { ico: '💬', title: 'Live Chat',               sub: 'Talk to company recruiters now', sec: 's-chat',    c: '255,215,0' },
];

export default function SDashHome({ onNav }) {
  const { currentUser, companies, fairs } = useDB();
  const u = currentUser;
  if (!u) return null;

  const myFairs    = fairs.filter(f => u.registeredFairs.includes(f.id));
  const upcoming   = fairs.filter(f => f.status === 'upcoming').length;
  const recentApps = [...u.resumes].reverse().slice(0, 3);

  return (
    <div className="sec-anim">
      {/* Greeting */}
      <div className="mb-6">
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: 'var(--t3)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>WELCOME BACK</div>
        <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 4 }}>Hey, <span style={{ color: 'var(--c1)' }}>{u.name.split(' ')[0]}</span> 👋</h1>
        <p style={{ color: 'var(--t2)', fontSize: 13 }}>{[u.university, u.major].filter(x => x && x !== '—').join(' · ') || 'Ready to explore opportunities?'}</p>
      </div>

      {/* Stats */}
      <div className="grid-4 mb-6">
        <StatCard icon="🎪" value={u.registeredFairs.length} label="Registered Fairs" color="var(--c1)"   borderColor="rgba(0,245,255,.18)" />
        <StatCard icon="📄" value={u.resumes.length}         label="Resumes Submitted" color="#a78bfa"    borderColor="rgba(124,58,237,.18)" />
        <StatCard icon="🏢" value={companies.length}         label="Open Companies"    color="var(--c4)"  borderColor="rgba(0,255,136,.18)" />
        <StatCard icon="📅" value={upcoming}                 label="Upcoming Fairs"    color="var(--gold)" borderColor="rgba(255,215,0,.18)" />
      </div>

      <div className="grid-2">
        {/* Quick Actions */}
        <div>
          <h2 style={{ fontSize: 13, fontWeight: 700, marginBottom: 14 }}>Quick Actions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {QUICK_ACTIONS.map((qa, i) => (
              <div key={i} onClick={() => onNav(qa.sec)} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 14, borderRadius: 13, background: 'var(--s1)', border: '1px solid var(--b1)', cursor: 'pointer', transition: 'all .2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,245,255,.22)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.transform = ''; }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, background: `rgba(${qa.c},.1)`, border: `1px solid rgba(${qa.c},.18)`, flexShrink: 0 }}>{qa.ico}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{qa.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--t2)', marginTop: 2 }}>{qa.sub}</div>
                </div>
                <span style={{ marginLeft: 'auto', color: 'var(--t3)', fontSize: 13 }}>→</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          {/* Registered Fairs */}
          <div className="card mb-4">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h2 style={{ fontSize: 13, fontWeight: 700 }}>Registered Fairs</h2>
              <button className="btn btn-ghost btn-sm" onClick={() => onNav('s-fairs')}>View All</button>
            </div>
            {myFairs.length === 0
              ? <EmptyState icon="🎪" text="No fairs registered yet" />
              : myFairs.slice(0, 3).map(f => (
                <div key={f.id} style={{ padding: '10px 0', borderBottom: '1px solid var(--b1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{f.banner} {f.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--t2)', marginTop: 2 }}>📅 {f.date}</div>
                  </div>
                  <Badge variant={f.status === 'upcoming' ? 'cyan' : 'gray'}>{f.status}</Badge>
                </div>
              ))
            }
          </div>

          {/* Recent Applications */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h2 style={{ fontSize: 13, fontWeight: 700 }}>Recent Applications</h2>
              <button className="btn btn-ghost btn-sm" onClick={() => onNav('s-resume')}>View All</button>
            </div>
            {recentApps.length === 0
              ? <EmptyState icon="📄" text="No applications yet" />
              : recentApps.map((r, i) => (
                <div key={i} style={{ padding: '9px 0', borderBottom: '1px solid var(--b1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{r.coName}</div>
                    <div style={{ fontSize: 12, color: 'var(--t2)' }}>{r.role}</div>
                  </div>
                  <Badge variant={r.status === 'Shortlisted' ? 'green' : r.status === 'Rejected' ? 'red' : 'gold'}>{r.status}</Badge>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

import { useDB }   from '../../context/DBContext';
import StatCard     from '../../components/shared/StatCard';

const QA = [
  { icon: '🎪', title: 'Manage Career Fairs',  sub: 'Create and edit all career events',  sec: 'a-fairs', c: '0,245,255'  },
  { icon: '🏢', title: 'Manage Companies',      sub: 'Add and configure company booths',   sec: 'a-cos',   c: '124,58,237' },
  { icon: '📋', title: 'View Registrations',    sub: 'See all student fair registrations', sec: 'a-regs',  c: '0,255,136'  },
  { icon: '📄', title: 'Review Resumes',        sub: 'Browse all submitted applications',  sec: 'a-ress',  c: '255,215,0'  },
];

export default function AHome({ onNav }) {
  const { fairs, companies, students, chats } = useDB();
  const totalRegs    = students.reduce((s, u) => s + u.registeredFairs.length, 0);
  const totalResumes = students.reduce((s, u) => s + u.resumes.length, 0);
  const totalMsgs    = Object.values(chats).reduce((s, m) => s + m.length, 0);

  return (
    <div className="sec-anim">
      <div className="mb-6">
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: 'var(--t3)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>ADMIN OVERVIEW</div>
        <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 4 }}>Control Panel 👑</h1>
        <p style={{ color: 'var(--t2)', fontSize: 13 }}>Manage your virtual career fair platform</p>
      </div>

      <div className="grid-4 mb-6">
        <StatCard icon="🎪" value={fairs.length}     label="Total Fairs"   color="var(--c1)"  borderColor="rgba(0,245,255,.18)"  />
        <StatCard icon="🏢" value={companies.length} label="Companies"     color="#a78bfa"    borderColor="rgba(124,58,237,.18)" />
        <StatCard icon="🎓" value={students.length}  label="Students"      color="var(--c4)"  borderColor="rgba(0,255,136,.18)"  />
        <StatCard icon="📋" value={totalRegs}        label="Registrations" color="var(--gold)" borderColor="rgba(255,215,0,.18)"  />
      </div>

      <div className="grid-4 mb-6">
        <StatCard icon="📄" value={totalResumes}  label="Resumes"         color="var(--c3)"  borderColor="rgba(255,0,110,.18)"  />
        <StatCard icon="💬" value={totalMsgs}     label="Chat Messages"   color="var(--c1)"  borderColor="rgba(0,245,255,.18)"  />
        <StatCard icon="✅" value={fairs.filter(f => f.status === 'upcoming').length} label="Upcoming Fairs" color="var(--c4)" borderColor="rgba(0,255,136,.18)" />
        <StatCard icon="🔥" value={students.filter(s => s.resumes.length > 0).length} label="Active Applicants" color="var(--ora)" borderColor="rgba(255,107,53,.18)" />
      </div>

      <div className="grid-2">
        {QA.map((qa, i) => (
          <div key={i} onClick={() => onNav(qa.sec)} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 14, borderRadius: 13, background: 'var(--s1)', border: '1px solid var(--b1)', cursor: 'pointer', transition: 'all .2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,215,0,.22)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.transform = ''; }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, background: `rgba(${qa.c},.1)`, border: `1px solid rgba(${qa.c},.18)`, flexShrink: 0 }}>{qa.icon}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{qa.title}</div>
              <div style={{ fontSize: 12, color: 'var(--t2)', marginTop: 2 }}>{qa.sub}</div>
            </div>
            <span style={{ marginLeft: 'auto', color: 'var(--t3)', fontSize: 13 }}>→</span>
          </div>
        ))}
      </div>
    </div>
  );
}

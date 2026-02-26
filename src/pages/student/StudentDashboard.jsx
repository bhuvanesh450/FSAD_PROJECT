import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDB }   from '../../context/DBContext';
import Topnav      from '../../components/shared/Topnav';
import Ticker      from '../../components/shared/Ticker';
import SDashHome   from './SDashHome';
import SFairs      from './SFairs';
import SBooths     from './SBooths';
import SResume     from './SResume';
import SChat       from './SChat';
import SProfile    from './SProfile';

const NAV = [
  { id: 's-home',    icon: '⊞', label: 'Dashboard',      group: 'Overview'     },
  { id: 's-fairs',   icon: '🎪', label: 'Career Fairs',   group: 'Explore'      },
  { id: 's-booths',  icon: '🏢', label: 'Company Booths', group: 'Explore'      },
  { id: 's-resume',  icon: '📄', label: 'Submit Resume',  group: 'My Activity'  },
  { id: 's-chat',    icon: '💬', label: 'Live Chat',      group: 'My Activity'  },
  { id: 's-profile', icon: '👤', label: 'My Profile',     group: 'My Activity'  },
];

const SECTION_MAP = {
  's-home':    SDashHome,
  's-fairs':   SFairs,
  's-booths':  SBooths,
  's-resume':  SResume,
  's-chat':    SChat,
  's-profile': SProfile,
};

const GROUPS = [...new Set(NAV.map(n => n.group))];

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { currentUser, logout } = useDB();
  const [active, setActive] = useState('s-home');

  if (!currentUser) { navigate('/'); return null; }

  const u   = currentUser;
  const ini = u.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const ActiveSection = SECTION_MAP[active] || SDashHome;

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Topnav onBrandClick={() => navigate('/')}>
        <div className="nav-chip chip-s">🎓 {u.name.split(' ')[0]}</div>
        <button className="btn btn-ghost btn-sm" onClick={handleLogout}>Logout →</button>
      </Topnav>

      <Ticker />

      <div className="dash-layout">
        {/* ── Sidebar ── */}
        <aside className="sidebar">
          <div className="sb-head">
            <div className="flex items-center gap-3">
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg,var(--c1),var(--c2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13, color: '#000', boxShadow: '0 0 14px rgba(0,245,255,.35)', flexShrink: 0 }}>{ini}</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 13 }}>{u.name}</div>
                <div style={{ fontSize: 11, color: 'var(--c1)' }}>🎓 Student</div>
              </div>
            </div>
          </div>

          {GROUPS.map(group => (
            <div key={group}>
              <div className="sb-section">{group}</div>
              {NAV.filter(n => n.group === group).map(item => (
                <div key={item.id} className={`sb-item${active === item.id ? ' act-s' : ''}`} onClick={() => setActive(item.id)}>
                  <div className="sb-ico">{item.icon}</div>
                  {item.label}
                </div>
              ))}
            </div>
          ))}

          <div className="sb-footer">CareerBridge v3.0</div>
        </aside>

        {/* ── Content ── */}
        <main className="content">
          <ActiveSection onNav={setActive} />
        </main>
      </div>
    </div>
  );
}

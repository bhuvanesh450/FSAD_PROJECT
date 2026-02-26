import { useState }   from 'react';
import { useNavigate } from 'react-router-dom';
import { useDB }       from '../../context/DBContext';
import Topnav          from '../../components/shared/Topnav';
import AHome           from './AHome';
import AFairs          from './AFairs';
import ACompanies      from './ACompanies';
import ARegistrations  from './ARegistrations';
import AResumes        from './AResumes';
import AChatMonitor    from './AChatMonitor';

const NAV = [
  { id: 'a-home',  icon: '⊞', label: 'Dashboard',     group: 'Overview'    },
  { id: 'a-fairs', icon: '🎪', label: 'Career Fairs',  group: 'Management'  },
  { id: 'a-cos',   icon: '🏢', label: 'Companies',     group: 'Management'  },
  { id: 'a-regs',  icon: '📋', label: 'Registrations', group: 'Data'        },
  { id: 'a-ress',  icon: '📄', label: 'Resumes',       group: 'Data'        },
  { id: 'a-chat',  icon: '💬', label: 'Chat Monitor',  group: 'Data'        },
];

const SECTION_MAP = {
  'a-home':  AHome,
  'a-fairs': AFairs,
  'a-cos':   ACompanies,
  'a-regs':  ARegistrations,
  'a-ress':  AResumes,
  'a-chat':  AChatMonitor,
};

const GROUPS = [...new Set(NAV.map(n => n.group))];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { currentUser, logout } = useDB();
  const [active, setActive] = useState('a-home');

  if (!currentUser) { navigate('/'); return null; }

  const ActiveSection = SECTION_MAP[active] || AHome;

  return (
    <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Topnav onBrandClick={() => navigate('/')}>
        <div className="nav-chip chip-a">👑 Admin</div>
        <button className="btn btn-ghost btn-sm" onClick={() => { logout(); navigate('/'); }}>Logout →</button>
      </Topnav>

      <div className="dash-layout">
        {/* ── Sidebar ── */}
        <aside className="sidebar">
          <div className="sb-head">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg,var(--gold),var(--ora))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13, color: '#000', boxShadow: '0 0 14px rgba(255,215,0,.4)', flexShrink: 0 }}>AD</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 13 }}>Admin</div>
                <div style={{ fontSize: 11, color: 'var(--gold)' }}>👑 Administrator</div>
              </div>
            </div>
          </div>

          {GROUPS.map(group => (
            <div key={group}>
              <div className="sb-section">{group}</div>
              {NAV.filter(n => n.group === group).map(item => (
                <div key={item.id} className={`sb-item${active === item.id ? ' act-a' : ''}`} onClick={() => setActive(item.id)}>
                  <div className="sb-ico">{item.icon}</div>
                  {item.label}
                </div>
              ))}
            </div>
          ))}

          <div className="sb-footer">CareerBridge Admin v3.0</div>
        </aside>

        {/* ── Content ── */}
        <main className="content">
          <ActiveSection onNav={setActive} />
        </main>
      </div>
    </div>
  );
}

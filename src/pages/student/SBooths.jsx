import { useState }   from 'react';
import { useDB }       from '../../context/DBContext';
import Badge           from '../../components/shared/Badge';
import EmptyState      from '../../components/shared/EmptyState';
import ChatPopup       from '../../components/student/ChatPopup';
import ApplyModal      from '../../components/student/ApplyModal';

export default function SBooths() {
  const { companies, currentUser } = useDB();
  const [chatCoId,  setChatCoId]  = useState(null);
  const [applyCoId, setApplyCoId] = useState(null);
  const u = currentUser;

  if (companies.length === 0) return <EmptyState icon="🏢" text="No company booths yet. Check back soon!" />;

  return (
    <div className="sec-anim">
      <div className="mb-6">
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 4 }}>Company Booths</h1>
        <p style={{ color: 'var(--t2)', fontSize: 13 }}>Explore companies, view open roles, and connect with recruiters</p>
      </div>

      <div className="grid-auto">
        {companies.map(co => {
          const applied = u?.resumes?.some(r => r.coId === co.id);
          return (
            <div key={co.id} className="card card-hover" style={{ position: 'relative', overflow: 'hidden', borderColor: applied ? 'rgba(0,255,136,.25)' : 'var(--b1)' }}>
              {/* Top color bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${co.color},transparent)` }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ width: 52, height: 52, borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, background: `${co.color}18`, border: `1px solid ${co.color}30`, color: co.color, boxShadow: `0 0 18px ${co.color}22` }}>{co.logo}</div>
                {applied && <Badge variant="green">✓ Applied</Badge>}
              </div>

              <h3 style={{ fontSize: 15, fontWeight: 900, marginBottom: 2 }}>{co.name}</h3>
              <div style={{ fontSize: 12, fontWeight: 700, color: co.color, marginBottom: 10 }}>{co.industry}</div>
              <p style={{ fontSize: 12, color: 'var(--t2)', lineHeight: 1.55, marginBottom: 14, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{co.desc}</p>

              {/* Role tags */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                {(co.roles || []).slice(0, 2).map(r => (
                  <span key={r} style={{ fontSize: 10, fontWeight: 700, background: `${co.color}12`, color: co.color, border: `1px solid ${co.color}22`, padding: '2px 8px', borderRadius: 5, fontFamily: 'JetBrains Mono' }}>{r}</span>
                ))}
                {co.roles?.length > 2 && <span style={{ fontSize: 12, color: 'var(--t3)', padding: '2px 6px' }}>+{co.roles.length - 2}</span>}
              </div>

              {/* Action buttons */}
              <div style={{ borderTop: '1px solid var(--b1)', paddingTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <button className="btn btn-primary btn-sm btn-fw" onClick={() => setApplyCoId(co.id)}>Apply Now</button>
                <button className="btn btn-ghost btn-sm btn-fw"   onClick={() => setChatCoId(co.id)}>💬 Chat</button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 11, color: 'var(--t3)' }}>
                <span>📍 {co.location || '—'}</span>
                <span>👥 {co.size || '—'}</span>
              </div>
            </div>
          );
        })}
      </div>

      {chatCoId  && <ChatPopup  coId={chatCoId}  onClose={() => setChatCoId(null)}  />}
      {applyCoId && <ApplyModal coId={applyCoId} onClose={() => setApplyCoId(null)} />}
    </div>
  );
}

import { useState }  from 'react';
import { useDB }      from '../../context/DBContext';
import StatCard       from '../../components/shared/StatCard';
import EmptyState     from '../../components/shared/EmptyState';

export default function AChatMonitor() {
  const { companies, chats } = useDB();
  const [selId, setSelId] = useState(null);

  const totalMsgs = Object.values(chats).reduce((s, m) => s + m.length, 0);
  const selCo     = companies.find(c => c.id === selId);
  const selMsgs   = selId ? (chats[selId] || []) : [];

  return (
    <div className="sec-anim">
      <div className="mb-6">
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 4 }}>Chat Monitor</h1>
        <p style={{ color: 'var(--t2)', fontSize: 13 }}>Real-time monitoring of all booth conversations</p>
      </div>

      <div className="grid-4 mb-6">
        <StatCard icon="💬" value={totalMsgs}    label="Total Messages" color="var(--c1)"  borderColor="rgba(0,245,255,.18)"  />
        <StatCard icon="🏢" value={companies.length} label="Active Booths" color="#a78bfa" borderColor="rgba(124,58,237,.18)" />
        <StatCard icon="🔄" value={Object.keys(chats).filter(k => (chats[k] || []).length > 0).length} label="Live Convos" color="var(--c4)" borderColor="rgba(0,255,136,.18)" />
        <StatCard icon="📊" value={companies.length ? (totalMsgs / companies.length).toFixed(1) : '0'} label="Avg / Booth" color="var(--gold)" borderColor="rgba(255,215,0,.18)" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 20, alignItems: 'start' }}>
        {/* Company list */}
        <div style={{ background: 'var(--s1)', border: '1px solid var(--b1)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--b1)', fontFamily: 'JetBrains Mono', fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--t3)' }}>BOOTHS</div>
          {companies.length === 0
            ? <EmptyState icon="🏢" text="No companies" />
            : companies.map(co => {
              const cnt   = (chats[co.id] || []).length;
              const isSel = selId === co.id;
              return (
                <div key={co.id} onClick={() => setSelId(co.id)} style={{ padding: '12px 16px', cursor: 'pointer', borderLeft: `3px solid ${isSel ? co.color : 'transparent'}`, background: isSel ? `${co.color}0a` : '', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all .15s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 18, color: co.color }}>{co.logo}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: isSel ? co.color : 'var(--t1)' }}>{co.name.split(' ')[0]}</div>
                      <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: 'var(--t3)' }}>{co.industry.slice(0, 14)}</div>
                    </div>
                  </div>
                  <span style={{ background: `${co.color}18`, color: co.color, fontSize: 10, fontWeight: 900, padding: '2px 7px', borderRadius: 7, fontFamily: 'JetBrains Mono' }}>{cnt}</span>
                </div>
              );
            })
          }
        </div>

        {/* Message feed */}
        <div style={{ background: 'var(--s1)', border: '1px solid var(--b1)', borderRadius: 16, overflow: 'hidden', minHeight: 300 }}>
          {!selCo
            ? <EmptyState icon="💬" text="Select a company booth to monitor" />
            : (
              <>
                <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--b1)', display: 'flex', alignItems: 'center', gap: 12, background: `linear-gradient(90deg,${selCo.color}08,transparent)` }}>
                  <div style={{ width: 40, height: 40, borderRadius: 11, background: `${selCo.color}18`, border: `1px solid ${selCo.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: selCo.color }}>{selCo.logo}</div>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: 14 }}>{selCo.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--t2)' }}>{selMsgs.length} total messages</div>
                  </div>
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--c4)' }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--c4)', animation: 'pulse 1.2s ease infinite' }} /> Live Monitor
                  </div>
                </div>
                <div style={{ padding: 16, maxHeight: 400, overflowY: 'auto' }}>
                  {selMsgs.length === 0
                    ? <EmptyState icon="💬" text="No messages yet" />
                    : selMsgs.map(m => (
                      <div key={m.id} style={{ padding: '10px 14px', borderLeft: `3px solid ${m.isRep ? selCo.color : 'var(--c4)'}`, borderRadius: '0 10px 10px 0', background: 'var(--s2)', marginBottom: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, fontWeight: 700, color: m.isRep ? selCo.color : 'var(--c4)' }}>{m.isRep ? `${selCo.logo} ${m.sender}` : `👤 ${m.sender}`}</span>
                          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: 'var(--t3)' }}>{m.time}</span>
                        </div>
                        <div style={{ fontSize: 13, lineHeight: 1.6 }}>{m.text}</div>
                      </div>
                    ))
                  }
                </div>
              </>
            )
          }
        </div>
      </div>
    </div>
  );
}

import { useState }  from 'react';
import { useDB }      from '../../context/DBContext';
import EmptyState     from '../../components/shared/EmptyState';
import ChatPopup      from '../../components/student/ChatPopup';

export default function SChat() {
  const { companies } = useDB();
  const [chatCoId, setChatCoId] = useState(null);

  return (
    <div className="sec-anim">
      <div className="mb-6">
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 4 }}>Live Chat</h1>
        <p style={{ color: 'var(--t2)', fontSize: 13 }}>Connect directly with company recruiters in real-time</p>
      </div>

      {companies.length === 0
        ? <EmptyState icon="💬" text="No companies available to chat with yet" />
        : (
          <div className="grid-auto">
            {companies.map(co => (
              <div key={co.id} className="card card-hover" style={{ cursor: 'pointer' }} onClick={() => setChatCoId(co.id)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, background: `${co.color}18`, border: `1px solid ${co.color}30`, color: co.color }}>{co.logo}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 13 }}>{co.name}</div>
                    <div style={{ fontSize: 12, color: co.color }}>{co.industry}</div>
                  </div>
                </div>
                <button className="btn btn-primary btn-sm btn-fw">💬 Start Chat</button>
              </div>
            ))}
          </div>
        )
      }

      {chatCoId && <ChatPopup coId={chatCoId} onClose={() => setChatCoId(null)} />}
    </div>
  );
}

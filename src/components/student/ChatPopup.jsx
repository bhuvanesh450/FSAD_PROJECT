import { useState, useEffect, useRef } from 'react';
import { useDB, uid, now } from '../../context/DBContext';

export default function ChatPopup({ coId, onClose }) {
  const { companies, chats, currentUser, addChatMsg, getOrCreateRep, sendAutoReply } = useDB();
  const [input,  setInput]  = useState('');
  const [typing, setTyping] = useState(false);
  const msgsRef = useRef(null);

  const co   = companies.find(c => c.id === coId);
  const msgs = chats[coId] || [];
  const rep  = getOrCreateRep(coId);
  const ini  = currentUser?.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';

  // Send welcome message once
  useEffect(() => {
    if (!co || (chats[coId] || []).length > 0) return;
    addChatMsg(coId, { id: uid(), sender: rep, text: `Welcome to ${co.name}! 👋 I'm ${rep}, your recruiter. Ask me anything — roles, culture, interview process… I'm here to help! 🚀`, time: now(), isRep: true });
  }, [coId]);

  // Auto-scroll
  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [msgs, typing]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    addChatMsg(coId, { id: uid(), sender: currentUser.name, text, time: now(), isRep: false });
    setInput('');
    setTyping(true);
    setTimeout(() => { setTyping(false); sendAutoReply(coId, rep); }, 1400 + Math.random() * 600);
  };

  if (!co) return null;

  return (
    <div className="overlay open" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ width: 380, height: 520, background: 'var(--s1)', border: '1px solid var(--b2)', borderRadius: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column', animation: 'chatIn .3s ease', boxShadow: '0 20px 60px rgba(0,0,0,.7)' }}>

        {/* Header */}
        <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0, background: `linear-gradient(90deg,${co.color}10,transparent),var(--s1)`, borderBottom: `1px solid ${co.color}25` }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, background: `${co.color}20`, border: `1px solid ${co.color}35`, color: co.color }}>{co.logo}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 14 }}>{co.name}</div>
            <div style={{ fontSize: 11, color: 'var(--t2)' }}>{rep} · Recruiter</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--c4)' }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--c4)', animation: 'pulse 1.2s ease infinite' }} /> Live
          </div>
          <button className="btn btn-ghost btn-icon btn-sm" onClick={onClose}>✕</button>
        </div>

        {/* Messages */}
        <div ref={msgsRef} style={{ flex: 1, overflowY: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 14, background: 'var(--bg2)' }}>
          {msgs.map(m => {
            const isMe = !m.isRep;
            return (
              <div key={m.id} style={{ display: 'flex', gap: 10, flexDirection: isMe ? 'row-reverse' : 'row', alignItems: 'flex-end' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: isMe ? 11 : 15, fontWeight: 900, ...(isMe ? { background: 'linear-gradient(135deg,var(--c1),var(--c2))', color: '#000' } : { background: `${co.color}18`, border: `1px solid ${co.color}30`, color: co.color }) }}>
                  {isMe ? ini : co.logo}
                </div>
                <div style={{ maxWidth: '70%' }}>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: 'var(--t3)', marginBottom: 4, textAlign: isMe ? 'right' : 'left' }}>{m.sender} · {m.time}</div>
                  <div style={{ padding: '10px 14px', borderRadius: 14, fontSize: 13, lineHeight: 1.55, ...(isMe ? { background: 'linear-gradient(135deg,var(--c1),var(--c2))', color: '#000', fontWeight: 600, borderBottomRightRadius: 4 } : { background: 'var(--s3)', border: '1px solid var(--b1)', borderBottomLeftRadius: 4 }) }}>{m.text}</div>
                </div>
              </div>
            );
          })}
          {typing && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 42 }}>
              {[0, .2, .4].map(d => <div key={d} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--t3)', animation: `pulse 1s ${d}s ease infinite` }} />)}
              <span style={{ fontSize: 12, color: 'var(--t3)', marginLeft: 4 }}>{rep} is typing…</span>
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{ padding: '12px 14px', borderTop: '1px solid var(--b1)', display: 'flex', gap: 8, flexShrink: 0 }}>
          <div style={{ flex: 1, background: 'var(--s2)', border: '1px solid var(--b1)', borderRadius: 10, display: 'flex', alignItems: 'center', padding: '0 12px' }}>
            <input style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--t1)', fontFamily: 'Syne', fontSize: 13, width: '100%', padding: '10px 0' }} placeholder="Type a message…" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} />
          </div>
          <button className="btn btn-primary btn-icon" onClick={send}>→</button>
        </div>
      </div>
    </div>
  );
}

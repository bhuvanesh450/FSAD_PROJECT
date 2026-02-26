import { useState }  from 'react';
import { useDB }      from '../../context/DBContext';
import { useToast }   from '../../context/ToastContext';

export default function SProfile() {
  const { currentUser, updateStudent, setCurrentUser } = useDB();
  const toast = useToast();
  const u = currentUser;

  const [form, setForm] = useState({ name: u?.name || '', university: u?.university || '', major: u?.major || '' });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const save = () => {
    updateStudent(u.id, form);
    setCurrentUser(p => ({ ...p, ...form }));
    toast('✅ Profile updated!', 's');
  };

  if (!u) return null;
  const ini = u.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  const stats = [
    { label: 'Fairs Registered',        val: u.registeredFairs.length,                              color: 'var(--c1)'  },
    { label: 'Resumes Submitted',        val: u.resumes.length,                                      color: '#a78bfa'    },
    { label: 'Applications Under Review',val: u.resumes.filter(r => r.status === 'Under Review').length, color: 'var(--gold)' },
    { label: 'Shortlisted',             val: u.resumes.filter(r => r.status === 'Shortlisted').length,  color: 'var(--c4)'  },
  ];

  return (
    <div className="sec-anim">
      <div className="mb-6">
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 4 }}>My Profile</h1>
        <p style={{ color: 'var(--t2)', fontSize: 13 }}>Manage your account information</p>
      </div>

      <div className="grid-2">
        {/* Edit form */}
        <div className="card">
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg,var(--c1),var(--c2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 24, color: '#000', margin: '0 auto 12px', boxShadow: '0 0 20px rgba(0,245,255,.4)' }}>{ini}</div>
            <div style={{ fontWeight: 900, fontSize: 18 }}>{u.name}</div>
            <div style={{ fontSize: 12, color: 'var(--c1)' }}>🎓 Student</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="fg"><label className="lbl">Full Name</label><input className="inp" value={form.name}       onChange={e => set('name', e.target.value)} /></div>
            <div className="fg"><label className="lbl">Email</label><input className="inp" value={u.email} disabled style={{ opacity: .6 }} /></div>
            <div className="fg"><label className="lbl">University</label><input className="inp" value={form.university} onChange={e => set('university', e.target.value)} /></div>
            <div className="fg"><label className="lbl">Major</label><input className="inp" value={form.major}      onChange={e => set('major', e.target.value)} /></div>
            <button className="btn btn-primary btn-fw" onClick={save}>Save Changes</button>
          </div>
        </div>

        {/* Stats summary */}
        <div className="card">
          <h2 style={{ fontSize: 13, fontWeight: 700, marginBottom: 14 }}>Activity Summary</h2>
          {stats.map((s, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--b1)' }}>
              <span style={{ fontSize: 13, color: 'var(--t2)' }}>{s.label}</span>
              <span style={{ fontWeight: 900, fontSize: 14, color: s.color }}>{s.val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

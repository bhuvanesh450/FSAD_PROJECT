import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDB, uid } from '../../context/DBContext';
import { useToast } from '../../context/ToastContext';

export default function AuthPage() {
  const { role } = useParams();      // 'student' | 'admin'
  const navigate  = useNavigate();
  const { students, login, addStudent } = useDB();
  const toast     = useToast();
  const isAdmin   = role === 'admin';

  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name:'', email:'', pass:'', conf:'', uni:'', major:'' });
  const [err,  setErr]  = useState('');
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const submit = () => {
    setErr('');
    if (!form.email || !form.pass)  return setErr('⚠ Email and password are required.');
    if (form.pass.length < 6)       return setErr('⚠ Password must be at least 6 characters.');

    // Admin login
    if (isAdmin) {
      if (form.email === 'admin@careerfair.com' && form.pass === 'admin123') {
        login({ id: 0, name: 'Admin', email: form.email }, 'admin');
        toast('👑 Welcome back, Admin!', 'i');
        navigate('/admin');
      } else setErr('⚠ Invalid admin credentials.');
      return;
    }

    // Student login
    if (mode === 'login') {
      const u = students.find(s => s.email === form.email && s.pass === form.pass);
      if (!u) return setErr('⚠ Invalid email or password.');
      login(u, 'student');
      toast(`✅ Welcome back, ${u.name.split(' ')[0]}!`, 's');
      navigate('/student');
      return;
    }

    // Register
    if (!form.name)                           return setErr('⚠ Full name is required.');
    if (!form.email.includes('@'))             return setErr('⚠ Enter a valid email.');
    if (form.pass !== form.conf)              return setErr('⚠ Passwords do not match.');
    if (students.find(s => s.email === form.email)) return setErr('⚠ Email already registered.');

    const u = { id: uid(), name: form.name, email: form.email, pass: form.pass, university: form.uni || '—', major: form.major || '—', registeredFairs: [], resumes: [] };
    addStudent(u);
    login(u, 'student');
    toast(`🎉 Welcome, ${form.name.split(' ')[0]}!`, 's');
    navigate('/student');
  };

  const isReg = !isAdmin && mode === 'register';

  return (
    <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* simple nav */}
      <nav className="topnav">
        <div className="brand" onClick={() => navigate('/')}>
          <div className="brand-gem">CB</div>
          <span className="brand-name">CareerBridge</span>
        </div>
      </nav>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* LEFT panel */}
        <div style={{ width: 420, background: 'var(--s1)', borderRight: '1px solid var(--b1)', display: 'flex', flexDirection: 'column', padding: 40, flexShrink: 0 }}>
          <div style={{ marginBottom: 32 }}>
            <div className="brand-gem" style={{ marginBottom: 12 }}>CB</div>
            <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 28, letterSpacing: 2, marginBottom: 8 }}>
              {isAdmin ? 'Admin Control Panel' : 'Your Gateway to Opportunity'}
            </h2>
            <p style={{ fontSize: 13, color: 'var(--t2)', lineHeight: 1.65 }}>
              {isAdmin ? 'Manage fairs, companies and monitor all platform activity.' : 'Connect with top employers and discover your next career move.'}
            </p>
          </div>
          {[
            isAdmin ? '🎪 Manage Career Fairs'   : '🎪 Browse Career Fairs',
            isAdmin ? '🏢 Control Company Booths' : '🏢 Visit Company Booths',
            isAdmin ? '💬 Monitor Live Chats'     : '💬 Chat with Recruiters',
            isAdmin ? '📄 Review Resumes'          : '📄 Submit Your Resume',
          ].map((txt, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, marginBottom: 14 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(0,245,255,.08)', border: '1px solid rgba(0,245,255,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{txt.slice(0,2)}</div>
              <span style={{ color: 'var(--t2)' }}>{txt.slice(2)}</span>
            </div>
          ))}
          <div style={{ marginTop: 'auto', fontFamily: 'JetBrains Mono', fontSize: 12, color: 'var(--t3)' }}>© 2025 CareerBridge</div>
        </div>

        {/* RIGHT form */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 60px', maxWidth: 520 }}>
          <button className="btn btn-ghost btn-sm" style={{ alignSelf: 'flex-start', marginBottom: 24 }} onClick={() => navigate('/')}>← Back</button>
          <div style={{ fontSize: 42, marginBottom: 10 }}>{isAdmin ? '👑' : '👋'}</div>
          <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 4 }}>{isAdmin ? 'Admin Login' : mode === 'login' ? 'Welcome Back' : 'Create Account'}</h1>
          <p style={{ fontSize: 13, color: 'var(--t2)', marginBottom: 24 }}>{isAdmin ? 'Access the admin control panel' : 'Sign in or create your student account'}</p>

          {/* Tabs (students only) */}
          {!isAdmin && (
            <div style={{ display: 'flex', background: 'var(--s2)', borderRadius: 10, padding: 3, marginBottom: 20, border: '1px solid var(--b1)', width: 'fit-content' }}>
              {['login','register'].map(m => (
                <div key={m} style={{ padding: '8px 20px', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: 13, color: mode === m ? 'var(--c1)' : 'var(--t2)', background: mode === m ? 'var(--s3)' : 'transparent', transition: 'all .2s' }} onClick={() => { setMode(m); setErr(''); }}>
                  {m === 'login' ? 'Login' : 'Register'}
                </div>
              ))}
            </div>
          )}

          {err && <div style={{ background: 'rgba(255,0,110,.1)', border: '1px solid rgba(255,0,110,.3)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: 'var(--c3)', marginBottom: 14 }}>{err}</div>}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {isReg && <div className="fg"><label className="lbl">Full Name</label><input className="inp" placeholder="Jane Doe" value={form.name} onChange={e => set('name', e.target.value)} /></div>}
            {isReg && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="fg"><label className="lbl">University</label><input className="inp" placeholder="MIT" value={form.uni} onChange={e => set('uni', e.target.value)} /></div>
                <div className="fg"><label className="lbl">Major</label><input className="inp" placeholder="CS" value={form.major} onChange={e => set('major', e.target.value)} /></div>
              </div>
            )}
            <div className="fg"><label className="lbl">Email</label><input className="inp" type="email" placeholder={isAdmin ? 'admin@careerfair.com' : 'you@university.edu'} value={form.email} onChange={e => set('email', e.target.value)} /></div>
            <div className="fg"><label className="lbl">Password</label><input className="inp" type="password" placeholder="••••••••" value={form.pass} onChange={e => set('pass', e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()} /></div>
            {isReg && <div className="fg"><label className="lbl">Confirm Password</label><input className="inp" type="password" placeholder="••••••••" value={form.conf} onChange={e => set('conf', e.target.value)} /></div>}

            <div style={{ background: 'rgba(0,245,255,.05)', border: '1px solid rgba(0,245,255,.14)', borderRadius: 10, padding: '11px 14px', fontSize: 12, color: 'var(--c1)', fontFamily: 'JetBrains Mono' }}>
              {isAdmin ? '💡 admin@careerfair.com / admin123' : '💡 alex@student.edu / pass123'}
            </div>

            <button className="btn btn-primary btn-lg btn-fw" onClick={submit}>
              {isAdmin ? 'Login as Admin →' : mode === 'login' ? 'Sign In →' : 'Create Account →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

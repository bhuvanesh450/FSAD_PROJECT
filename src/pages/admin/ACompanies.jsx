import { useState }  from 'react';
import { useDB, uid } from '../../context/DBContext';
import { useToast }   from '../../context/ToastContext';
import Badge          from '../../components/shared/Badge';
import EmptyState     from '../../components/shared/EmptyState';
import Modal          from '../../components/shared/Modal';

const COLORS = ['#00f5ff','#7c3aed','#ff006e','#00ff88','#ffd700','#ff6b35','#06b6d4','#8b5cf6'];
const LOGOS  = ['🤖','⚡','🌱','🔬','🚀','💡','🏗️','🎯','🌐','💎','🔷','🏆'];
const BLANK  = { name:'', logo:'🏢', color:'#00f5ff', industry:'Technology', location:'', size:'100–500', fairId:'', roles:'', desc:'' };

export default function ACompanies() {
  const { companies, fairs, addCompany, updateCompany, deleteCompany } = useDB();
  const toast = useToast();
  const [open,   setOpen]   = useState(false);
  const [editId, setEditId] = useState(null);
  const [form,   setForm]   = useState(BLANK);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const openNew  = ()   => { setEditId(null); setForm(BLANK); setOpen(true); };
  const openEdit = (co) => { setEditId(co.id); setForm({ name: co.name, logo: co.logo, color: co.color, industry: co.industry, location: co.location || '', size: co.size || '', fairId: co.fairId || '', roles: (co.roles || []).join(', '), desc: co.desc || '' }); setOpen(true); };

  const save = () => {
    if (!form.name) return toast('⚠ Company name required', 'e');
    const data = { ...form, fairId: Number(form.fairId) || null, roles: form.roles.split(',').map(r => r.trim()).filter(Boolean) };
    editId ? updateCompany(editId, data) : addCompany({ id: uid(), ...data });
    toast(editId ? '✅ Company updated!' : '✅ Company added!', 's');
    setOpen(false);
  };

  const del = (id) => { if (!confirm('Delete this company?')) return; deleteCompany(id); toast('Company deleted', 'i'); };

  return (
    <div className="sec-anim">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 4 }}>Companies</h1>
          <p style={{ color: 'var(--t2)', fontSize: 13 }}>Manage company booths and recruiter access</p>
        </div>
        <button className="btn btn-primary" onClick={openNew}>+ Add Company</button>
      </div>

      {companies.length === 0
        ? <EmptyState icon="🏢" text="No companies yet. Add your first company!" />
        : (
          <div className="tbl-wrap">
            <table>
              <thead><tr><th>#</th><th>Company</th><th>Industry</th><th>Fair</th><th>Roles</th><th>Location</th><th>Actions</th></tr></thead>
              <tbody>
                {companies.map((co, i) => {
                  const fair = fairs.find(f => f.id === co.fairId);
                  return (
                    <tr key={co.id}>
                      <td style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: 'var(--t3)' }}>{i + 1}</td>
                      <td><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontSize: 18, color: co.color }}>{co.logo}</span><span style={{ fontWeight: 800, fontSize: 13 }}>{co.name}</span></div></td>
                      <td><Badge variant="purp">{co.industry}</Badge></td>
                      <td style={{ fontSize: 12, color: 'var(--t2)' }}>{fair ? `${fair.banner} ${fair.title.split(' ').slice(0,3).join(' ')}` : '—'}</td>
                      <td style={{ fontWeight: 800, color: 'var(--c1)' }}>{co.roles?.length || 0}</td>
                      <td style={{ fontSize: 12, color: 'var(--t2)' }}>📍 {co.location || '—'}</td>
                      <td>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button className="btn btn-ghost btn-sm" onClick={() => openEdit(co)}>✏️</button>
                          <button className="btn btn-danger btn-sm" onClick={() => del(co.id)}>🗑️</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )
      }

      <Modal open={open} title={editId ? 'Edit Company' : 'Add Company'} onClose={() => setOpen(false)} maxWidth={580}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 70px', gap: 10 }}>
            <div className="fg"><label className="lbl">Company Name</label><input className="inp" value={form.name} onChange={e => set('name', e.target.value)} /></div>
            <div className="fg"><label className="lbl">Logo</label><input className="inp" value={form.logo} onChange={e => set('logo', e.target.value)} /></div>
          </div>
          <div className="fg">
            <label className="lbl">Logo Picker</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{LOGOS.map(l => <span key={l} style={{ fontSize: 20, cursor: 'pointer', opacity: form.logo === l ? 1 : .35, transition: 'opacity .15s' }} onClick={() => set('logo', l)}>{l}</span>)}</div>
          </div>
          <div className="fg">
            <label className="lbl">Brand Color</label>
            <div style={{ display: 'flex', gap: 8 }}>{COLORS.map(c => <div key={c} onClick={() => set('color', c)} style={{ width: 26, height: 26, borderRadius: '50%', background: c, cursor: 'pointer', border: `3px solid ${form.color === c ? '#fff' : 'transparent'}` }} />)}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div className="fg"><label className="lbl">Industry</label><input className="inp" value={form.industry} onChange={e => set('industry', e.target.value)} /></div>
            <div className="fg"><label className="lbl">Location</label><input className="inp" value={form.location} onChange={e => set('location', e.target.value)} placeholder="San Francisco, CA" /></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div className="fg">
              <label className="lbl">Assign to Fair</label>
              <select className="inp inp-sel" value={form.fairId} onChange={e => set('fairId', e.target.value)}>
                <option value="">None</option>
                {fairs.map(f => <option key={f.id} value={f.id}>{f.banner} {f.title}</option>)}
              </select>
            </div>
            <div className="fg"><label className="lbl">Company Size</label><input className="inp" value={form.size} onChange={e => set('size', e.target.value)} placeholder="100–500" /></div>
          </div>
          <div className="fg"><label className="lbl">Open Roles (comma-separated)</label><input className="inp" value={form.roles} onChange={e => set('roles', e.target.value)} placeholder="ML Engineer, Backend Dev, PM" /></div>
          <div className="fg"><label className="lbl">Description</label><textarea className="inp inp-ta" value={form.desc} onChange={e => set('desc', e.target.value)} /></div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button className="btn btn-ghost" onClick={() => setOpen(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={save}>{editId ? 'Save Changes' : 'Add Company'}</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

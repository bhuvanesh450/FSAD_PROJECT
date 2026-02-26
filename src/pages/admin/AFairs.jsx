import { useState }  from 'react';
import { useDB, uid } from '../../context/DBContext';
import { useToast }   from '../../context/ToastContext';
import Badge          from '../../components/shared/Badge';
import EmptyState     from '../../components/shared/EmptyState';
import Modal          from '../../components/shared/Modal';

const BLANK = { title: '', banner: '🎪', date: '', time: '', status: 'upcoming', capacity: 300, description: '' };

export default function AFairs() {
  const { fairs, companies, addFair, updateFair, deleteFair } = useDB();
  const toast = useToast();
  const [open,    setOpen]    = useState(false);
  const [editId,  setEditId]  = useState(null);
  const [form,    setForm]    = useState(BLANK);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const openNew  = ()     => { setEditId(null); setForm(BLANK); setOpen(true); };
  const openEdit = (fair) => { setEditId(fair.id); setForm({ title: fair.title, banner: fair.banner || '🎪', date: fair.date, time: fair.time || '', status: fair.status, capacity: fair.capacity, description: fair.description || '' }); setOpen(true); };

  const save = () => {
    if (!form.title || !form.date) return toast('⚠ Title and date are required', 'e');
    editId ? updateFair(editId, form) : addFair({ id: uid(), ...form, regCount: 0 });
    toast(editId ? '✅ Fair updated!' : '✅ Fair created!', 's');
    setOpen(false);
  };

  const del = (id) => {
    if (!confirm('Delete this fair?')) return;
    deleteFair(id); toast('Fair deleted', 'i');
  };

  return (
    <div className="sec-anim">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 4 }}>Career Fairs</h1>
          <p style={{ color: 'var(--t2)', fontSize: 13 }}>Create and manage virtual career events</p>
        </div>
        <button className="btn btn-primary" onClick={openNew}>+ New Fair</button>
      </div>

      {fairs.length === 0
        ? <EmptyState icon="🎪" text="No fairs yet. Create your first career fair!" />
        : (
          <div className="tbl-wrap">
            <table>
              <thead><tr><th>#</th><th>Fair</th><th>Date</th><th>Status</th><th>Registrations</th><th>Companies</th><th>Actions</th></tr></thead>
              <tbody>
                {fairs.map((f, i) => (
                  <tr key={f.id}>
                    <td style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: 'var(--t3)' }}>{i + 1}</td>
                    <td><div style={{ fontWeight: 800, fontSize: 13 }}>{f.banner} {f.title}</div></td>
                    <td style={{ fontSize: 12, color: 'var(--t2)' }}>{f.date}</td>
                    <td><Badge variant={f.status === 'upcoming' ? 'cyan' : f.status === 'completed' ? 'gray' : 'red'}>{f.status}</Badge></td>
                    <td style={{ fontWeight: 800, color: 'var(--c1)' }}>{f.regCount} / {f.capacity}</td>
                    <td style={{ fontWeight: 800, color: '#a78bfa' }}>{companies.filter(c => c.fairId === f.id).length}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn btn-ghost btn-sm" onClick={() => openEdit(f)}>✏️</button>
                        <button className="btn btn-danger btn-sm" onClick={() => del(f.id)}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }

      <Modal open={open} title={editId ? 'Edit Fair' : 'New Career Fair'} onClose={() => setOpen(false)}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: 10 }}>
            <div className="fg"><label className="lbl">Fair Title</label><input className="inp" value={form.title} onChange={e => set('title', e.target.value)} placeholder="Spring Tech Career Fair" /></div>
            <div className="fg"><label className="lbl">Banner</label><input className="inp" value={form.banner} onChange={e => set('banner', e.target.value)} /></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div className="fg"><label className="lbl">Date</label><input className="inp" value={form.date} onChange={e => set('date', e.target.value)} placeholder="April 10, 2025" /></div>
            <div className="fg"><label className="lbl">Time</label><input className="inp" value={form.time} onChange={e => set('time', e.target.value)} placeholder="10:00 AM – 4:00 PM" /></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div className="fg">
              <label className="lbl">Status</label>
              <select className="inp inp-sel" value={form.status} onChange={e => set('status', e.target.value)}>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="fg"><label className="lbl">Capacity</label><input className="inp" type="number" value={form.capacity} onChange={e => set('capacity', Number(e.target.value))} /></div>
          </div>
          <div className="fg"><label className="lbl">Description</label><textarea className="inp inp-ta" value={form.description} onChange={e => set('description', e.target.value)} /></div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button className="btn btn-ghost" onClick={() => setOpen(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={save}>{editId ? 'Save Changes' : 'Create Fair'}</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

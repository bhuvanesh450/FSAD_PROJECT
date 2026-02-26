import { useState, useRef } from 'react';
import { useDB, uid }  from '../../context/DBContext';
import { useToast }    from '../../context/ToastContext';
import Modal           from '../../components/shared/Modal';

export default function ApplyModal({ coId, onClose }) {
  const { companies, currentUser, submitResume } = useDB();
  const toast   = useToast();
  const fileRef = useRef(null);

  const [role,     setRole]     = useState('');
  const [fileName, setFileName] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [dragging, setDragging] = useState(false);

  const co = companies.find(c => c.id === coId);
  if (!co) return null;

  const handleFile = f => {
    if (!f) return;
    setFileName(f.name);
    const rd = new FileReader();
    rd.onload = e => setFileData(e.target.result);
    rd.readAsDataURL(f);
  };

  const submit = () => {
    if (!fileName) return toast('⚠ Please upload your resume first!', 'e');
    submitResume(currentUser.id, {
      coId: co.id, coName: co.name,
      role: role || 'General Application',
      fileName, fileData,
      date: new Date().toLocaleDateString(),
      status: 'Under Review',
    });
    toast(`📤 Applied to ${co.name}!`, 's');
    onClose();
  };

  return (
    <Modal open title={`Apply to ${co.name}`} onClose={onClose}>
      {/* Company info banner */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, padding: 16, background: 'var(--s2)', borderRadius: 14, border: `1px solid ${co.color}20` }}>
        <div style={{ width: 52, height: 52, borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, background: `${co.color}20`, border: `1px solid ${co.color}40`, color: co.color }}>{co.logo}</div>
        <div>
          <div style={{ fontWeight: 900, fontSize: 16 }}>{co.name}</div>
          <div style={{ fontSize: 13, color: 'var(--t2)' }}>{co.industry} · {co.location || ''}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Role selector */}
        <div className="fg">
          <label className="lbl">Select Role</label>
          <select className="inp inp-sel" value={role} onChange={e => setRole(e.target.value)}>
            <option value="">Select a role…</option>
            {(co.roles || []).map(r => <option key={r} value={r}>{r}</option>)}
            <option value="General Application">General Application</option>
          </select>
        </div>

        {/* File drop zone */}
        <div className="fg">
          <label className="lbl">Upload Resume</label>
          <div className={`drop-zone${dragging ? ' drag' : ''}`}
            onClick={() => fileRef.current?.click()}
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
          >
            <div style={{ fontSize: 28, marginBottom: 8 }}>📎</div>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>Drop your resume here</div>
            <div style={{ fontSize: 12, color: 'var(--t3)' }}>PDF, DOC, DOCX — or click to browse</div>
            {fileName && <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: 'var(--c1)', marginTop: 8 }}>✓ {fileName}</div>}
            <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-ghost w-full" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary w-full" onClick={submit}>📤 Submit Application</button>
        </div>
      </div>
    </Modal>
  );
}

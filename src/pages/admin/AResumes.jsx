import { useState }  from 'react';
import { useDB }      from '../../context/DBContext';
import StatCard       from '../../components/shared/StatCard';
import Badge          from '../../components/shared/Badge';
import EmptyState     from '../../components/shared/EmptyState';
import Modal          from '../../components/shared/Modal';

export default function AResumes() {
  const { students, companies } = useDB();
  const [viewRes, setViewRes] = useState(null);
  const all = students.flatMap(s => s.resumes.map(r => ({ stu: s, res: r })));

  return (
    <div className="sec-anim">
      <div className="mb-6">
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 4 }}>Resumes</h1>
        <p style={{ color: 'var(--t2)', fontSize: 13 }}>All submitted student applications</p>
      </div>

      <div className="grid-3 mb-6">
        <StatCard icon="📄" value={all.length}                                      label="Total Resumes"  color="var(--c1)"  borderColor="rgba(0,245,255,.18)"  />
        <StatCard icon="🔍" value={all.filter(x => x.res.status === 'Under Review').length} label="Under Review"   color="var(--gold)" borderColor="rgba(255,215,0,.18)"  />
        <StatCard icon="⭐" value={all.filter(x => x.res.status === 'Shortlisted').length}  label="Shortlisted"   color="var(--c4)"  borderColor="rgba(0,255,136,.18)"  />
      </div>

      {all.length === 0
        ? <EmptyState icon="📄" text="No resumes submitted yet." />
        : (
          <div className="tbl-wrap">
            <table>
              <thead><tr><th>#</th><th>Student</th><th>Company</th><th>Role</th><th>File</th><th>Date</th><th>Status</th></tr></thead>
              <tbody>
                {all.map((r, i) => {
                  const ini = r.stu.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
                  const co  = companies.find(c => c.id === r.res.coId);
                  return (
                    <tr key={i}>
                      <td style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: 'var(--t3)' }}>{i + 1}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg,var(--c1),var(--c2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 10, color: '#000', flexShrink: 0 }}>{ini}</div>
                          <div>
                            <div style={{ fontWeight: 800, fontSize: 13 }}>{r.stu.name}</div>
                            <div style={{ fontSize: 12, color: 'var(--t2)' }}>{r.stu.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ color: co?.color }}>{co?.logo || '🏢'}</span>
                          <span style={{ fontWeight: 700, fontSize: 13 }}>{r.res.coName}</span>
                        </div>
                      </td>
                      <td style={{ fontSize: 12, color: 'var(--t2)' }}>{r.res.role}</td>
                      <td>
                        {r.res.fileName
                          ? <button className="btn btn-ghost btn-sm" style={{ fontSize: 11 }} onClick={() => setViewRes(r.res)}>📎 {r.res.fileName.slice(0, 16)}{r.res.fileName.length > 16 ? '…' : ''}</button>
                          : '—'}
                      </td>
                      <td style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: 'var(--t3)' }}>{r.res.date}</td>
                      <td><Badge variant={r.res.status === 'Shortlisted' ? 'green' : r.res.status === 'Rejected' ? 'red' : 'gold'}>{r.res.status}</Badge></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )
      }

      {viewRes && (
        <Modal open title="Resume Preview" onClose={() => setViewRes(null)}>
          <p style={{ fontSize: 13, color: 'var(--t2)', marginBottom: 14 }}>📎 <strong style={{ color: 'var(--c1)' }}>{viewRes.fileName}</strong></p>
          {viewRes.fileData?.startsWith('data:application/pdf')
            ? <iframe src={viewRes.fileData} style={{ width: '100%', height: 400, borderRadius: 10, border: '1px solid var(--b1)' }} />
            : viewRes.fileData
              ? <a href={viewRes.fileData} download={viewRes.fileName} className="btn btn-primary">⬇ Download Resume</a>
              : <p style={{ fontSize: 13, color: 'var(--t2)' }}>File preview unavailable.</p>
          }
        </Modal>
      )}
    </div>
  );
}

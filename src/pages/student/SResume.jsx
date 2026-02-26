import { useState }   from 'react';
import { useDB }       from '../../context/DBContext';
import Badge           from '../../components/shared/Badge';
import EmptyState      from '../../components/shared/EmptyState';
import ApplyModal      from '../../components/student/ApplyModal';

export default function SResume() {
  const { companies, currentUser } = useDB();
  const [applyCoId, setApplyCoId] = useState(null);
  const apps = currentUser?.resumes || [];

  return (
    <div className="sec-anim">
      <div className="mb-6">
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 4 }}>Submit Resume</h1>
        <p style={{ color: 'var(--t2)', fontSize: 13 }}>Apply to companies and track your application status</p>
      </div>

      <div className="grid-2">
        {/* Company list to apply */}
        <div>
          <h2 style={{ fontSize: 13, fontWeight: 700, marginBottom: 14 }}>Apply to a Company</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {companies.map(co => {
              const applied = apps.some(r => r.coId === co.id);
              return (
                <div key={co.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'var(--s1)', border: `1px solid ${applied ? 'rgba(0,255,136,.25)' : 'var(--b1)'}`, borderRadius: 13 }}>
                  <span style={{ fontSize: 22, color: co.color }}>{co.logo}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{co.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--t2)' }}>{co.industry}</div>
                  </div>
                  {applied
                    ? <Badge variant="green">✓ Applied</Badge>
                    : <button className="btn btn-primary btn-sm" onClick={() => setApplyCoId(co.id)}>Apply</button>
                  }
                </div>
              );
            })}
          </div>
        </div>

        {/* My applications */}
        <div>
          <h2 style={{ fontSize: 13, fontWeight: 700, marginBottom: 14 }}>My Applications ({apps.length})</h2>
          {apps.length === 0
            ? <EmptyState icon="📄" text="No applications submitted yet" />
            : (
              <div className="tbl-wrap">
                <table>
                  <thead>
                    <tr><th>Company</th><th>Role</th><th>Date</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {[...apps].reverse().map((r, i) => {
                      const co = companies.find(c => c.id === r.coId);
                      return (
                        <tr key={i}>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <span style={{ color: co?.color }}>{co?.logo}</span>
                              <span style={{ fontWeight: 700, fontSize: 13 }}>{r.coName}</span>
                            </div>
                          </td>
                          <td style={{ fontSize: 12, color: 'var(--t2)' }}>{r.role}</td>
                          <td style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: 'var(--t3)' }}>{r.date}</td>
                          <td><Badge variant={r.status === 'Shortlisted' ? 'green' : r.status === 'Rejected' ? 'red' : 'gold'}>{r.status}</Badge></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )
          }
        </div>
      </div>

      {applyCoId && <ApplyModal coId={applyCoId} onClose={() => setApplyCoId(null)} />}
    </div>
  );
}

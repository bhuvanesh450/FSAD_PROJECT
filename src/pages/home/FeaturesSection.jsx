const FEATURES = [
  { icon: '🎪', title: 'Virtual Career Fairs',   desc: 'Attend immersive online career fairs from anywhere. Browse events and register instantly.' },
  { icon: '🏢', title: 'Company Booths',          desc: 'Explore interactive booths, learn about roles and culture, connect directly with recruiters.' },
  { icon: '💬', title: 'Live Recruiter Chat',     desc: 'Real-time chat with company representatives. Get immediate answers from hiring managers.' },
  { icon: '📄', title: 'Resume Submission',       desc: 'Submit tailored resumes directly to companies and track your application status.' },
  { icon: '📊', title: 'Application Tracking',    desc: 'Monitor all applications in one dashboard and get notified when your status changes.' },
  { icon: '👑', title: 'Admin Control Panel',     desc: 'Manage fairs, companies, registrations, and monitor all platform activity from one place.' },
];

export default function FeaturesSection() {
  return (
    <section style={{ padding: '80px 60px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--t3)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>PLATFORM FEATURES</div>
        <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 48, letterSpacing: 2, marginBottom: 10 }}>Everything You Need</h2>
        <p style={{ color: 'var(--t2)', fontSize: 15, maxWidth: 500, margin: '0 auto' }}>A complete virtual career fair ecosystem built for modern hiring.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, maxWidth: 1100, margin: '0 auto' }}>
        {FEATURES.map((f, i) => (
          <div key={i} className="card" style={{ transition: 'all .25s', cursor: 'default' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,245,255,.2)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.transform = ''; }}
          >
            <div style={{ fontSize: 32, marginBottom: 14 }}>{f.icon}</div>
            <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 8 }}>{f.title}</h3>
            <p style={{ fontSize: 13, color: 'var(--t2)', lineHeight: 1.65 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

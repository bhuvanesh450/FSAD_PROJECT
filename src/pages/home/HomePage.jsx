import { useNavigate } from 'react-router-dom';
import Topnav       from '../../components/shared/Topnav';
import HeroSection   from './HeroSection';
import StatsStrip    from './StatsStrip';
import FeaturesSection from './FeaturesSection';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Topnav onBrandClick={() => navigate('/')}>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate('/auth/student')}>Student Login</button>
        <button className="btn btn-gold btn-sm"  onClick={() => navigate('/auth/admin')}>👑 Admin</button>
      </Topnav>

      <HeroSection />
      <StatsStrip />
      <FeaturesSection />

      {/* CTA */}
      <section style={{ padding: '80px 60px', textAlign: 'center' }}>
        <div className="card" style={{ maxWidth: 700, margin: '0 auto', background: 'linear-gradient(135deg,rgba(0,245,255,.04),rgba(124,58,237,.04))' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🚀</div>
          <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 52, letterSpacing: 2, marginBottom: 12 }}>Ready to Get Started?</h2>
          <p style={{ color: 'var(--t2)', fontSize: 15, marginBottom: 28, lineHeight: 1.65 }}>
            Join thousands of students who have already found their path through CareerBridge.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/auth/student')}>Create Student Account</button>
            <button className="btn btn-ghost btn-lg"   onClick={() => navigate('/auth/student')}>Sign In →</button>
          </div>
        </div>
      </section>

      <footer style={{ background: 'var(--s1)', borderTop: '1px solid var(--b1)', padding: '24px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="brand"><div className="brand-gem">CB</div><span className="brand-name">CareerBridge</span></div>
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: 'var(--t3)' }}>© 2025 CareerBridge</div>
      </footer>
    </div>
  );
}

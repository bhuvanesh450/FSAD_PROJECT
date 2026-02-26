import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 24px', position: 'relative' }}>
      {/* Floating orbs */}
      {[
        { size: 600, color: 'var(--c1)', top: -100, left: -200, delay: '0s' },
        { size: 500, color: 'var(--c2)', bottom: -100, right: -150, delay: '-10s' },
        { size: 350, color: 'var(--c3)', top: '40%', left: '60%', delay: '-5s' },
      ].map((orb, i) => (
        <div key={i} style={{ position: 'absolute', width: orb.size, height: orb.size, borderRadius: '50%', background: orb.color, opacity: 0.06, pointerEvents: 'none', animation: `orbFloat 25s ease infinite`, animationDelay: orb.delay, top: orb.top, left: orb.left, right: orb.right, bottom: orb.bottom }} />
      ))}

      <div style={{ maxWidth: 800, position: 'relative', zIndex: 2 }}>
        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,245,255,.08)', border: '1px solid rgba(0,245,255,.2)', borderRadius: 30, padding: '8px 18px', marginBottom: 28, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--c1)', fontFamily: 'JetBrains Mono', animation: 'borderGlow 3s ease infinite' }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--c1)', animation: 'pulse 1.4s ease infinite', display: 'inline-block' }} />
          Virtual Career Fair Platform · Season 2025
        </div>

        {/* Heading */}
        <h1 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(64px,10vw,110px)', lineHeight: 0.95, letterSpacing: 2, marginBottom: 20, animation: 'fadeUp .8s ease' }}>
          Your{' '}
          <span style={{ background: 'linear-gradient(135deg,var(--c1),var(--c2),var(--c3))', backgroundSize: '200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'gFlow 4s ease infinite' }}>
            Dream Career
          </span>
          <br />Starts Here
        </h1>

        <p style={{ fontSize: 18, color: 'var(--t2)', lineHeight: 1.65, marginBottom: 36, maxWidth: 560, margin: '0 auto 36px', animation: 'fadeUp .8s .1s both' }}>
          Connect with top employers, attend virtual career fairs, chat with recruiters, and submit your resume — all in one platform.
        </p>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', animation: 'fadeUp .8s .2s both' }}>
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/auth/student')}>🎓 Student Portal →</button>
          <button className="btn btn-gold btn-lg"    onClick={() => navigate('/auth/admin')}>👑 Admin Panel</button>
        </div>
      </div>
    </section>
  );
}

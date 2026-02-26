import { useEffect, useRef } from 'react';

const COLORS = ['0,245,255', '124,58,237', '255,0,110', '0,255,136'];

export default function BackgroundCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let tick = 0, animId;
    const mouse = { x: W / 2, y: H / 2 };

    // Create particles
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 0.4,
      a: Math.random() * 0.6 + 0.1,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
      ph: Math.random() * Math.PI * 2,
    }));

    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    const onMouse  = e => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouse);

    function draw() {
      tick++;
      ctx.clearRect(0, 0, W, H);

      // Gradient BG
      const bg = ctx.createRadialGradient(W*.5, H*.3, 0, W*.5, H*.3, W*.7);
      bg.addColorStop(0, 'rgba(15,10,40,1)');
      bg.addColorStop(1, 'rgba(2,2,9,1)');
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

      // Grid
      ctx.strokeStyle = 'rgba(30,30,74,0.4)'; ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += 80) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
      for (let y = 0; y < H; y += 80) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

      // Particles
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.ph += 0.012;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        const dx = mouse.x - p.x, dy = mouse.y - p.y, d = Math.hypot(dx, dy);
        if (d < 90) { p.x += dx/d*.6; p.y += dy/d*.6; }
        const alpha = p.a * (0.4 + 0.6 * Math.sin(p.ph));
        ctx.fillStyle = `rgba(${p.c},${alpha})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
      });

      // Scan line
      const sy = ((tick * .5) % (H + 40)) - 20;
      const sg = ctx.createLinearGradient(0, sy-10, 0, sy+10);
      sg.addColorStop(0, 'rgba(0,245,255,0)'); sg.addColorStop(.5, 'rgba(0,245,255,0.025)'); sg.addColorStop(1, 'rgba(0,245,255,0)');
      ctx.fillStyle = sg; ctx.fillRect(0, sy-10, W, 20);

      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return <canvas ref={ref} style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none' }} />;
}

'use client';
import { useEffect, useRef } from 'react';

export default function DarkHeroBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let streams = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Medical billing themed terms
    const terms = ['ICD-10', 'CPT', 'HCPCS', 'ERA', 'EDI', 'CAQH', 'HIPAA', 'AAPC', 'REVENUE', 'CLAIMS', 'BILLING', 'MIAMI'];
    const colors = ['rgba(236, 72, 153, 0.15)', 'rgba(59, 130, 246, 0.15)', 'rgba(255, 255, 255, 0.1)'];

    // Floating particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    // Data streams (falling text)
    for (let i = 0; i < 8; i++) {
      streams.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 0.5 + 0.2,
        term: terms[Math.floor(Math.random() * terms.length)],
        opacity: Math.random() * 0.3 + 0.05,
        size: Math.random() * 10 + 8
      });
    }

    const draw = () => {
      // Dark gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a0a0f');
      gradient.addColorStop(0.5, '#0f1729');
      gradient.addColorStop(1, '#1a1033');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw subtle grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw particles
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${p.opacity})`);
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      // Draw data streams
      streams.forEach(s => {
        ctx.font = `${s.size}px monospace`;
        ctx.fillStyle = `rgba(236, 72, 153, ${s.opacity})`;
        ctx.fillText(s.term, s.x, s.y);

        s.y += s.speed;
        if (s.y > canvas.height + 20) {
          s.y = -20;
          s.x = Math.random() * canvas.width;
          s.term = terms[Math.floor(Math.random() * terms.length)];
        }
      });

      // Draw subtle glow spots
      const time = Date.now() * 0.0005;
      const glowX = canvas.width * 0.7 + Math.sin(time) * 100;
      const glowY = canvas.height * 0.3 + Math.cos(time * 0.7) * 50;
      const glow = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, 300);
      glow.addColorStop(0, 'rgba(236, 72, 153, 0.08)');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const glow2X = canvas.width * 0.2 + Math.cos(time * 0.8) * 80;
      const glow2Y = canvas.height * 0.7 + Math.sin(time * 0.6) * 60;
      const glow2 = ctx.createRadialGradient(glow2X, glow2Y, 0, glow2X, glow2Y, 250);
      glow2.addColorStop(0, 'rgba(59, 130, 246, 0.06)');
      glow2.addColorStop(1, 'transparent');
      ctx.fillStyle = glow2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}

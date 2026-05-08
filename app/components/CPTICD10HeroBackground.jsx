'use client';
import { useEffect, useRef } from 'react';

export default function CPTICD10HeroBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let w, h;
    let time = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Real medical codes
    const cptCodes = [
      '99213','99214','99215','99201','99202','99203','99204','99205',
      '36415','81002','93000','71020','80053','80061','84443','85025',
      '99281','99282','99283','99284','99285','99441','99442','99443',
      '92507','97110','97140','97530','98940','98941','99238','99239',
      '12001','12002','12011','20610','20611','96372','96374','96375',
      'G0438','G0439','G0463','G0506','99495','99496','96116','96121',
      '77067','77080','82270','88305','88112','88230','88342','88377',
      'J1100','J1200','J1885','J2250','J2405','J2460','J2785','J2930'
    ];

    const icd10Codes = [
      'Z00.00','E11.9','I10','J06.9','M25.50','F41.1','K21.9','N18.3',
      'E78.5','R50.9','Z51.11','F32.9','G89.4','H66.90','J44.1','L03.90',
      'M79.1','N39.0','R07.9','S72.001A','T14.8','Z23','A59.9','B35.1',
      'C50.911','D64.9','E66.9','F43.10','G47.9','H52.13','I48.91','J18.9',
      'K59.00','L50.9','M54.5','N92.6','O09.90','P07.10','Q90.9','R06.2',
      'S93.401A','T83.9','V89.2','W19.XXXA','X58.XXXA','Y93.01','Z86.73',
      'E11.65','E11.21','E11.22','E11.29','E11.311','E11.319','E11.36',
      'I25.10','I50.9','I48.20','I63.9','J45.909','N17.9','K52.9','M06.9'
    ];

    const modifiers = ['-25','-59','-50','-51','-26','-TC','-LT','-RT','-22','-52','-53','-76','-77','-78','-79','-80','-81','-82'];

    // Streams: each stream is a column of falling codes
    const streams = [];
    const streamCount = Math.floor(window.innerWidth / 90); // one stream per ~90px

    for (let i = 0; i < streamCount; i++) {
      const type = Math.random();
      let codePool, color, fontSize, speed, x, y;

      if (type < 0.45) {
        codePool = cptCodes;
        color = 'rgba(255, 80, 80,'; // red for CPT
        fontSize = Math.random() * 12 + 11;
        speed = Math.random() * 1.2 + 0.6;
      } else if (type < 0.85) {
        codePool = icd10Codes;
        color = 'rgba(80, 180, 255,'; // blue for ICD-10
        fontSize = Math.random() * 11 + 10;
        speed = Math.random() * 1.0 + 0.5;
      } else {
        codePool = modifiers;
        color = 'rgba(255, 200, 80,'; // gold for modifiers
        fontSize = Math.random() * 10 + 9;
        speed = Math.random() * 1.5 + 0.8;
      }

      // Random starting positions
      x = i * 90 + Math.random() * 40;
      y = Math.random() * h * 2 - h; // start above or within screen

      // Some streams go left-right instead of top-bottom
      const direction = Math.random();
      if (direction < 0.15) {
        // Horizontal right
        streams.push({
          x: -100, y: Math.random() * h,
          speedX: speed, speedY: 0,
          fontSize, color, codePool,
          code: codePool[Math.floor(Math.random() * codePool.length)],
          opacity: Math.random() * 0.5 + 0.15,
          direction: 'right'
        });
      } else if (direction < 0.25) {
        // Horizontal left
        streams.push({
          x: w + 100, y: Math.random() * h,
          speedX: -speed, speedY: 0,
          fontSize, color, codePool,
          code: codePool[Math.floor(Math.random() * codePool.length)],
          opacity: Math.random() * 0.5 + 0.15,
          direction: 'left'
        });
      } else {
        // Vertical down (classic rain)
        streams.push({
          x, y,
          speedX: 0, speedY: speed,
          fontSize, color, codePool,
          code: codePool[Math.floor(Math.random() * codePool.length)],
          opacity: Math.random() * 0.5 + 0.15,
          direction: 'down'
        });
      }
    }

    // Additional "crossing" diagonal streams for chaos
    for (let i = 0; i < 15; i++) {
      const codePool = Math.random() < 0.5 ? cptCodes : icd10Codes;
      const color = codePool === cptCodes ? 'rgba(255, 100, 100,' : 'rgba(100, 200, 255,';
      streams.push({
        x: Math.random() * w,
        y: Math.random() * h,
        speedX: (Math.random() - 0.5) * 1.5,
        speedY: (Math.random() - 0.5) * 1.5,
        fontSize: Math.random() * 14 + 12,
        color,
        codePool,
        code: codePool[Math.floor(Math.random() * codePool.length)],
        opacity: Math.random() * 0.6 + 0.2,
        direction: 'diagonal',
        highlight: Math.random() < 0.3 // some are brighter
      });
    }

    const draw = () => {
      // Dark medical background
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, '#030508');
      gradient.addColorStop(0.4, '#070a12');
      gradient.addColorStop(0.7, '#0c1020');
      gradient.addColorStop(1, '#0a0e1a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // Subtle grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 0.5;
      const gridSize = 80;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw all streams
      streams.forEach(s => {
        const alpha = s.highlight ? Math.min(s.opacity + 0.3, 0.9) : s.opacity;
        ctx.font = `${s.highlight ? 'bold ' : ''}${s.fontSize}px 'Courier New', monospace`;
        ctx.fillStyle = `${s.color} ${alpha})`;
        ctx.textAlign = 'left';
        ctx.fillText(s.code, s.x, s.y);

        // Move
        s.x += s.speedX;
        s.y += s.speedY;

        // Wrap / reset
        if (s.direction === 'down') {
          if (s.y > h + 30) {
            s.y = -30;
            s.x = (streams.indexOf(s) % streamCount) * 90 + Math.random() * 40;
            s.code = s.codePool[Math.floor(Math.random() * s.codePool.length)];
            s.opacity = Math.random() * 0.5 + 0.15;
          }
        } else if (s.direction === 'right') {
          if (s.x > w + 100) {
            s.x = -100;
            s.y = Math.random() * h;
            s.code = s.codePool[Math.floor(Math.random() * s.codePool.length)];
          }
        } else if (s.direction === 'left') {
          if (s.x < -100) {
            s.x = w + 100;
            s.y = Math.random() * h;
            s.code = s.codePool[Math.floor(Math.random() * s.codePool.length)];
          }
        } else {
          // diagonal
          if (s.x < -50 || s.x > w + 50 || s.y < -50 || s.y > h + 50) {
            s.x = Math.random() * w;
            s.y = Math.random() * h;
            s.speedX = (Math.random() - 0.5) * 1.5;
            s.speedY = (Math.random() - 0.5) * 1.5;
            s.code = s.codePool[Math.floor(Math.random() * s.codePool.length)];
          }
        }
      });

      // Occasional "flash" effect — a random code gets bright briefly
      if (Math.random() < 0.02) {
        const s = streams[Math.floor(Math.random() * streams.length)];
        ctx.font = `bold ${s.fontSize + 4}px 'Courier New', monospace`;
        ctx.fillStyle = s.color + ' 0.9)';
        ctx.fillText(s.code, s.x, s.y);
      }

      // Ambient glow pulses
      time += 0.016;
      const pulse1 = Math.sin(time * 0.5) * 0.5 + 0.5;
      const pulse2 = Math.cos(time * 0.3) * 0.5 + 0.5;

      const g1 = ctx.createRadialGradient(w * 0.2, h * 0.3, 0, w * 0.2, h * 0.3, 400);
      g1.addColorStop(0, `rgba(255, 80, 80, ${0.04 * pulse1})`);
      g1.addColorStop(1, 'transparent');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      const g2 = ctx.createRadialGradient(w * 0.8, h * 0.6, 0, w * 0.8, h * 0.6, 350);
      g2.addColorStop(0, `rgba(80, 180, 255, ${0.04 * pulse2})`);
      g2.addColorStop(1, 'transparent');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

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

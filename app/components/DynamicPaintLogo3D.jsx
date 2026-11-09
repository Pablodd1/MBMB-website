'use client';
import React, { useEffect, useRef, useState } from 'react';

const BRUSH_STROKES = Array.from({ length: 44 }, (_, i) => ({
  angle: (i / 44) * Math.PI * 2,
  radius: 36 + ((i * 19) % 140),
  size: 6 + ((i * 7) % 16),
  speed: 0.55 + (i % 5) * 0.22,
  layer: (i % 6) / 6,
}));

const PALETTES = {
  impasto: ['#0052A3', '#0066CC', '#00A8E8', '#22d3ee', '#10b981', '#ffffff'],
  ribbon: ['#3b0764', '#1d4ed8', '#0284c7', '#06b6d4', '#67e8f9', '#ffffff'],
  neon: ['#be185d', '#ec4899', '#0066CC', '#00A8E8', '#34d399', '#ffffff'],
};

export default function DynamicPaintLogo3D() {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const [paintMode, setPaintMode] = useState('impasto');
  const paintModeRef = useRef('impasto');

  useEffect(() => {
    paintModeRef.current = paintMode;
  }, [paintMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let time = 0;
    let scrollProgress = 0.25;
    let targetScroll = 0.25;
    let userInteractedScroll = false;
    let mouseX = 0.12;
    let mouseY = -0.06;
    let targetMouseX = 0.12;
    let targetMouseY = -0.06;

    const handleWindowScroll = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      const ratio = Math.min(1, Math.max(0.15, y / 420));
      userInteractedScroll = true;
      targetScroll = ratio;
    };

    const handleWheelOnLogo = (e) => {
      userInteractedScroll = true;
      targetScroll = Math.max(0.05, Math.min(1, targetScroll + (e.deltaY > 0 ? 0.08 : -0.08)));
    };

    const handleMouseMove = (e) => {
      const rect = wrapper.getBoundingClientRect();
      targetMouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetMouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      const dist = Math.min(1, Math.hypot(targetMouseX, targetMouseY));
      if (!userInteractedScroll) {
        targetScroll = 0.3 + dist * 0.5;
      }
    };

    const handleMouseLeave = () => {
      targetMouseX = 0.12;
      targetMouseY = -0.06;
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    wrapper.addEventListener('wheel', handleWheelOnLogo, { passive: true });
    wrapper.addEventListener('mousemove', handleMouseMove, { passive: true });
    wrapper.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    function drawPaintedBar(x1, y1, x2, y2, thickness, color, paintIntensity, wavePhase) {
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineCap = 'square';
      ctx.lineJoin = 'miter';

      if (paintIntensity < 0.06) {
        ctx.lineWidth = thickness;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.restore();
        return;
      }

      const bristles = 3;
      for (let b = 0; b < bristles; b++) {
        const offset = (b - 1) * (thickness * 0.22 * paintIntensity);
        const mx = (x1 + x2) / 2 + Math.sin(wavePhase + b * 1.3) * 6 * paintIntensity;
        const my = (y1 + y2) / 2 + Math.cos(wavePhase + b * 1.3) * 6 * paintIntensity;

        ctx.lineWidth = thickness * (0.65 + 0.2 * Math.sin(b + wavePhase));
        ctx.beginPath();
        ctx.moveTo(x1 + offset * 0.4, y1 + offset * 0.4);
        ctx.quadraticCurveTo(mx + offset, my - offset, x2 - offset * 0.3, y2 + offset * 0.3);
        ctx.stroke();
      }
      ctx.restore();
    }

    function drawOpenSquareFrame(ox, oy, size, thickness, color, paintIntensity, wavePhase) {
      const half = size / 2;
      const left = ox - half;
      const right = ox + half;
      const top = oy - half;
      const bottom = oy + half;
      // Wide vertical opening on the right edge so the letters M B M B never collide with the frame stubs
      const gapTop = oy - size * 0.27;
      const gapBottom = oy + size * 0.27;

      drawPaintedBar(left, top, right, top, thickness, color, paintIntensity, wavePhase);
      drawPaintedBar(left, top, left, bottom, thickness, color, paintIntensity, wavePhase + 1.1);
      drawPaintedBar(left, bottom, right, bottom, thickness, color, paintIntensity, wavePhase + 2.2);
      drawPaintedBar(right, top, right, gapTop, thickness, color, paintIntensity, wavePhase + 3.3);
      drawPaintedBar(right, gapBottom, right, bottom, thickness, color, paintIntensity, wavePhase + 4.4);
    }

    function render() {
      time += 0.026;

      if (!userInteractedScroll) {
        targetScroll = 0.38 + 0.32 * Math.sin(time * 0.55);
      }

      scrollProgress += (targetScroll - scrollProgress) * 0.09;
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      const tiltY = mouseX * 14 + scrollProgress * 7 * Math.sin(time * 0.7);
      const tiltX = -mouseY * 11 + scrollProgress * 4 * Math.cos(time * 0.5);
      wrapper.style.transform = `rotateY(${tiltY.toFixed(2)}deg) rotateX(${tiltX.toFixed(2)}deg)`;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const p = scrollProgress;
      const pal = PALETTES[paintModeRef.current] || PALETTES.impasto;

      // 1. Dynamic 3D Paint Brush Dabs in Background
      if (p > 0.04) {
        BRUSH_STROKES.forEach((s, idx) => {
          const angle = s.angle + time * s.speed * 0.32 + p * 1.8;
          const rx = 310 + Math.cos(angle) * (s.radius * (0.65 + p * 0.8));
          const ry = 175 + Math.sin(angle * 1.3) * (s.radius * 0.52 * (0.65 + p * 0.8));
          const depthOffset = (s.layer - 0.5) * 36 * p;

          ctx.save();
          ctx.globalAlpha = Math.min(0.68, p * 0.68);
          ctx.fillStyle = pal[idx % (pal.length - 1)];
          ctx.beginPath();
          ctx.ellipse(
            rx + mouseX * depthOffset,
            ry + mouseY * depthOffset,
            s.size * (0.55 + p * 1.15),
            s.size * (0.26 + p * 0.4),
            angle,
            0,
            Math.PI * 2
          );
          ctx.fill();
          ctx.restore();
        });
      }

      // 2. Render 12 Extruded 3D Paint Layers (Open Square + Cleanly Spaced M B M B Letters)
      const totalLayers = 12;
      const frameCenterX = 165;
      const frameCenterY = 175;
      const frameSize = 205;

      // Pre-measure exact character widths so letters NEVER overlap
      const fontSize = 68;
      ctx.font = `900 ${fontSize}px Georgia, "Times New Roman", serif`;
      const letters = ['M', 'B', 'M', 'B'];
      const charGap = 14 + p * 5; // Explicit gap between each letter
      const charPositions = [];
      let cursorX = frameCenterX - 38; // First 'M' starts cleanly inside the right half of the square
      letters.forEach((ch, idx) => {
        const w = ctx.measureText(ch).width;
        // Add a clean extra gap after the 2nd letter ('B') so the square's right border line sits cleanly between 'MB' and 'MB'
        if (idx === 2) {
          cursorX += 10 + p * 6;
        }
        charPositions.push({ char: ch, x: cursorX, width: w });
        cursorX += w + charGap;
      });

      for (let i = 0; i < totalLayers; i++) {
        const depthRatio = i / (totalLayers - 1);
        const isTopLayer = i === totalLayers - 1;

        // Controlled 3D depth extrusion so back layers don't bleed into adjacent letters
        const spread = (1 - depthRatio) * (5 + p * 20);
        const waveX = Math.sin(time * 2 + i * 0.45) * (p * 4 * (1 - depthRatio));
        const waveY = Math.cos(time * 1.7 + i * 0.45) * (p * 3.5 * (1 - depthRatio));

        const lx = -spread * (0.65 + mouseX * 0.75) + waveX;
        const ly = spread * (0.45 + mouseY * 0.75) + waveY;

        const colorIndex = Math.min(pal.length - 1, Math.floor(depthRatio * (pal.length - 1)));
        const layerColor = isTopLayer ? '#ffffff' : pal[colorIndex];

        ctx.save();
        ctx.globalAlpha = isTopLayer ? 1 : (0.18 + depthRatio * 0.52) * (0.35 + p * 0.65);

        if (isTopLayer) {
          ctx.shadowColor = pal[2];
          ctx.shadowBlur = 12 + p * 18;
        }

        drawOpenSquareFrame(
          frameCenterX + lx,
          frameCenterY + ly,
          frameSize,
          isTopLayer ? 9 : 7 + p * 4,
          layerColor,
          isTopLayer ? p * 0.45 : p * 0.85,
          time + i * 0.3
        );

        const baseFontY = frameCenterY + 24;
        ctx.font = `900 ${fontSize}px Georgia, "Times New Roman", serif`;
        ctx.fillStyle = layerColor;
        ctx.strokeStyle = pal[Math.max(0, colorIndex - 1)];
        ctx.lineWidth = isTopLayer ? 1.5 + p * 2 : 3 * p;

        charPositions.forEach((item, charIdx) => {
          const charWaveY = Math.sin(time * 2.2 + charIdx * 0.9) * (p * 7);
          const cx = item.x + lx * (1 + charIdx * 0.12 * p);
          const cy = baseFontY + ly * (1 + charIdx * 0.1 * p) + charWaveY;

          ctx.save();
          ctx.translate(cx + item.width / 2, cy - 22);
          ctx.rotate(Math.sin(time * 1.4 + charIdx) * 0.04 * p);
          ctx.translate(-(cx + item.width / 2), -(cy - 22));

          if (p > 0.15 && !isTopLayer) {
            ctx.strokeText(item.char, cx, cy);
          }
          ctx.fillText(item.char, cx, cy);

          // Painted underline brush stroke per letter when scrolled
          if (isTopLayer && p > 0.25) {
            ctx.fillStyle = pal[(charIdx + 2) % (pal.length - 1)];
            ctx.globalAlpha = p * 0.65;
            ctx.fillRect(cx + 2, cy + 8, item.width * 0.85 * p, 3.5 + (charIdx % 2) * 2 * p);
          }
          ctx.restore();
        });

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleWindowScroll);
      wrapper.removeEventListener('wheel', handleWheelOnLogo);
      wrapper.removeEventListener('mousemove', handleMouseMove);
      wrapper.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center justify-center" style={{ perspective: '1100px' }}>
      <div
        ref={wrapperRef}
        className="relative w-full h-[260px] sm:h-[310px] lg:h-[340px] flex items-center justify-center select-none"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
        title="Scroll or move mouse to morph 3D paint layers"
      >
        <canvas
          ref={canvasRef}
          width={640}
          height={350}
          className="w-full h-full object-contain pointer-events-none"
        />
      </div>

      {/* Minimalistic 3D Paint Style Switcher Pill under the right-side logo */}
      <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 backdrop-blur-md px-2.5 py-1 rounded-full mt-1">
        {[
          { id: 'impasto', label: '🎨 3D Impasto' },
          { id: 'ribbon', label: '🌊 Liquid Acrylic' },
          { id: 'neon', label: '✨ Neon Brush' },
        ].map((mode) => (
          <button
            key={mode.id}
            type="button"
            onClick={() => setPaintMode(mode.id)}
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition cursor-pointer ${
              paintMode === mode.id
                ? 'bg-[#0066CC] text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            {mode.label}
          </button>
        ))}
      </div>
    </div>
  );
}

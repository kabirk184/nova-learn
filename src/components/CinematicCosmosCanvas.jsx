import React, { useEffect, useRef } from 'react';

/**
 * CinematicCosmosCanvas
 * 
 * An ultra-lightweight, 60fps cinematic cosmic background featuring:
 * - 3 layered depths of drifting stars (deep space, mid-field, foreground bright stars)
 * - Luminous volumetric nebula clouds (cyan, deep sapphire, ultraviolet, vivid magenta, soft rose)
 * - Gently pulsating celestial light sources (bright twinkling stars with diffraction spikes)
 * - Mouse parallax depth tracking
 * - Reduced motion preference detection
 * - Zero heavy asset dependencies (runs smoothly on any student laptop)
 */
export default function CinematicCosmosCanvas({ reducedMotion = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse parallax offsets
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / width - 0.5) * 40;
      targetMouseY = (e.clientY / height - 0.5) * 40;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 1. Layered Starfield Setup
    const starCount = 380;
    const stars = [];

    for (let i = 0; i < starCount; i++) {
      const depth = Math.random(); // 0 (far) to 1 (near)
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: depth > 0.85 ? Math.random() * 2 + 1.2 : Math.random() * 1.2 + 0.4,
        depth: depth,
        alpha: Math.random() * 0.7 + 0.3,
        twinkleSpeed: (Math.random() * 0.03 + 0.008) * (Math.random() > 0.5 ? 1 : -1),
        speedX: (Math.random() - 0.5) * 0.08 * (depth + 0.2),
        speedY: (Math.random() * 0.12 + 0.04) * (depth + 0.3), // gentle downwards/forward cosmic drift
        color: depth > 0.9 
          ? '#e0f2fe' 
          : depth > 0.6 
          ? '#c084fc' 
          : depth > 0.3 
          ? '#38bdf8' 
          : '#ffffff'
      });
    }

    // 2. Large Luminous Hero Stars with Diffraction Spikes
    const heroStars = [
      { xRel: 0.22, yRel: 0.48, color: '#38bdf8', size: 3.5, spikeLength: 32, pulseSpeed: 0.015 },
      { xRel: 0.78, yRel: 0.25, color: '#c084fc', size: 3.0, spikeLength: 26, pulseSpeed: 0.02 },
      { xRel: 0.14, yRel: 0.22, color: '#38bdf8', size: 2.6, spikeLength: 20, pulseSpeed: 0.012 },
      { xRel: 0.88, yRel: 0.78, color: '#f472b6', size: 2.8, spikeLength: 22, pulseSpeed: 0.018 },
      { xRel: 0.52, yRel: 0.88, color: '#60a5fa', size: 2.4, spikeLength: 18, pulseSpeed: 0.022 },
    ];

    // 3. Volumetric Nebula Cloud Centers (Inspired by reference aesthetic)
    const nebulae = [
      // Central electric blue & cyan core
      { xRel: 0.5, yRel: 0.46, radiusRel: 0.48, colorStop0: 'rgba(14, 165, 233, 0.28)', colorStop1: 'rgba(3, 105, 161, 0.14)', speed: 0.0006 },
      // Left deep violet & purple cloud
      { xRel: 0.18, yRel: 0.40, radiusRel: 0.44, colorStop0: 'rgba(147, 51, 234, 0.24)', colorStop1: 'rgba(76, 29, 149, 0.10)', speed: 0.0008 },
      // Right magenta & pink cosmic veil
      { xRel: 0.82, yRel: 0.32, radiusRel: 0.46, colorStop0: 'rgba(217, 70, 239, 0.22)', colorStop1: 'rgba(131, 24, 67, 0.08)', speed: 0.0007 },
      // Center-bottom dark indigo depth
      { xRel: 0.45, yRel: 0.75, radiusRel: 0.55, colorStop0: 'rgba(99, 102, 241, 0.18)', colorStop1: 'rgba(49, 46, 129, 0.05)', speed: 0.0005 },
      // Upper right brilliant cyan filament
      { xRel: 0.70, yRel: 0.18, radiusRel: 0.36, colorStop0: 'rgba(56, 189, 248, 0.20)', colorStop1: 'rgba(14, 116, 144, 0.06)', speed: 0.0009 }
    ];

    let time = 0;

    // Render Loop
    const render = () => {
      time += 0.01;

      // Smooth mouse parallax interpolation
      if (!reducedMotion) {
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;
      }

      // Base deep universe canvas
      ctx.fillStyle = '#050314';
      ctx.fillRect(0, 0, width, height);

      // Render Nebula Clouds with gentle breathing/morphing
      nebulae.forEach((neb, idx) => {
        const pulse = reducedMotion ? 1 : Math.sin(time * 0.6 + idx * 1.5) * 0.08 + 1;
        const driftX = reducedMotion ? 0 : Math.cos(time * neb.speed * 20 + idx) * 25 + (mouseX * (0.2 + idx * 0.05));
        const driftY = reducedMotion ? 0 : Math.sin(time * neb.speed * 20 + idx) * 20 + (mouseY * (0.2 + idx * 0.05));

        const cx = neb.xRel * width + driftX;
        const cy = neb.yRel * height + driftY;
        const radius = neb.radiusRel * Math.max(width, height) * pulse;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, neb.colorStop0);
        grad.addColorStop(0.5, neb.colorStop1);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      });

      // Render Starfield
      stars.forEach((star) => {
        // Drift position
        if (!reducedMotion) {
          star.y += star.speedY;
          star.x += star.speedX;

          // Wrap around edges
          if (star.y > height) {
            star.y = 0;
            star.x = Math.random() * width;
          }
          if (star.x < 0) star.x = width;
          if (star.x > width) star.x = 0;

          // Twinkle
          star.alpha += star.twinkleSpeed;
          if (star.alpha > 0.95 || star.alpha < 0.25) {
            star.twinkleSpeed = -star.twinkleSpeed;
          }
        }

        const renderX = star.x + (mouseX * star.depth * 0.4);
        const renderY = star.y + (mouseY * star.depth * 0.4);

        ctx.beginPath();
        ctx.arc(renderX, renderY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
        ctx.fill();

        // Extra soft glow for closest stars
        if (star.depth > 0.85) {
          ctx.beginPath();
          ctx.arc(renderX, renderY, star.size * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = star.alpha * 0.25;
          ctx.fill();
        }
      });

      // Render Hero Stars with 4-point cross diffraction spikes (from reference)
      heroStars.forEach((hs, idx) => {
        const pulse = reducedMotion ? 1 : (Math.sin(time * 2 + idx) * 0.15 + 1);
        const cx = hs.xRel * width + (mouseX * 0.6);
        const cy = hs.yRel * height + (mouseY * 0.6);
        const currentSpike = hs.spikeLength * pulse;

        // Core glow circle
        const haloGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, currentSpike * 1.5);
        haloGrad.addColorStop(0, hs.color);
        haloGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.4)');
        haloGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = haloGrad;
        ctx.globalAlpha = 0.55 * pulse;
        ctx.beginPath();
        ctx.arc(cx, cy, currentSpike * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Sharp bright center
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 0.95;
        ctx.beginPath();
        ctx.arc(cx, cy, hs.size * pulse, 0, Math.PI * 2);
        ctx.fill();

        // Horizontal spike
        ctx.strokeStyle = hs.color;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = 0.7 * pulse;
        ctx.beginPath();
        ctx.moveTo(cx - currentSpike, cy);
        ctx.lineTo(cx + currentSpike, cy);
        ctx.stroke();

        // Vertical spike
        ctx.beginPath();
        ctx.moveTo(cx, cy - currentSpike);
        ctx.lineTo(cx, cy + currentSpike);
        ctx.stroke();
      });

      // Reset alpha for safety
      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'none',
        zIndex: 1
      }}
      aria-hidden="true"
    />
  );
}

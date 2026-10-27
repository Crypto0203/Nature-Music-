import { useRef, useEffect } from 'react';

interface WaveVisualizerProps {
  color: string;
  stress: number;
  isPlaying: boolean;
}

export default function WaveVisualizer({ color, stress, isPlaying }: WaveVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 200;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const center = size / 2;
    const baseRadius = size / 2 - 20;

    const animate = () => {
      if (!isPlaying) return;
      timeRef.current += 0.015;
      const t = timeRef.current;

      ctx.clearRect(0, 0, size, size);

      // Outer glow rings
      for (let i = 3; i >= 0; i--) {
        const waveR = baseRadius - i * 18 + Math.sin(t * 2 + i) * 8;
        const opacity = Math.max(0.02, 0.12 - i * 0.025);
        ctx.beginPath();
        ctx.arc(center, center, waveR, 0, Math.PI * 2);
        ctx.strokeStyle = `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Inner glow
      const innerR = baseRadius * 0.45 + Math.sin(t * Math.PI) * 5;
      const gradient = ctx.createRadialGradient(center, center, 0, center, center, innerR);
      gradient.addColorStop(0, `${color}4D`);
      gradient.addColorStop(1, `${color}05`);
      ctx.beginPath();
      ctx.arc(center, center, innerR, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Breathing circle in center
      const breathR = 20 + Math.sin(t * 0.8) * 8 * (1 - stress * 0.5);
      const breathGradient = ctx.createRadialGradient(center, center, 0, center, center, breathR);
      breathGradient.addColorStop(0, `${color}AA`);
      breathGradient.addColorStop(0.6, `${color}44`);
      breathGradient.addColorStop(1, `${color}00`);
      ctx.beginPath();
      ctx.arc(center, center, breathR, 0, Math.PI * 2);
      ctx.fillStyle = breathGradient;
      ctx.fill();

      // Orbiting particles
      const particleCount = Math.floor(3 + stress * 5);
      for (let i = 0; i < particleCount; i++) {
        const angle = t * (0.3 + i * 0.15) + (i * Math.PI * 2) / particleCount;
        const r = baseRadius * 0.55 + Math.sin(t + i * 2) * 15;
        const px = center + Math.cos(angle) * r;
        const py = center + Math.sin(angle) * r;
        const pSize = 2 + Math.sin(t * 2 + i) * 1;
        ctx.beginPath();
        ctx.arc(px, py, pSize, 0, Math.PI * 2);
        ctx.fillStyle = `${color}88`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    if (isPlaying) {
      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [color, stress, isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      className="mx-auto"
      style={{ width: 200, height: 200 }}
    />
  );
}

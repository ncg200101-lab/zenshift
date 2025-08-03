import { useEffect, useRef, useCallback } from 'react';

interface Particle {
    x: number;
    y: number;
    size: number;
    alpha: number;
    vx: number;
    vy: number;
}

const FluidCursor = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mousePositionRef = useRef({ x: 0, y: 0 });
    const delayedPositionRef = useRef({ x: 0, y: 0 });

    const createParticle = (x: number, y: number) => {
        const angle = Math.random() * Math.PI * 1;
        const speed = Math.random() * 1 + 0.5;
        return {
            x,
            y,
            size: Math.random() * 15 + 5,
            alpha: 0.5,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
        };
    };

    const initCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        delayedPositionRef.current.x += (mousePositionRef.current.x - delayedPositionRef.current.x) * 0.04;
        delayedPositionRef.current.y += (mousePositionRef.current.y - delayedPositionRef.current.y) * 0.04;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
            const p = particlesRef.current[i];

            p.x += p.vx;
            p.y += p.vy;

            p.alpha *= 0.98;
            p.size *= 0.94;

            ctx.beginPath();
            const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
            gradient.addColorStop(0, `rgba(255, 230, 77, ${p.alpha})`);
            gradient.addColorStop(1, 'rgba(255, 230, 77, 0)');
            ctx.fillStyle = gradient;
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            if (p.alpha < 0.01 || p.size < 0.5) {
                particlesRef.current.splice(i, 1);
            }
        }

        for (let i = 0; i < 2; i++) {
            particlesRef.current.push(createParticle(delayedPositionRef.current.x, delayedPositionRef.current.y));
        }

        requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        initCanvas();
        animate();

        const handleMouseMove = (e: MouseEvent) => {
            mousePositionRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleResize = () => {
            initCanvas();
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, [animate]);

    return (
        <canvas
            ref={canvasRef}
            className='fixed top-0 left-0 pointer-events-none z-[9999]'
            style={{ width: '100vw', height: '100vh' }}
        />
    );
};

export default FluidCursor; 
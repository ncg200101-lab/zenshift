import { useEffect, useRef } from 'react';
import FluidCursor from './FluidCursor';

interface Particle {
    x: number;
    y: number;
    r: number;
    dx: number;
    dy: number;
}

const CustomCursor = () => {
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const bgCanvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mousePositionRef = useRef({ x: 0, y: 0 });
    const outlinePositionRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const cursorDot = cursorDotRef.current;
        const bgCanvas = bgCanvasRef.current;

        if (!cursorDot || !bgCanvas) return;

        const bgCtx = bgCanvas.getContext('2d');
        if (!bgCtx) return;

        const initParticles = () => {
            particlesRef.current = [];
            for (let i = 0; i < 100; i++) {
                particlesRef.current.push({
                x: Math.random() * bgCanvas.width,
                y: Math.random() * bgCanvas.height,
                r: Math.random() * 2 + 1,
                dx: (Math.random() - 0.5) * 0.5,
                dy: (Math.random() - 0.5) * 0.5,
                });
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            mousePositionRef.current = { x: e.clientX, y: e.clientY };
        };

        const animateCursor = () => {
            if (!cursorDot) return;

            outlinePositionRef.current.x += (mousePositionRef.current.x - outlinePositionRef.current.x) * 0.07;
            outlinePositionRef.current.y += (mousePositionRef.current.y - outlinePositionRef.current.y) * 0.07;

            cursorDot.style.left = `${outlinePositionRef.current.x}px`;
            cursorDot.style.top = `${outlinePositionRef.current.y}px`;

            requestAnimationFrame(animateCursor);
        };

        const drawParticles = () => {
            if (!bgCtx || !bgCanvas) return;

            bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
            bgCtx.fillStyle = 'rgba(255, 255, 255, 0.2)';

            particlesRef.current.forEach((p) => {
                bgCtx.beginPath();
                bgCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                bgCtx.fill();

                p.x += p.dx;
                p.y += p.dy;

                if (p.x < 0 || p.x > bgCanvas.width) p.dx *= -1;
                if (p.y < 0 || p.y > bgCanvas.height) p.dy *= -1;
            });

            requestAnimationFrame(drawParticles);
        };

        const resizeCanvases = () => {
            if (!bgCanvas) return;

            bgCanvas.width = window.innerWidth;
            bgCanvas.height = window.innerHeight;
            initParticles();
        };

        resizeCanvases();
        window.addEventListener('resize', resizeCanvases);
        document.addEventListener('mousemove', handleMouseMove);

        animateCursor();
        drawParticles();

        return () => {
            window.removeEventListener('resize', resizeCanvases);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <>
            <div
                ref={cursorDotRef}
                className='fixed w-[10px] h-[10px] bg-[#ffe64d] rounded-full pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ease-in-out'
            />
            <canvas
                ref={bgCanvasRef}
                className='fixed top-0 left-0 pointer-events-none z-0'
            />
            <FluidCursor />
        </>
    );
};

export default CustomCursor;
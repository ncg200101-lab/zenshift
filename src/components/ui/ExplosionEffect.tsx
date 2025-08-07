import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Draggable);
}

interface ExplosionEffectProps {
    children: ReactNode;
    className?: string;
    dotColors?: string[];
    dotQuantity?: number;
    dotSizeMax?: number;
    dotSizeMin?: number;
    emitterSize?: number;
    speed?: number;
    explosionRadius?: number;
    gravity?: number;
}

const ExplosionEffect = ({
    children,
    className = '',
    dotColors = ['#efde71', '#fde022', '#ffdd00', '#ffe64d'],
    dotQuantity = 30,
    dotSizeMax = 15,
    dotSizeMin = 5,
    emitterSize = 100,
    speed = 1,
    explosionRadius = 300,
    gravity = 0.5,
}: ExplosionEffectProps) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const explosionRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        if (!elementRef.current || !containerRef.current) {
            return;
        }

        const element = elementRef.current;
        const container = containerRef.current;
        
        container.style.cssText = 'position:absolute; left:0; top:0; width:100%; height:100%; overflow:visible; z-index:5000; pointer-events:none;';

        const getRandom = (min: number, max: number) => {
            return min + Math.random() * (max - min);
        };

        const createExplosion = () => {
            const tl = gsap.timeline();
            
            for (let i = 0; i < dotQuantity; i++) {
                const dot = document.createElement('div');
                dot.className = 'explosion-dot';
                const size = getRandom(dotSizeMin, dotSizeMax);
                dot.style.background = dotColors[Math.floor(Math.random() * dotColors.length)];
                container.appendChild(dot);
                
                const angle = Math.random() * Math.PI * 2;
                const length = Math.random() * (emitterSize / 2 - size / 2);
                
                gsap.set(dot, {
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: size,
                    height: size,
                    xPercent: -50,
                    yPercent: -50,
                    force3D: true
                });

                tl.to(dot, {
                    duration: (2 + Math.random()) / speed,
                    x: Math.cos(angle) * length * (explosionRadius / 50),
                    y: Math.sin(angle) * length * (explosionRadius / 100),
                    ease: 'power2.out',
                    opacity: 0,
                    scale: 0.1,
                    rotation: Math.random() * 360
                }, 0);
            }
            
            return tl;
        };

        const explode = (element: HTMLElement) => {
            const bounds = element.getBoundingClientRect();
            const parentBounds = container.getBoundingClientRect();
            
            gsap.set(container, {
                x: bounds.left - parentBounds.left,
                y: bounds.top - parentBounds.top,
                width: bounds.width,
                height: bounds.height
            });
            
            explosionRef.current = createExplosion();
            explosionRef.current.play(0);
        };

        const handleHover = () => {
            explosionRef.current?.kill();
            explode(element);
        };

        const handleMouseLeave = () => {
            explosionRef.current?.kill();
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        };

        const handleSubmit = () => {
            explosionRef.current?.kill();
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        };

        element.addEventListener('mouseenter', handleHover);
        element.addEventListener('mouseleave', handleMouseLeave);
        const form = element.closest('form');
        if (form) {
            form.addEventListener('submit', handleSubmit);
        }

        return () => {
            element.removeEventListener('mouseenter', handleHover);
            element.removeEventListener('mouseleave', handleMouseLeave);
            if (form) {
                form.removeEventListener('submit', handleSubmit);
            }
            explosionRef.current?.kill();
        };
    }, [dotColors, dotQuantity, dotSizeMax, dotSizeMin, emitterSize, speed, explosionRadius, gravity]);

    return (
        <div className={`relative w-full ${className}`}>
            <div ref={elementRef} className={`relative z-[10] w-full ${className}`}>
                {children}
            </div>
            <div ref={containerRef} className='absolute inset-0 pointer-events-none' />
        </div>
    );
};

export default ExplosionEffect; 
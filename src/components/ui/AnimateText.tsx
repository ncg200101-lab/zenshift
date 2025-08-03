import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AnimateTextProps {
    text1: string;
    text2: string;
    className?: string
}

const AnimateText = ({ text1, text2, className }: AnimateTextProps) => {
    const text1Ref = useRef<HTMLDivElement>(null);
    const text2Ref = useRef<HTMLDivElement>(null);
    const showingFirstRef = useRef(true);

    const flipText = () => {
        const text1 = text1Ref.current;
        const text2 = text2Ref.current;
        if (!text1 || !text2) return;

        if (showingFirstRef.current) {
        gsap.to(text1, {
            duration: 1.5,
            opacity: 0,
            rotateX: 180,
            ease: 'power4.inOut',
            onComplete: () => {
                gsap.set(text1, { opacity: 0 });
            }
        });

        gsap.fromTo(text2,
            { opacity: 0, rotateX: -180 },
            {
                duration: 1.5,
                opacity: 1,
                rotateX: 0,
                ease: 'power4.inOut',
                onStart: () => {
                    gsap.set(text2, { opacity: 1 });
                },
                onComplete: () => {
                    gsap.to(text2, {
                        duration: 3,
                        backgroundPosition: '200% 0',
                        repeat: -1,
                        ease: 'none'
                    });
                }
            }
        );
        } else {
            gsap.to(text2, {
                duration: 1.5,
                opacity: 0,
                rotateX: -180,
                ease: 'power4.inOut',
                onComplete: () => {
                    gsap.set(text2, { opacity: 0 });
                }
            });

            gsap.fromTo(text1,
                { opacity: 0, rotateX: 180 },
                {
                    duration: 1.5,
                    opacity: 1,
                    rotateX: 0,
                    ease: 'power4.inOut',
                    onStart: () => {
                        gsap.set(text1, { opacity: 1 });
                    },
                    onComplete: () => {
                        gsap.to(text1, {
                            duration: 3,
                            backgroundPosition: '200% 0',
                            repeat: -1,
                            ease: 'none'
                        });
                    }
                }
            );
        }

        showingFirstRef.current = !showingFirstRef.current;
    };

    useEffect(() => {
        gsap.set([text1Ref.current, text2Ref.current], { backgroundSize: '200% 100%' });
        gsap.to(text1Ref.current, {
            duration: 3,
            backgroundPosition: '200% 0',
            repeat: -1,
            ease: 'none'
        });

        const interval = setInterval(flipText, 3000);

        return () => {
            clearInterval(interval);
        };
    }, []);

  return (
        <div className={`relative text-center ${className}`}>
            <div 
                ref={text1Ref}
                className='relative font-bold text-transparent bg-gradient-to-r from-fuchsia-500 via-cyan-500 to-fuchsia-500 bg-clip-text [transform-style:preserve-3d] [backface-visibility:hidden] leading-none'
            >
                {text1}
            </div>
            
            <div 
                ref={text2Ref}
                className='absolute inset-0 font-bold text-transparent bg-gradient-to-r from-fuchsia-500 via-cyan-500 to-fuchsia-500 bg-clip-text [transform-style:preserve-3d] [backface-visibility:hidden] opacity-0 leading-none'
            >
                {text2}
            </div>
        </div>
  );
};

export default AnimateText;
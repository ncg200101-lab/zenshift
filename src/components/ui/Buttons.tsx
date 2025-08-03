import { useState, ButtonHTMLAttributes, ReactNode } from 'react';
import ExplosionEffect from '../../components/ui/ExplosionEffect';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    leftColor?: string;
    rightColor?: string;
    color?: string;
    className?: string;
}

export const TransparentButton = ({ children, className, ...args }: ButtonProps) => {
    return (
        <ExplosionEffect className={className || ''}>
            <button 
                className={`outline-button px-10 py-3 text-base md:text-xl ${className || ''}`}
                {...args}
            >
                {children}
            </button>
        </ExplosionEffect>
    )
}

export const FilledButton = ({ children, className, ...args }: ButtonProps) => {
    return (
        <ExplosionEffect className={className || ''}>
            <button 
                className={`fill-button px-10 py-3 text-base md:text-xl ${className || ''}`}
                {...args}
            >
                {children}
            </button>
        </ExplosionEffect>
    )
}

export const TransparentColorButton = ({ children, color, className, ...args }: ButtonProps) => {
    return (
        <ExplosionEffect className={className || ''}>
            <button 
                className={`hover:cursor-pointer px-10 py-5 rounded-3xl border-2 font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,230,77,0.4)] hover:scale-[1.02] text-xl ${className || ''}`}
                style={{
                    borderColor: color,
                    color: color,
                    backgroundColor: 'transparent'
                }}
                {...args}
            >
                {children}
            </button>
        </ExplosionEffect>
    )
}

export const FilledColorButton = ({ children, color, className, ...args }: ButtonProps) => {
    return (
        <ExplosionEffect className={className || ''}>
            <button 
                className={`hover:cursor-pointer px-10 py-5 rounded-3xl border-2 font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,230,77,0.4)] hover:scale-[1.02] text-xl ${className || ''}`}
                style={{
                    backgroundColor: color,
                    borderColor: color,
                    color: '#FFFFFF' 
                }}
                {...args}
            >
                {children}
            </button>
        </ExplosionEffect>
    )
}

export const LargeTransparentButton = ({ children, className, ...args }: ButtonProps) => {
    return (
        <ExplosionEffect className={className || ''}>
            <button 
                className={`outline-button px-8 py-3 md:px-12 md:py-4 text-xl md:text-3xl font-medium ${className || ''}`}
                {...args}
            >
                {children}
            </button>
        </ExplosionEffect>
    )
}

export const LargeFilledButton = ({ children, className, ...args }: ButtonProps) => {
    return (
        <ExplosionEffect className={className || ''}>
            <button 
                className={`fill-button px-8 py-3 md:px-12 md:py-4 text-xl md:text-3xl font-medium ${className || ''}`}
                {...args}
            >
                {children}
            </button>
        </ExplosionEffect>
    )
}

export const FullWidthButton = ({children, leftColor, rightColor, className, ...args}: ButtonProps) => {
    const gradient = leftColor && rightColor 
        ? `linear-gradient(to right, ${leftColor}, ${rightColor})`
        : 'linear-gradient(to right, #FFD600, #FFB300)';

    return (
        <ExplosionEffect className={`w-full ${className || ''}`}>
            <button 
                className={`w-full px-4 py-3 rounded-xl text-indigo-700 font-bold text-xl cursor-pointer shadow-3d transition-transform duration-100 active:translate-y-1 active:shadow-3d-pressed ${className || ''}`}
                style={{ background: gradient, border: 'none', boxShadow: '0 6px 0 #B8860B, 0 2px 16px 2px rgba(255, 214, 0, 0.25)' }}
                {...args}
            >
                {children}
            </button>
        </ExplosionEffect>
    )
}

export const VerticalsButton = ({children, color, leftColor, rightColor, className, ...args}: ButtonProps) => {
    return (
        <ExplosionEffect className={className || ''}>
            <button
                className={`button-3d-gradient ${className || ''}`}
                {...args}
            >
                <div className="button-3d-gradient-top">
                    {children}
                </div>
                <div className="button-3d-gradient-bottom"></div>
                <div className="button-3d-gradient-base"></div>
            </button>
        </ExplosionEffect>
    )
}

export const CategoryButton = ({children, leftColor, rightColor, className, ...args}: ButtonProps) => {
    const backgroundStyle = leftColor && rightColor
        ? `linear-gradient(to right, ${leftColor}, ${rightColor})`
        : 'linear-gradient(to right, #FFD600, #FFB300)';

    return (
        <ExplosionEffect className={`${className || ''}`}>
            <button
                className={`px-6 md:px-10 py-3 md:py-4 rounded-2xl text-white font-bold text-xl cursor-pointer shadow-3d transition-transform duration-100 active:translate-y-1 active:shadow-3d-pressed ${className || ''}`}
                style={{ background: backgroundStyle, border: 'none', boxShadow: '0 6px 0 #B8860B, 0 2px 16px 2px rgba(255, 214, 0, 0.25)' }}
                {...args}
            >
                {children}
            </button>
        </ExplosionEffect>
    )
}

export const ThanksButton = ({children, color, className, ...args}: ButtonProps) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <button 
            className={`w-full px-4 py-5 md:py-10 rounded-3xl text-black font-playfair text-2xl md:text-4xl cursor-pointer tracking-widest hover:scale-102 transition-transform duration-300 ${className || ''}`}
            style={{
                background: isHovered ? '#ffe64d' : color,
                transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            {...args}
        >
            {children}
        </button>
    )
}
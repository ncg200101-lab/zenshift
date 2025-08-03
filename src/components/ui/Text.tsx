import { ReactNode } from "react";

interface TextProps {
    children: ReactNode;
    color?: string,
    className?: string
}

export const MainTitle = ({ children, className }: TextProps) => {
    return (
        <h1 className={`title welcome-title text-[50px] sm:text-[70px] md:text-[80px] lg:text-[90px] ${className || ''}`}>
            {children}
        </h1>
    );
};

export const SubTitle = ({ children, className }: TextProps) => {
    return (
        <h1 className={`title text-[#362925] text-4xl md:text-6xl font-bold ${className || ''}`}>
            {children}
        </h1>
    );
};


export const Typography = ({ children, className }: TextProps) => {
    return (
        <h3 className={`text text-2xl md:text-3xl font-bold ${className || ''}`}>
            {children}
        </h3>
    );
};

export const Text = ({ children, className }: TextProps) => {
    return (
        <p className={`text text-xl md:text-2xl ${className || ''}`}>
            {children}
        </p>
    );
};
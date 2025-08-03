interface ValueBoxProps {
    title: string;
    description: string;
}

const ValueBox = ({ title, description }: ValueBoxProps) => {
    return (
        <div
            className="relative rounded-3xl p-3 w-64 h-72 flex flex-col items-center text-center shadow-2xl"
            style={{
                background: 'linear-gradient(135deg, #a79c8b 60%,rgb(192, 187, 172) 100%)',
                boxShadow: '0 8px 32px 0 rgba(54, 41, 37, 0.25), 0 1.5px 8px 0 #fff8e1 inset',
                border: '1.5px solid #FEFAE0',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                overflow: 'hidden',
            }}
        >
            <div className="absolute inset-0 pointer-events-none rounded-3xl" style={{
                boxShadow: '0 0 32px 8px #fefae0cc',
                zIndex: 0,
            }} />
            <div className="relative z-10 border-2 border-[#FEFAE0] rounded-2xl px-6 py-3 mb-4 w-full bg-[#fefae0]/30 backdrop-blur-sm shadow-md">
                <h2 className="font-playfair text-[#362925] text-3xl font-bold drop-shadow-lg">
                    {title}
                </h2>
            </div>
            <div className="relative z-10 flex flex-col justify-center align-center h-full">
                <p className="text text-white welcome-text text-2xl drop-shadow-md">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default ValueBox; 
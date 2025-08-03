import { ReactNode } from "react";

interface FindSectionCardProps {
    icon: ReactNode;
    title: string;
    description: string;
}

const FindSectionCard = ({ icon, title, description }: FindSectionCardProps) => {
    return (
        <div className='flex flex-col items-center text-center p-6 rounded-lg transition-colors duration-200 cursor-pointer'>
            <div className='mb-4 text-4xl text-[#362925]'>
                {icon}
            </div>
            <h3 className='text-xl md:text-2xl font-semibold text-[#362925] mb-2'>{title}</h3>
            <p className='text-lg text-[#362925] text-base'>{description}</p>
        </div>
    );
};

export default FindSectionCard; 
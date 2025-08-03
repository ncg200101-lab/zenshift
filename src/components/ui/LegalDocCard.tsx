import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

interface LegalDocCardProps {
    title: string;
    points: string[];
}

const LegalDocCard = ({ title, points }: LegalDocCardProps) => {
    return (
        <div className='bg-[#FBF7EC88] text-start border border-gray-200 rounded-lg p-6'>
            <h2 className='flex items-center text-2xl md:text-3xl font-bold mb-4'>
                {title}
            </h2>
            <ul className='list-none'>
                {points.map((point, index) => (
                    <li key={index} className='mb-2 text-gray-700 text-xl md:text-2xl'>
                        <span className='mr-1 font-bold'>{point.substring(0, 2)}</span>{point.substring(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LegalDocCard; 
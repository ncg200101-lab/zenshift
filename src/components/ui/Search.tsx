import { InputHTMLAttributes, forwardRef } from 'react';
 
interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    parentClassName?: string;
}

export const Search = forwardRef<HTMLInputElement, SearchProps>(
    ({ className, parentClassName, ...props }, ref) => {
        return (
            <div className={`bg-white flex items-stretch border border-black rounded-full overflow-hidden p-2 ${parentClassName}`}>
                <input
                    type='search'
                    placeholder='Search By Tags (e.g Chakra, Space cle ...'
                    className={`flex-grow min-w-0 pl-4 md:pl-6 pr-3 py-1 text-[#362925] text-base md:text-lg bg-white focus:outline-none ${className}`}
                    ref={ref}
                    {...props}
                />
                <div className='flex-shrink-0 flex items-center justify-center rounded-full bg-[#8C52FF] text-white px-2 md:px-4'>
                    <img className='w-[20px] h-[20px]' src='/assets/icons/search.png' alt='' />
                    <span className='text-sm md:text-base ml-2'>Search</span>
                </div>
            </div>
        );
    }
);

Search.displayName = 'Search';

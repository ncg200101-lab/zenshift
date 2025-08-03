const ChatBot = () => {
    return (
        <div className='fixed bottom-4 right-4 z-[50] cursor-pointer'>
            <svg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <circle cx='32' cy='32' r='32' fill='url(#paint0_linear_1_2)' />
                <path d='M48.8712 27.1056C48.8712 23.2329 45.7029 20.0646 41.8302 20.0646H22.169C18.2963 20.0646 15.128 23.2329 15.128 27.1056C15.128 30.9783 18.2963 34.1466 22.169 34.1466H41.8302C45.7029 34.1466 48.8712 30.9783 48.8712 27.1056Z' fill='white' />
                <rect x='26' y='24' width='4' height='4' rx='2' fill='#00BCD4' />
                <rect x='34' y='24' width='4' height='4' rx='2' fill='#00BCD4' />
                <path d='M44.2114 38.9473C44.2114 36.4895 42.3268 34.5263 39.901 34.5263H24.099C21.6732 34.5263 19.7886 36.4895 19.7886 38.9473C19.7886 41.4052 21.6732 43.3684 24.099 43.3684H28.1132L32 47.7895L35.8868 43.3684H39.901C42.3268 43.3684 44.2114 41.4052 44.2114 38.9473Z' fill='white' />
                <circle cx='28.5' cy='40.5' r='1.5' fill='#1F2937' />
                <circle cx='32' cy='40.5' r='1.5' fill='#1F2937' />
                <circle cx='35.5' cy='40.5' r='1.5' fill='#1F2937' />
                <defs>
                    <linearGradient id='paint0_linear_1_2' x1='32' y1='0' x2='32' y2='64' gradientUnits='userSpaceOnUse'>
                        <stop stop-color='#8B5CF6' />
                        <stop offset='1' stop-color='#6D28D9' />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

export default ChatBot; 
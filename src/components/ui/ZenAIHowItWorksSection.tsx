import { motion } from 'framer-motion';

const ZenAIHowItWorksSection = () => {
    return (
        <div>
            <div className='flex flex-col md:flex-row justify-center items-start md:items-stretch gap-8'>
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className='flex-1 text-center'
                >
                    <h2 className='font-playfair text-[#362925] text-2xl md:text-3xl font-bold mb-4'>Conversational</h2>
                    <p className='text text-[#362925] text-lg leading-relaxed'>
                        Natural, intuitive chat experience — no scripting required.
                    </p>
                </motion.div>

                <div className='hidden md:block w-[1px] bg-gray-300 mx-4 self-stretch'></div>

                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='flex-1 text-center'
                >
                    <h2 className='font-playfair text-[#362925] text-2xl md:text-3xl font-bold mb-4'>Trained On ZenShift</h2>
                    <p className='text text-[#362925] text-lg leading-relaxed'>
                        Natural, intuitive chat experience — no scripting required.
                    </p>
                </motion.div>

                <div className='hidden md:block w-[1px] bg-gray-300 mx-4 self-stretch'></div>

                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className='flex-1 text-center'
                >
                    <h2 className='font-playfair text-[#362925] text-2xl md:text-3xl font-bold mb-4'>Evolving</h2>
                    <p className='text text-[#362925] text-lg leading-relaxed'>
                        Natural, intuitive chat experience — no scripting required.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default ZenAIHowItWorksSection; 
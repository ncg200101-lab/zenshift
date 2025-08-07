import zenAI from '../../assets/chatbot.gif';
import { useNavigate } from 'react-router-dom';
import Lottie from "lottie-react";
import loginAnimation from '../../assets/Zen_Ai.json';

const ChatBot = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/zen-ai');
    };

    return (
        <div
            className='fixed bottom-0 right-10 md:bottom-5 md:right-20 z-[1000] cursor-pointer'
            onClick={handleClick}
        >
            {/* <img src={zenAI} className='w-25 h-25 md:w-40 md:h-40' alt='' /> */}
            <div style={{ width: 200, height: 200, margin: "0 auto" }}>
                <Lottie
                    animationData={loginAnimation}
                    loop={true}        // keeps replaying infinitely
                    autoplay={true}    // starts automatically
                />
            </div>
        </div>
    );
};

export default ChatBot;

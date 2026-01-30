import { useState, useEffect } from 'react'
import hextech from '../assets/hextech.png'
import ux from '../assets/ux.png'
import innovation from '../assets/innovate.png'
import html from '../assets/html.png'
import wordpress from '../assets/wordpress.png'
import react from '../assets/physics.png'
import node from '../assets/nodejs.png'
import tailwind from '../assets/tailwind.png'
import css from '../assets/css.png'
import T from './T'

const Hero = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const phrases = ["Web Development", "Mobile Development", "UI/UX Design"];
    const images = [ux, innovation];

    useEffect(() => {
        const currentPhrase = phrases[loopNum % phrases.length];
        const shouldType = !isDeleting && text.length < currentPhrase.length;
        const shouldDelete = isDeleting && text.length > 0;

        const timeout = setTimeout(() => {
            if (shouldType) {
                setText(currentPhrase.substring(0, text.length + 1));
                setTypingSpeed(150);
            } else if (shouldDelete) {
                setText(currentPhrase.substring(0, text.length - 1));
                setTypingSpeed(75);
            } else if (isDeleting && text.length === 0) {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
                setTypingSpeed(500);
            } else if (!isDeleting && text.length === currentPhrase.length) {
                setIsDeleting(true);
                setTypingSpeed(2000); // Pause at the end before deleting
            }
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [text, isDeleting, loopNum, typingSpeed, phrases]);

    // Image transition effect for mobile
    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
                setIsVisible(true);
            }, 500); // Wait for fade out before changing image
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const techIcons = [wordpress, html, react, tailwind, css, node,wordpress, html, react, tailwind, css, node,wordpress, html, react, tailwind, css, node,wordpress, html, react, tailwind, css, node,wordpress, html, react, tailwind, css, node,wordpress, html, react, tailwind, css, node,wordpress, html, react, tailwind, css, node,wordpress, html, react, tailwind, css, node,wordpress, html, react, tailwind, css, node,wordpress, html, react, tailwind, css, node,wordpress, html, react, tailwind, css, node,wordpress, html, react, tailwind, css, node,wordpress, html, react, tailwind, css, node,wordpress, html, react, tailwind, css, node,wordpress, html, react, tailwind, css, node,wordpress, html, react, tailwind, css, node,];

    return (
        <div className="w-full h-auto flex flex-col items-center bg-secondary">
            <div className="text-4xl font-bold text-primary text-center mt-8 mb-4">
                {text}
                <span>_</span>
            </div>
            <div className="hidden md:flex gap-8 h-[45vh] px-8 my-4">
                <img src={ux} alt="ux" className="h-full object-contain hover:scale-90 transition-all duration-300" />
                <img src={innovation} alt="Inovate" className="h-full object-contain hover:scale-90 transition-all duration-300" />
            </div>
            <div className="flex md:hidden h-[45vh] px-8 my-4">
                <div className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <img 
                        src={images[currentImageIndex]} 
                        alt={currentImageIndex === 0 ? "ux" : "Innovate"} 
                        className="h-full object-contain hover:scale-90 transition-all duration-300" 
                    />
                </div>
            </div>
            <p className="text-white text-center max-w-2xl mx-auto mb-8 px-4 mt-4">
                <T>We are a team of experienced developers and designers who are passionate about creating beautiful and functional websites and mobile apps.</T>
            </p>
            <div className="bg-secondary py-4 flex justify-center mb-4">
                <div className="w-[35vh] md:w-[55vh] overflow-hidden relative">
                    <div className="flex animate-marquee min-w-max whitespace-nowrap">
                        {techIcons.map((icon, index) => (
                            <div key={index} className="mx-4">
                                <img src={icon} alt={`Tech ${index}`} className="h-[5vh] w-auto object-contain" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes marquee {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
                .animate-marquee {
                    animation: marquee 150s linear infinite;
                }
            `}</style>
        </div>
    )
}

export default Hero;

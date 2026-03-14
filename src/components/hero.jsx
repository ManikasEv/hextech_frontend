import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import ux from '../assets/ux.png'
import innovation from '../assets/innovate.png'
import html from '../assets/html.png'
import wordpress from '../assets/wordpress.png'
import react from '../assets/physics.png'
import node from '../assets/nodejs.png'
import tailwind from '../assets/tailwind.png'
import css from '../assets/css.png'
import T from './T'
import { useTranslation } from '../contexts/TranslationContext'
import { wordReveal } from '../utils/textAnimations'

const Hero = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const sectionRef = useRef(null);
    const typewriterRef = useRef(null);
    const imagesRef = useRef(null);
    const subtitleRef = useRef(null);
    const marqueeRef = useRef(null);

    const phrasesRaw = ["Web Development", "Mobile Development", "UI/UX Design"];
    const { language, translateText } = useTranslation();
    const [phrases, setPhrases] = useState(phrasesRaw);
    const images = [ux, innovation];

    // GSAP entrance animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.from(typewriterRef.current, { y: -40, opacity: 0, duration: 0.8 })
              .from(imagesRef.current, { y: 50, opacity: 0, duration: 0.9 }, '-=0.4')
              .from(marqueeRef.current, { opacity: 0, duration: 0.6 }, '-=0.3');

            // Subtitle word-reveal
            wordReveal(subtitleRef.current, { y: 20, duration: 0.8, delay: 0.5, start: 'top 100%' });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Ensure typewriter phrases actively translate (not cache-only).
    useEffect(() => {
        let mounted = true;
        const hydratePhrases = async () => {
            if (language === 'en') {
                if (mounted) setPhrases(phrasesRaw);
                return;
            }
            const translated = await Promise.all(
                phrasesRaw.map((p) => translateText(p, language))
            );
            if (mounted) setPhrases(translated);
        };
        hydratePhrases();
        return () => { mounted = false; };
    }, [language, translateText]);

    // Typewriter effect
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
                setTypingSpeed(2000);
            }
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [text, isDeleting, loopNum, typingSpeed, phrases]);

    // Mobile image transition
    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
                setIsVisible(true);
            }, 500);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const techIcons = [wordpress, html, react, tailwind, css, node,wordpress, html, react, tailwind, css, node,wordpress, html, react, tailwind, css, node,wordpress, html, react, tailwind, css, node,wordpress, html, react, tailwind, css, node,wordpress, html, react, tailwind, css, node,wordpress, html, react, tailwind, css, node,wordpress, html, react, tailwind, css, node,wordpress, html, react, tailwind, css, node,wordpress, html, react, tailwind, css, node,];

    return (
        <div ref={sectionRef} className="w-full h-auto flex flex-col items-center bg-secondary pt-16 md:pt-0">
            <div ref={typewriterRef} className="text-4xl font-bold text-primary text-center mt-8 mb-4">
                {text}
                <span className="cursor-blink">_</span>
            </div>
            <div ref={imagesRef} className="hidden md:flex gap-8 h-[45vh] px-8 my-4">
                <img src={ux} alt="ux" className="h-full object-contain hover:scale-95 transition-all duration-300" />
                <img src={innovation} alt="Inovate" className="h-full object-contain hover:scale-95 transition-all duration-300" />
            </div>
            <div className="flex md:hidden h-[45vh] px-8 my-4">
                <div className={`w-full h-full transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <img 
                        src={images[currentImageIndex]} 
                        alt={currentImageIndex === 0 ? "ux" : "Innovate"} 
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>
            <p ref={subtitleRef} className="text-white text-center max-w-2xl mx-auto mb-8 px-4 mt-4">
                <T>We are a team of experienced developers and designers who are passionate about creating beautiful and functional websites and mobile apps.</T>
            </p>
            <div ref={marqueeRef} className="bg-secondary py-4 flex justify-center mb-4">
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
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-marquee { animation: marquee 150s linear infinite; }
            `}</style>
        </div>
    )
}

export default Hero;

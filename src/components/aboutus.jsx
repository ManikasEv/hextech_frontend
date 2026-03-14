import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCounterAnimation } from '../hooks/useCounterAnimation';
import T from './T';

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
    const { count, isVisible, setIsVisible } = useCounterAnimation(20, 1800);
    const sectionRef = useRef(null);
    const cardsRef   = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(cardsRef.current, {
                y: 60, opacity: 0, duration: 0.8, stagger: 0.18, ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none none',
                    onEnter: () => setIsVisible(true),
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="about" className="py-16 bg-secondary">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Card 1 — counter */}
                    <div ref={el => cardsRef.current[0] = el} className="bg-white/5 border border-primary/20 rounded-lg shadow-xl">
                        <div className="p-6 flex flex-col items-center text-center">
                            <h1 className="text-6xl font-bold text-primary mb-2">
                                {count}<span className="ml-0.5">+</span>
                            </h1>
                            <h3 className="text-xl font-semibold text-white mb-3"><T>Projects</T></h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                <T>We have successfully delivered over 20 projects across various industries, helping businesses transform their digital presence and achieve their goals.</T>
                            </p>
                        </div>
                    </div>

                    {/* Card 2 — Mission */}
                    <div ref={el => cardsRef.current[1] = el} className="bg-white/5 border border-primary/20 rounded-lg shadow-xl">
                        <div className="p-6 flex flex-col items-center text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                            </svg>
                            <h3 className="text-xl font-semibold text-white mb-3"><T>Our Mission</T></h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                <T>We empower businesses through technology, creating digital solutions that solve complex problems and drive meaningful growth in an ever-evolving digital landscape.</T>
                            </p>
                        </div>
                    </div>

                    {/* Card 3 — Team */}
                    <div ref={el => cardsRef.current[2] = el} className="bg-white/5 border border-primary/20 rounded-lg shadow-xl">
                        <div className="p-6 flex flex-col items-center text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <h3 className="text-xl font-semibold text-white mb-3"><T>Our Team</T></h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                <T>Our diverse team of experts combines technical excellence with creative thinking, working collaboratively to deliver innovative solutions tailored to your unique needs.</T>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutUs;

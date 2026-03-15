import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import serviceNodes from '../interfaces/nodes';
import T from './T';
import { scrambleReveal, wordReveal } from '../utils/textAnimations';

gsap.registerPlugin(ScrollTrigger);

const FlipCard = ({ service, index }) => {
    const [flipped, setFlipped] = useState(false);
    const scrollRef = useRef(null);
    const isScrollingRef = useRef(false);

    const icons = [
        // Web Development
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>,
        // Hosting & Maintenance
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>,
        // Google SEO
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
        </svg>,
        // QR & Business Cards
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h6v6H3V3zm0 12h6v6H3v-6zm12-12h6v6h-6V3zm-1 12h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm4-4h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm2-6h2v2h-2v-2z" />
        </svg>,
    ];

    const handleMouseLeave = () => {
        // Don't flip back if user is scrolling the description
        if (isScrollingRef.current) return;
        setFlipped(false);
    };

    return (
        <div
            className="service-flip-card cursor-pointer"
            style={{ perspective: '1200px', width: '360px', height: '480px' }}
            onClick={() => setFlipped(!flipped)}
            onMouseEnter={() => setFlipped(true)}
            onMouseLeave={handleMouseLeave}
        >
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1)',
                    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
            >
                {/* FRONT */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                    }}
                    className="rounded-2xl border border-primary/25 bg-white/5 backdrop-blur-sm flex flex-col items-center justify-center gap-7 p-10 shadow-xl hover:border-primary/60 transition-colors duration-300"
                >
                    {/* Number badge */}
                    <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                        <span className="text-primary text-xs font-bold">{service.number}</span>
                    </div>

                    {/* Icon */}
                    <div className="text-primary">
                        {icons[index]}
                    </div>

                    {/* Title + short desc */}
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-white mb-3">
                            <T>{service.title}</T>
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            <T>{service.shortDesc}</T>
                        </p>
                    </div>

                    {/* Hint */}
                    <div className="flex items-center gap-1.5 text-primary/50 text-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span><T>Hover to learn more</T></span>
                    </div>
                </div>

                {/* BACK */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                    }}
                    className="rounded-2xl border border-primary bg-secondary flex flex-col p-8 shadow-2xl overflow-hidden"
                >
                    {/* Glow accent */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/15 via-transparent to-transparent pointer-events-none" />

                    {/* Small icon + title — fixed at top */}
                    <div className="flex-shrink-0 flex flex-col items-center mb-4">
                        <div className="text-primary/50 scale-50 -mb-5">
                            {icons[index]}
                        </div>
                        <h3 className="text-lg font-bold text-primary text-center">
                            <T>{service.title}</T>
                        </h3>
                    </div>

                    {/* Scrollable description — stops card from flipping back while scrolling */}
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto pr-1 back-scroll"
                        style={{ scrollBehavior: 'smooth' }}
                        onScroll={() => {
                            isScrollingRef.current = true;
                            clearTimeout(scrollRef.current._scrollTimer);
                            scrollRef.current._scrollTimer = setTimeout(() => {
                                isScrollingRef.current = false;
                            }, 300);
                        }}
                        onMouseEnter={() => { isScrollingRef.current = true; }}
                        onMouseLeave={() => { isScrollingRef.current = false; }}
                        onClick={e => e.stopPropagation()}
                    >
                        <p className="text-gray-300 text-sm leading-7 text-center">
                            <T>{service.description}</T>
                        </p>
                    </div>

                    {/* Button — fixed at bottom */}
                    <button
                        className="flex-shrink-0 mt-5 w-full py-3 bg-primary text-secondary font-semibold rounded-lg hover:bg-primary/90 active:scale-95 transition-all text-sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            const el = document.getElementById('contact');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        <T>Get Started</T>
                    </button>
                </div>
            </div>

            <style>{`
                .back-scroll {
                    scrollbar-width: none;
                    overscroll-behavior: contain;
                }
                .back-scroll::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
};

const Services = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const h2Ref = useRef(null);
    const subRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            scrambleReveal(h2Ref.current, { stagger: 0.03 });
            wordReveal(subRef.current, { y: 22, stagger: 0.06, delay: 0.3 });

            gsap.from('.service-flip-card', {
                y: 80,
                opacity: 0,
                duration: 0.7,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.services-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="services" className="bg-secondary min-h-screen py-20 flex flex-col justify-center items-center">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-16">
                    <h2 ref={h2Ref} className="text-5xl font-bold text-primary mb-4"><T>Services</T></h2>
                    <p ref={subRef} className="text-xl text-gray-400"><T>We build digital experiences that set you apart from the competition.</T></p>
                </div>

                {/* Cards grid */}
                <div className="services-grid flex flex-wrap justify-center gap-8">
                    {serviceNodes.map((service, index) => (
                        <FlipCard key={service.slug} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import LanguageSwitcher from './LanguageSwitcher';
import T from './T';

const Navbar = () => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navRef    = useRef(null);
    const logoRef   = useRef(null);
    const centerRef = useRef(null);
    const rightRef  = useRef(null);

    // Track scroll state via refs — no re-renders, no stale closures
    const lastScrollY  = useRef(0);
    const navHidden    = useRef(false);

    // Entrance animation on mount
    useEffect(() => {
        const links = centerRef.current?.querySelectorAll('a, button') ?? [];
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
        tl.fromTo(logoRef.current,  { x: -18, opacity: 0 }, { x: 0, opacity: 1, duration: 0.24 }, 0)
          .fromTo(links,             { y: -12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.22, stagger: 0 }, 0.02)
          .fromTo(rightRef.current,  { x: 18,  opacity: 0 }, { x: 0, opacity: 1, duration: 0.24 }, 0.02);
        return () => {
            tl.kill();
            gsap.set([logoRef.current, rightRef.current, ...links].filter(Boolean), { clearProps: 'all' });
        };
    }, []);

    // Hide on scroll down, show on scroll up
    useEffect(() => {
        const nav = navRef.current;
        if (!nav) return;

        const onScroll = () => {
            if (window.innerWidth < 768) return;
            const y = window.scrollY;
            const goingDown = y > lastScrollY.current;
            lastScrollY.current = y;

            if (goingDown && !navHidden.current && y > 80) {
                navHidden.current = true;
                gsap.to(nav, { y: '-100%', duration: 0.35, ease: 'power2.in', overwrite: true });
            } else if (!goingDown && navHidden.current) {
                navHidden.current = false;
                gsap.to(nav, { y: '0%', duration: 0.4, ease: 'power2.out', overwrite: true });
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollToContact = () => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else navigate('/#contact');
        setMobileMenuOpen(false);
    };

    return (
        <>
            <div ref={navRef} className="hidden md:flex md:justify-between md:w-full fixed top-0 left-0 right-0 z-50 bg-secondary border-b border-white/5">
                <div ref={logoRef} className="p-4">
                    <a href="/" className="text-2xl font-bold text-primary glitch" data-text="HEXTECH">HEXTECH</a>
                </div>

                <div ref={centerRef} className="flex items-center">
                    <a href="/" className="mx-4 hover:text-primary text-white transition-colors"><T>Home</T></a>
                    <a href="#services" className="mx-4 hover:text-primary text-white transition-colors"><T>Services</T></a>
                    <a href="#projects" className="mx-4 hover:text-primary text-white transition-colors"><T>Projects</T></a>
                    <a href="#about" className="mx-4 hover:text-primary text-white transition-colors"><T>About</T></a>
                    <a href="#contact" className="mx-4 hover:text-primary text-white transition-colors"><T>Contact</T></a>
                    <button onClick={() => navigate('/careers')} className="mx-4 hover:text-primary text-white transition-colors"><T>Careers</T></button>
                </div>

                <div ref={rightRef} className="flex items-center gap-2 p-4">
                    <LanguageSwitcher scrolled={false} />
                    <button onClick={scrollToContact} className="bg-primary text-secondary font-semibold px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                        <T>Get Started</T>
                    </button>
                </div>
            </div>

            <div className="md:hidden flex justify-between items-center w-full fixed top-0 left-0 right-0 z-50 bg-secondary p-4">
                <a href="/" className="text-2xl font-bold text-primary glitch" data-text="HEXTECH">HEXTECH</a>
                <div className="flex items-center gap-3">
                    <LanguageSwitcher scrolled={false} />
                    <button onClick={() => setMobileMenuOpen(p => !p)} className="text-primary focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen
                                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            }
                        </svg>
                    </button>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden fixed top-[64px] left-0 right-0 bg-secondary shadow-lg z-40">
                    <div className="flex flex-col py-4">
                        <a href="/" className="text-white py-2 px-6 hover:bg-primary/20" onClick={() => setMobileMenuOpen(false)}><T>Home</T></a>
                        <a href="#services" className="text-white py-2 px-6 hover:bg-primary/20" onClick={() => setMobileMenuOpen(false)}><T>Services</T></a>
                        <a href="#projects" className="text-white py-2 px-6 hover:bg-primary/20" onClick={() => setMobileMenuOpen(false)}><T>Projects</T></a>
                        <a href="#about" className="text-white py-2 px-6 hover:bg-primary/20" onClick={() => setMobileMenuOpen(false)}><T>About</T></a>
                        <a href="#contact" className="text-white py-2 px-6 hover:bg-primary/20" onClick={() => setMobileMenuOpen(false)}><T>Contact</T></a>
                        <button onClick={() => { navigate('/careers'); setMobileMenuOpen(false); }} className="text-white py-2 px-6 hover:bg-primary/20 text-left"><T>Careers</T></button>
                        <div className="px-6 py-4">
                            <button onClick={scrollToContact} className="w-full bg-primary text-secondary py-2 rounded-md font-semibold"><T>Get Started</T></button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;

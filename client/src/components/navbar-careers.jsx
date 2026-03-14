import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import LanguageSwitcher from './LanguageSwitcher';
import T from './T';

const NavbarCareers = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const logoRef   = useRef(null);
    const centerRef = useRef(null);
    const rightRef  = useRef(null);

    useEffect(() => {
        const links = centerRef.current?.querySelectorAll('button, a') ?? [];
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

        tl.fromTo(logoRef.current, { x: -18, opacity: 0 }, { x: 0, opacity: 1, duration: 0.24 }, 0)
          .fromTo(links, { y: -12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.22, stagger: 0 }, 0.02)
          .fromTo(rightRef.current, { x: 18, opacity: 0 }, { x: 0, opacity: 1, duration: 0.24 }, 0.02);

        return () => {
            tl.kill();
            const nodes = [logoRef.current, rightRef.current, ...links].filter(Boolean);
            if (nodes.length) gsap.set(nodes, { clearProps: 'all' });
        };
    }, []); // mount only

    return (
        <>
            {/* Desktop */}
            <div className="hidden md:flex md:justify-between md:w-full fixed top-0 z-50 bg-secondary transition-all duration-300">
                <div ref={logoRef} className="p-4">
                    <button onClick={() => navigate('/')} className="text-2xl font-bold text-primary glitch" data-text="HEXTECH">
                        HEXTECH
                    </button>
                </div>
                <div ref={centerRef} className="flex items-center">
                    <button onClick={() => navigate('/')} className="mx-4 hover:text-primary text-white transition-colors"><T>Home</T></button>
                </div>
                <div ref={rightRef} className="flex items-center gap-2 p-4">
                    <LanguageSwitcher scrolled={false} />
                    <button onClick={() => navigate('/')} className="bg-primary text-secondary px-4 py-2 rounded-md hover:bg-primary/90 transition-colors font-semibold">
                        <T>Back to Home</T>
                    </button>
                </div>
            </div>

            {/* Mobile top bar */}
            <div className="md:hidden flex justify-between items-center w-full fixed top-0 z-50 bg-secondary p-4">
                <div>
                    <button onClick={() => navigate('/')} className="text-2xl font-bold text-primary glitch" data-text="HEXTECH">
                        HEXTECH
                    </button>
                </div>
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

            {/* Mobile dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden fixed top-16 left-0 right-0 bg-secondary shadow-lg z-40">
                    <div className="flex flex-col py-4">
                        <button onClick={() => { navigate('/'); setMobileMenuOpen(false); }} className="text-white py-2 px-6 hover:bg-primary/20 text-left"><T>Home</T></button>
                        <div className="px-6 py-4">
                            <button onClick={() => { navigate('/'); setMobileMenuOpen(false); }} className="w-full bg-primary text-secondary py-2 rounded-md hover:bg-primary/90 transition-colors font-semibold">
                                <T>Back to Home</T>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default NavbarCareers;

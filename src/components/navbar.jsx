import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import T from './T';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Don't hide navbar if mobile menu is open
            if (!mobileMenuOpen) {
                // Determine if user is scrolling up or down
                if (currentScrollY > lastScrollY && visible && currentScrollY > 100) {
                    // Scrolling down & navbar is visible & past threshold
                    setVisible(false);
                } else if (currentScrollY < lastScrollY && !visible) {
                    // Scrolling up & navbar is hidden
                    setVisible(true);
                }
            }
            
            // Update background color based on scroll position
            if (currentScrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
            
            // Update last scroll position
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        
        // Clean up
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY, visible, mobileMenuOpen]);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <>
            {/* Desktop Menu */}
            <div className={`hidden md:flex md:justify-between md:w-full sticky z-10 transition-all duration-300 
                ${scrolled ? 'bg-white shadow-md' : 'bg-secondary'}
                ${visible ? 'top-0' : '-top-full'}
            `}>
                {/* left side */}
                <div className="p-4">
                    <a href="/" className={`text-2xl font-bold ${scrolled ? 'text-primary' : 'text-primary'}`}> HEXTECH </a>
                </div>
                {/* center side */}
                <div className="flex items-center">
                    <a href="/" className={`mx-4 hover:text-primary ${scrolled ? 'text-secondary' : 'text-white'}`}><T>Home</T></a>
                    <a href="#services" className={`mx-4 hover:text-primary ${scrolled ? 'text-secondary' : 'text-white'}`}><T>Services</T></a>
                    <a href="#projects" className={`mx-4 hover:text-primary ${scrolled ? 'text-secondary' : 'text-white'}`}><T>Projects</T></a>
                    <a href="#about" className={`mx-4 hover:text-primary ${scrolled ? 'text-secondary' : 'text-white'}`}><T>About</T></a>
                    <a href="#contact" className={`mx-4 hover:text-primary ${scrolled ? 'text-secondary' : 'text-white'}`}><T>Contact</T></a>
                    <button onClick={() => navigate('/careers')} className={`mx-4 hover:text-primary ${scrolled ? 'text-secondary' : 'text-white'}`}><T>Careers</T></button>
                </div>
                {/* right side */}
                <div className="flex items-center gap-2 p-4">
                    <LanguageSwitcher scrolled={scrolled} />
                    <button className="bg-primary text-white px-4 py-2 rounded-md"><T>Get Started</T></button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden flex justify-between items-center w-full sticky z-10 transition-all duration-300 
                ${scrolled ? 'bg-secondary shadow-md' : 'bg-secondary'} 
                ${visible ? 'top-0' : '-top-full'}
                p-4`}
            >
                {/* Mobile left - Logo */}
                <div>
                    <a href="#" className="text-2xl font-bold text-primary"> HEXTECH </a>
                </div>

                {/* Mobile right - Hamburger */}
                <div>
                    <button 
                        onClick={toggleMobileMenu}
                        className="text-primary focus:outline-none"
                    >
                        <svg 
                            className="w-6 h-6" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Items - Slide down when open */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-secondary shadow-lg sticky top-[64px] z-10">
                    <div className="flex flex-col py-4">
                        <a href="/" className="text-white py-2 px-6 hover:bg-primary/20" onClick={() => setMobileMenuOpen(false)}><T>Home</T></a>
                        <a href="#services" className="text-white py-2 px-6 hover:bg-primary/20" onClick={() => setMobileMenuOpen(false)}><T>Services</T></a>
                        <a href="#projects" className="text-white py-2 px-6 hover:bg-primary/20" onClick={() => setMobileMenuOpen(false)}><T>Projects</T></a>
                        <a href="#about" className="text-white py-2 px-6 hover:bg-primary/20" onClick={() => setMobileMenuOpen(false)}><T>About</T></a>
                        <a href="#contact" className="text-white py-2 px-6 hover:bg-primary/20" onClick={() => setMobileMenuOpen(false)}><T>Contact</T></a>
                        <button onClick={() => { navigate('/careers'); setMobileMenuOpen(false); }} className="text-white py-2 px-6 hover:bg-primary/20 text-left"><T>Careers</T></button>
                        <div className="px-6 py-2 flex justify-center">
                            <LanguageSwitcher scrolled={false} />
                        </div>
                        <div className="px-6 py-4">
                            <button className="w-full bg-primary text-white py-2 rounded-md"><T>Get Started</T></button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Navbar;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Determine if user is scrolling up or down
            if (currentScrollY > lastScrollY && visible && currentScrollY > 100) {
                // Scrolling down & navbar is visible & past threshold
                setVisible(false);
            } else if (currentScrollY < lastScrollY && !visible) {
                // Scrolling up & navbar is hidden
                setVisible(true);
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
    }, [lastScrollY, visible]);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const smoothScrollTo = (elementId) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
        setMobileMenuOpen(false); // Close mobile menu after click
    };

    const handleNavClick = (e, sectionId) => {
        e.preventDefault();
        smoothScrollTo(sectionId);
    };

    return (
        <>
            {/* Desktop Menu */}
            <div className={`hidden md:flex md:justify-between md:w-full fixed z-10 transition-all duration-300 
                ${scrolled ? 'bg-white shadow-md' : 'bg-secondary'}
                ${visible ? 'top-0' : '-top-full'}
            `}>
                {/* left side */}
                <div className="p-4">
                    <a href="/" className={`text-2xl font-bold ${scrolled ? 'text-primary' : 'text-primary'}`}> HEXTECH </a>
                </div>
                {/* center side */}
                <div className="flex items-center">
                    <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`mx-4 hover:text-primary ${scrolled ? 'text-secondary' : 'text-white'}`}>Home</a>
                    <a href="#" onClick={(e) => handleNavClick(e, 'services')} className={`mx-4 hover:text-primary ${scrolled ? 'text-secondary' : 'text-white'}`}>Services</a>
                    <a href="#" onClick={(e) => handleNavClick(e, 'projects')} className={`mx-4 hover:text-primary ${scrolled ? 'text-secondary' : 'text-white'}`}>Projects</a>
                    <a href="#" onClick={(e) => handleNavClick(e, 'pricing')} className={`mx-4 hover:text-primary ${scrolled ? 'text-secondary' : 'text-white'}`}>Pricing</a>
                    <a href="#" onClick={(e) => handleNavClick(e, 'about')} className={`mx-4 hover:text-primary ${scrolled ? 'text-secondary' : 'text-white'}`}>About</a>
                    <a href="#" onClick={(e) => handleNavClick(e, 'contact')} className={`mx-4 hover:text-primary ${scrolled ? 'text-secondary' : 'text-white'}`}>Contact</a>
                    <Link to="/careers" className={`mx-4 hover:text-primary ${scrolled ? 'text-secondary' : 'text-white'}`}>Careers</Link>
                </div>
                {/* right side */}
                <div className="flex items-center p-4">
                    <button className="bg-primary text-white px-4 py-2 rounded-md">Get Started</button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden flex justify-between items-center w-full fixed z-10 transition-all duration-300 
                ${scrolled ? 'bg-white shadow-md' : 'bg-secondary'} 
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
                        className="text-white focus:outline-none"
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
            {mobileMenuOpen && visible && (
                <div className="md:hidden bg-secondary shadow-lg fixed top-16 w-full z-10 max-h-[calc(100vh-4rem)] overflow-y-auto">
                    <div className="flex flex-col py-4">
                        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }} className="text-white py-2 px-6 hover:bg-primary/20">Home</a>
                        <a href="#" onClick={(e) => handleNavClick(e, 'services')} className="text-white py-2 px-6 hover:bg-primary/20">Services</a>
                        <a href="#" onClick={(e) => handleNavClick(e, 'process')} className="text-white py-2 px-6 hover:bg-primary/20">Process</a>
                        <a href="#" onClick={(e) => handleNavClick(e, 'projects')} className="text-white py-2 px-6 hover:bg-primary/20">Projects</a>
                        <a href="#" onClick={(e) => handleNavClick(e, 'pricing')} className="text-white py-2 px-6 hover:bg-primary/20">Pricing</a>
                        <a href="#" onClick={(e) => handleNavClick(e, 'faq')} className="text-white py-2 px-6 hover:bg-primary/20">FAQ</a>
                        <a href="#" onClick={(e) => handleNavClick(e, 'about')} className="text-white py-2 px-6 hover:bg-primary/20">About</a>
                        <a href="#" onClick={(e) => handleNavClick(e, 'contact')} className="text-white py-2 px-6 hover:bg-primary/20">Contact</a>
                        <Link to="/careers" onClick={() => setMobileMenuOpen(false)} className="text-white py-2 px-6 hover:bg-primary/20">Careers</Link>
                        <div className="px-6 py-4">
                            <button 
                                onClick={(e) => {
                                    handleNavClick(e, 'contact');
                                }}
                                className="w-full bg-primary text-white py-2 rounded-md"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Navbar;

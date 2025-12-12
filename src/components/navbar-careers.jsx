import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavbarCareers = () => {
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

    return (
        <>
            {/* Desktop Menu */}
            <div className={`hidden md:flex md:justify-between md:w-full fixed z-10 transition-all duration-300 
                ${scrolled ? 'bg-white shadow-md' : 'bg-secondary'}
                ${visible ? 'top-0' : '-top-full'}
            `}>
                {/* left side */}
                <div className="p-4">
                    <Link to="/" className={`text-2xl font-bold ${scrolled ? 'text-primary' : 'text-primary'}`}> HEXTECH </Link>
                </div>
                {/* center side */}
                <div className="flex items-center">
                    <Link to="/" className={`mx-4 hover:text-primary ${scrolled ? 'text-secondary' : 'text-white'}`}>Home</Link>
                    <Link to="/careers" className={`mx-4 hover:text-primary ${scrolled ? 'text-secondary' : 'text-white'} font-semibold`}>Careers</Link>
                </div>
                {/* right side */}
                <div className="flex items-center p-4">
                    <Link to="/" className="bg-primary text-white px-4 py-2 rounded-md">Get Started</Link>
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
                    <Link to="/" className="text-2xl font-bold text-primary"> HEXTECH </Link>
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
                <div className="md:hidden bg-secondary shadow-lg fixed top-16 w-full z-10">
                    <div className="flex flex-col py-4">
                        <Link to="/" className="text-white py-2 px-6 hover:bg-primary/20">Home</Link>
                        <Link to="/careers" className="text-white py-2 px-6 hover:bg-primary/20 font-semibold">Careers</Link>
                        <div className="px-6 py-4">
                            <Link to="/" className="w-full bg-primary text-white py-2 rounded-md block text-center">Get Started</Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default NavbarCareers;


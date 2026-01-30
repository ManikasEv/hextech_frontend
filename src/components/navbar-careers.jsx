import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import T from './T';

const NavbarCareers = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <>
            {/* Desktop Menu */}
            <div className={`hidden md:flex md:justify-between md:w-full fixed top-0 z-50 transition-all duration-300 
                ${scrolled ? 'bg-white shadow-md' : 'bg-secondary'}
            `}>
                {/* left side */}
                <div className="p-4">
                    <button 
                        onClick={() => navigate('/')}
                        className={`text-2xl font-bold ${scrolled ? 'text-primary' : 'text-primary'}`}
                    >
                        HEXTECH
                    </button>
                </div>
                {/* center side */}
                <div className="flex items-center">
                    <button onClick={() => navigate('/')} className={`mx-4 hover:text-primary ${scrolled ? 'text-secondary' : 'text-white'}`}><T>Home</T></button>
                </div>
                {/* right side */}
                <div className="flex items-center gap-2 p-4">
                    <LanguageSwitcher scrolled={scrolled} />
                    <button 
                        onClick={() => navigate('/')}
                        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                    >
                        <T>Back to Home</T>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden flex justify-between items-center w-full fixed top-0 z-50 transition-all duration-300 
                ${scrolled ? 'bg-white shadow-md' : 'bg-secondary'} 
                p-4`}
            >
                {/* Mobile left - Logo */}
                <div>
                    <button 
                        onClick={() => navigate('/')}
                        className="text-2xl font-bold text-primary"
                    >
                        HEXTECH
                    </button>
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
            {mobileMenuOpen && (
                <div className="md:hidden fixed top-16 left-0 right-0 bg-secondary shadow-lg z-40">
                    <div className="flex flex-col py-4">
                        <button onClick={() => { navigate('/'); setMobileMenuOpen(false); }} className="text-white py-2 px-6 hover:bg-primary/20 text-left"><T>Home</T></button>
                        <div className="px-6 py-2 flex justify-center">
                            <LanguageSwitcher scrolled={false} />
                        </div>
                        <div className="px-6 py-4">
                            <button 
                                onClick={() => { navigate('/'); setMobileMenuOpen(false); }}
                                className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors"
                            >
                                <T>Back to Home</T>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default NavbarCareers;


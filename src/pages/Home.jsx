import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/navbar';
import Hero from '../components/hero';
import AboutUs from '../components/aboutus';
import Services from '../components/services';
import Process from '../components/process';
import Projects from '../components/projects';
import FAQ from '../components/faq';
import CTA from '../components/cta';
import Reviews from '../components/reviews';
import Contact from '../components/contact';
import Footer from '../components/footer';

const Home = () => {
    const location = useLocation();

    // Scroll to top when component mounts or location changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <>
            <Navbar />
            <Hero />
            <AboutUs />
            <Services />
            <Process />
            <Projects />
            <FAQ />
            <CTA />
            <Reviews />
            <Contact />
            <Footer />
        </>
    );
};

export default Home;


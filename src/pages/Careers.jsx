import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Mail } from 'lucide-react';
import NavbarCareers from '../components/navbar-careers';
import FooterCareers from '../components/footer-careers';
import T from '../components/T';
import { scrambleReveal, wordReveal } from '../utils/textAnimations';

gsap.registerPlugin(ScrollTrigger);

const Careers = () => {
    const heroRef = useRef(null);
    const heroH1Ref = useRef(null);
    const heroSubRef = useRef(null);
    const benefitsHeaderRef = useRef(null);
    const benefitCardsRef = useRef([]);
    const positionsRef = useRef(null);
    const ctaRef = useRef(null);

    const benefits = [
        { title: "Competitive Salary",  description: "We offer market-leading compensation packages" },
        { title: "Flexible Hours",       description: "Work when you're most productive" },
        { title: "Remote Options",       description: "Hybrid or fully remote work available" },
        { title: "Learning Budget",      description: "Annual budget for courses and conferences" },
        { title: "Modern Tech",          description: "Work with the latest technologies and tools" },
        { title: "Team Events",          description: "Regular team activities and celebrations" },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero entrance
            gsap.from(heroRef.current, {
                y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
            });
            scrambleReveal(heroH1Ref.current, { stagger: 0.04, start: 'top 100%' });
            wordReveal(heroSubRef.current, { y: 22, stagger: 0.06, delay: 0.4, start: 'top 100%' });

            // Benefits header
            scrambleReveal(benefitsHeaderRef.current, { stagger: 0.03 });

            // Benefit cards stagger
            gsap.from(benefitCardsRef.current, {
                y: 50, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
                scrollTrigger: { trigger: benefitCardsRef.current[0], start: 'top 85%', toggleActions: 'play none none none' },
            });

            // Open positions box
            gsap.from(positionsRef.current, {
                y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: positionsRef.current, start: 'top 80%', toggleActions: 'play none none none' },
            });

            // CTA section
            gsap.from(ctaRef.current, {
                y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
                scrollTrigger: { trigger: ctaRef.current, start: 'top 85%', toggleActions: 'play none none none' },
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="bg-secondary min-h-screen">
            <NavbarCareers />

            {/* Hero */}
            <section className="pt-32 pb-16 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div ref={heroRef} className="text-center">
                        <h1 ref={heroH1Ref} className="text-5xl md:text-6xl font-bold text-primary mb-6">
                            <T>Join Our Team</T>
                        </h1>
                        <p ref={heroSubRef} className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                            <T>Be part of a dynamic team building innovative digital solutions for clients across Switzerland and beyond.</T>
                        </p>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-16 px-4 bg-secondary">
                <div className="container mx-auto max-w-6xl">
                    <h2 ref={benefitsHeaderRef} className="text-4xl font-bold text-primary text-center mb-12">
                        <T>Why Work With Us?</T>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                ref={el => benefitCardsRef.current[index] = el}
                                className="bg-secondary border border-primary/20 rounded-lg p-6 hover:border-primary/50 transition-colors duration-300"
                            >
                                <h3 className="text-xl font-bold text-primary mb-2"><T>{benefit.title}</T></h3>
                                <p className="text-gray-300"><T>{benefit.description}</T></p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-4xl font-bold text-primary text-center mb-12">
                        <T>Open Positions</T>
                    </h2>
                    <div
                        ref={positionsRef}
                        className="bg-white/5 border border-primary/20 rounded-lg p-12 text-center"
                    >
                        <Briefcase className="w-20 h-20 mx-auto mb-6 text-primary/50" />
                        <h3 className="text-3xl font-bold text-primary mb-4">
                            <T>No Available Positions Right Now</T>
                        </h3>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            <T>We don't have any open positions at the moment, but we're always interested in connecting with talented professionals.</T>
                        </p>
                        <div className="border border-primary/30 rounded-lg p-6 max-w-md mx-auto">
                            <p className="text-gray-300 mb-4"><T>Send your CV to</T>:</p>
                            <a
                                href="mailto:info@hextech.ch"
                                className="inline-flex items-center gap-2 text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
                            >
                                <Mail className="w-6 h-6" />
                                info@hextech.ch
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Application CTA */}
            <section id="apply" className="py-16 px-4 bg-secondary border-t border-primary/20">
                <div className="container mx-auto max-w-4xl text-center">
                    <div ref={ctaRef}>
                        <Mail className="w-16 h-16 mx-auto mb-6 text-primary" />
                        <h2 className="text-4xl font-bold text-primary mb-4">
                            <T>Interested in Joining Us?</T>
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            <T>We're always looking for talented individuals. Send your CV and we'll get in touch if there's a fit.</T>
                        </p>
                        <div className="inline-block border border-primary/20 rounded-lg p-6">
                            <p className="text-sm text-gray-400 mb-2"><T>Send applications to</T>:</p>
                            <a
                                href="mailto:info@hextech.ch"
                                className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-2"
                            >
                                <Mail className="w-6 h-6" />
                                info@hextech.ch
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <FooterCareers />
        </div>
    );
};

export default Careers;

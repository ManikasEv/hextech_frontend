import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import T from './T';
import { scrambleReveal, wordReveal } from '../utils/textAnimations';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
    const sectionRef = useRef(null);
    const boxRef = useRef(null);
    const headingRef = useRef(null);
    const subRef = useRef(null);
    const buttonsRef = useRef(null);
    const contactRef = useRef(null);
    const statsRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: boxRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
                defaults: { ease: 'power3.out' },
            });

            tl.from(boxRef.current, { scale: 0.95, opacity: 0, duration: 0.8 })
              .from(buttonsRef.current, { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
              .from(contactRef.current, { opacity: 0, duration: 0.5 }, '-=0.2');

            scrambleReveal(headingRef.current, { stagger: 0.025, delay: 0.4 });
            wordReveal(subRef.current, { y: 24, stagger: 0.06, delay: 0.2 });

            // Stats count-up style stagger
            gsap.from('.cta-stat', {
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: statsRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-secondary py-20 border-t border-primary/20">
            <div className="container mx-auto px-4">
                <div ref={boxRef} className="max-w-5xl mx-auto bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-3xl p-12 border border-primary/30">
                    <div className="text-center">
                        <h2 ref={headingRef} className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
                            <T>Ready to Transform Your Digital Presence?</T>
                        </h2>
                        <p ref={subRef} className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
                            <T>Let's build something amazing together. Get in touch with our team and start your journey to digital success.</T>
                        </p>

                        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                            <a
                                href="#contact"
                                className="group px-8 py-4 bg-primary text-secondary rounded-lg font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2"
                            >
                                <T>Get Started Now</T>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a
                                href="#services"
                                className="px-8 py-4 bg-transparent text-primary rounded-lg font-semibold text-lg border-2 border-primary hover:bg-primary/10 hover:scale-105 transition-all"
                            >
                                <T>View Our Services</T>
                            </a>
                        </div>

                        <div ref={contactRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center text-gray-400">
                            <div className="flex items-center gap-2">
                                <Mail className="w-5 h-5 text-primary" />
                                <span>info@hextech-it.ch</span>
                            </div>
                            <div className="hidden sm:block w-px h-6 bg-primary/30"></div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-5 h-5 text-primary" />
                                <span><T>Based in Switzerland</T></span>
                            </div>
                        </div>
                    </div>

                    <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-primary/20">
                        {[
                            { value: '20+', label: 'Projects Delivered' },
                            { value: '100%', label: 'Client Satisfaction' },
                            { value: '24/7', label: 'Support Available' },
                            { value: '5+', label: 'Years Experience' },
                        ].map((stat, i) => (
                            <div key={i} className="cta-stat text-center">
                                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                                <div className="text-gray-400"><T>{stat.label}</T></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;

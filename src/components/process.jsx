import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Lightbulb, Code, Rocket, MessageSquare, CheckCircle } from 'lucide-react';
import T from './T';
import { scrambleReveal, wordReveal } from '../utils/textAnimations';

gsap.registerPlugin(ScrollTrigger);

const Process = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const h2Ref = useRef(null);
    const subRef = useRef(null);
    const ctaRef = useRef(null);
    const stepsRef = useRef([]);
    const stepDescRefs = useRef([]);

    const steps = [
        { number: "01", title: "Discovery & Consultation", description: "We start by understanding your business goals, target audience, and project requirements through detailed discussions.", icon: Search, color: "from-cyan-400 to-blue-500" },
        { number: "02", title: "Planning & Strategy", description: "Our team creates a comprehensive project roadmap, defining timelines, milestones, and technical specifications.", icon: Lightbulb, color: "from-blue-500 to-purple-500" },
        { number: "03", title: "Design & Prototyping", description: "We craft intuitive UI/UX designs and interactive prototypes to visualize your product before development begins.", icon: MessageSquare, color: "from-purple-500 to-pink-500" },
        { number: "04", title: "Development", description: "Our expert developers bring designs to life using cutting-edge technologies and best coding practices.", icon: Code, color: "from-pink-500 to-red-500" },
        { number: "05", title: "Testing & Quality Assurance", description: "Rigorous testing ensures your product is bug-free, secure, and performs optimally across all devices.", icon: CheckCircle, color: "from-red-500 to-orange-500" },
        { number: "06", title: "Launch & Support", description: "We deploy your product and provide ongoing maintenance, updates, and technical support to ensure success.", icon: Rocket, color: "from-orange-500 to-primary" },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            scrambleReveal(h2Ref.current, { stagger: 0.03 });
            wordReveal(subRef.current, { y: 22, stagger: 0.06, delay: 0.3 });

            // Header slides down
            gsap.from(headerRef.current, {
                y: -50,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });

            // Steps stagger in with alternating left/right
            stepsRef.current.forEach((el, i) => {
                if (!el) return;
                gsap.from(el, {
                    x: i % 2 === 0 ? -60 : 60,
                    opacity: 0,
                    duration: 0.7,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                });
            });

            // Word-reveal on each step description
            stepDescRefs.current.forEach(el => {
                if (!el) return;
                wordReveal(el, { y: 24, stagger: 0.05, duration: 0.55 });
            });

            // CTA fade in
            gsap.from(ctaRef.current, {
                y: 30,
                opacity: 0,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: ctaRef.current,
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="process" className="py-12 sm:py-16 md:min-h-screen md:py-16">
            <div className="container mx-auto px-4">
                <div ref={headerRef} className="text-center mb-8 sm:mb-12 md:mb-16">
                    <h2 ref={h2Ref} className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-3 sm:mb-4"><T>Our Process</T></h2>
                    <p ref={subRef} className="text-base sm:text-xl text-gray-400"><T>A proven methodology to bring your ideas to life</T></p>
                    <p className="mt-3 text-xs text-primary/60 lg:hidden"><T>Swipe to explore</T></p>
                </div>
            </div>

            {/* Mobile / tablet: horizontal scroll · Desktop: 3-col grid */}
            <div className="w-full">
                <div className="flex lg:grid lg:grid-cols-3 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none gap-5 sm:gap-6 lg:gap-8 px-4 sm:px-6 lg:px-4 lg:max-w-6xl lg:mx-auto pb-4 lg:pb-0 scrollbar-none">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div
                                key={index}
                                ref={el => stepsRef.current[index] = el}
                                className="relative group flex-shrink-0 w-[min(82vw,340px)] sm:w-[min(70vw,380px)] lg:w-auto snap-center"
                            >
                                <div className="bg-white/5 rounded-2xl p-6 sm:p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-300 border border-primary/20">
                                    <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
                                        {step.number}
                                    </div>
                                    <div className={`mb-5 sm:mb-6 mt-3 sm:mt-4 inline-block p-3 sm:p-4 rounded-xl bg-gradient-to-br ${step.color}`}>
                                        <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3 sm:mb-4">
                                        <T>{step.title}</T>
                                    </h3>
                                    <p ref={el => stepDescRefs.current[index] = el} className="text-sm sm:text-base text-gray-400 leading-relaxed">
                                        <T>{step.description}</T>
                                    </p>
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"></div>
                                </div>
                            </div>
                        );
                    })}
                    <div className="flex-shrink-0 w-2 lg:hidden" aria-hidden="true" />
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div ref={ctaRef} className="text-center mt-10 sm:mt-14 md:mt-16">
                    <a
                        href="#contact"
                        className="inline-block px-8 py-4 bg-primary text-secondary rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg"
                    >
                        <T>Start Your Project</T>
                    </a>
                </div>
            </div>

            <style>{`
                .scrollbar-none {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                    -webkit-overflow-scrolling: touch;
                }
                .scrollbar-none::-webkit-scrollbar { display: none; }
            `}</style>
        </section>
    );
};

export default Process;

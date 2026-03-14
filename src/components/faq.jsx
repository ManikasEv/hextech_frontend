import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';
import T from './T';
import { scrambleReveal, wordReveal } from '../utils/textAnimations';

gsap.registerPlugin(ScrollTrigger);

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const h2Ref = useRef(null);
    const subRef = useRef(null);
    const itemsRef = useRef([]);
    const ctaRef = useRef(null);
    const answerRefs = useRef({});

    const faqs = [
        { question: "How long does it take to build a website?", answer: "The timeline varies based on project complexity. A basic website typically takes 2-4 weeks, while more complex projects with custom features can take 8-12 weeks. We provide a detailed timeline during our initial consultation." },
        { question: "What technologies do you use?", answer: "We use modern, industry-standard technologies including React, Node.js, Next.js, Tailwind CSS, and various databases. We choose the best tech stack based on your specific project requirements and goals." },
        { question: "Do you provide ongoing support after launch?", answer: "Yes! All our packages include post-launch support. We offer maintenance plans ranging from 30 days to 12 months, depending on your chosen package. We're here to help with updates, bug fixes, and improvements." },
        { question: "Can you help with mobile app development?", answer: "Absolutely! We specialize in both iOS and Android app development using React Native and native technologies. We can create cross-platform apps or platform-specific solutions based on your needs." },
        { question: "What is your pricing structure?", answer: "We offer flexible pricing based on project scope and requirements. Our packages start from CHF 2,500 for basic websites. For custom projects, we provide detailed quotes after understanding your needs. All prices exclude VAT." },
        { question: "Do you work with clients outside of Zurich?", answer: "Yes! While we're based in Zurich, we work with clients throughout Switzerland and internationally. We're comfortable conducting meetings remotely and can travel when necessary." },
        { question: "Will my website be mobile-friendly?", answer: "Absolutely! All our websites are fully responsive and optimized for mobile devices, tablets, and desktops. Mobile-first design is a core part of our development process." },
        { question: "Can you help with SEO and digital marketing?", answer: "Yes! We implement SEO best practices in all our projects, including proper meta tags, structured data, and performance optimization. We can also connect you with our marketing partners for comprehensive digital marketing strategies." },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            scrambleReveal(h2Ref.current, { stagger: 0.025 });
            wordReveal(subRef.current, { y: 22, stagger: 0.06, delay: 0.3 });

            gsap.from(itemsRef.current, {
                y: 50,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: itemsRef.current[0],
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });

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

    const toggleFAQ = (index) => {
        const isOpening = openIndex !== index;
        setOpenIndex(isOpening ? index : null);

        // Animate the answer panel
        const el = answerRefs.current[index];
        if (!el) return;

        if (isOpening) {
            gsap.fromTo(el,
                { height: 0, opacity: 0 },
                { height: 'auto', opacity: 1, duration: 0.35, ease: 'power2.out' }
            );
        } else {
            gsap.to(el, { height: 0, opacity: 0, duration: 0.25, ease: 'power2.in' });
        }
    };

    return (
        <section ref={sectionRef} id="faq" className="bg-secondary min-h-screen py-16 flex items-center">
            <div className="container mx-auto px-4">
                <div ref={headerRef} className="text-center mb-16">
                    <h2 ref={h2Ref} className="text-5xl font-bold text-primary mb-4"><T>Frequently Asked Questions</T></h2>
                    <p ref={subRef} className="text-xl text-gray-400"><T>Got questions? We've got answers</T></p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            ref={el => itemsRef.current[index] = el}
                            className="mb-4"
                        >
                            <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-primary/20 overflow-hidden">
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                                >
                                    <span className="text-lg font-semibold text-white pr-4">
                                        <T>{faq.question}</T>
                                    </span>
                                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-secondary">
                                        {openIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                    </span>
                                </button>

                                <div
                                    ref={el => answerRefs.current[index] = el}
                                    style={{ height: 0, overflow: 'hidden', opacity: 0 }}
                                >
                                    <div className="px-6 pb-5 text-gray-400 leading-relaxed border-t border-primary/10 pt-4">
                                        <T>{faq.answer}</T>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div ref={ctaRef} className="text-center mt-12">
                    <p className="text-gray-400 mb-4"><T>Still have questions?</T></p>
                    <a
                        href="#contact"
                        className="inline-block px-8 py-3 bg-primary text-secondary rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                    >
                        <T>Contact Us</T>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FAQ;

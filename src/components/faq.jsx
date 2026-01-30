import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import T from './T';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "How long does it take to build a website?",
            answer: "The timeline varies based on project complexity. A basic website typically takes 2-4 weeks, while more complex projects with custom features can take 8-12 weeks. We provide a detailed timeline during our initial consultation."
        },
        {
            question: "What technologies do you use?",
            answer: "We use modern, industry-standard technologies including React, Node.js, Next.js, Tailwind CSS, and various databases. We choose the best tech stack based on your specific project requirements and goals."
        },
        {
            question: "Do you provide ongoing support after launch?",
            answer: "Yes! All our packages include post-launch support. We offer maintenance plans ranging from 30 days to 12 months, depending on your chosen package. We're here to help with updates, bug fixes, and improvements."
        },
        {
            question: "Can you help with mobile app development?",
            answer: "Absolutely! We specialize in both iOS and Android app development using React Native and native technologies. We can create cross-platform apps or platform-specific solutions based on your needs."
        },
        {
            question: "What is your pricing structure?",
            answer: "We offer flexible pricing based on project scope and requirements. Our packages start from CHF 2,500 for basic websites. For custom projects, we provide detailed quotes after understanding your needs. All prices exclude VAT."
        },
        {
            question: "Do you work with clients outside of Zurich?",
            answer: "Yes! While we're based in Zurich, we work with clients throughout Switzerland and internationally. We're comfortable conducting meetings remotely and can travel when necessary."
        },
        {
            question: "Will my website be mobile-friendly?",
            answer: "Absolutely! All our websites are fully responsive and optimized for mobile devices, tablets, and desktops. Mobile-first design is a core part of our development process."
        },
        {
            question: "Can you help with SEO and digital marketing?",
            answer: "Yes! We implement SEO best practices in all our projects, including proper meta tags, structured data, and performance optimization. We can also connect you with our marketing partners for comprehensive digital marketing strategies."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="bg-secondary min-h-screen py-16 flex items-center">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-bold text-primary mb-4"><T>Frequently Asked Questions</T></h2>
                    <p className="text-xl text-gray-300"><T>Got questions? We've got answers</T></p>
                </motion.div>

                {/* FAQ List */}
                <div className="max-w-4xl mx-auto">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
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
                                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white">
                                        {openIndex === index ? (
                                            <Minus className="w-5 h-5" />
                                        ) : (
                                            <Plus className="w-5 h-5" />
                                        )}
                                    </span>
                                </button>
                                
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-5 text-gray-300 leading-relaxed border-t border-primary/10 pt-4">
                                                <T>{faq.answer}</T>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Still have questions CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center mt-12"
                >
                    <p className="text-gray-300 mb-4"><T>Still have questions?</T></p>
                    <a 
                        href="#contact"
                        className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                    >
                        <T>Contact Us</T>
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;



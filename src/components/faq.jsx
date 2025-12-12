import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            id: 1,
            question: "How long does it take to build a website?",
            answer: "The timeline depends on the project's complexity. A simple website typically takes 1-2 weeks, while more complex applications can take 4-8 weeks. We provide a detailed timeline during our initial consultation and keep you updated throughout the development process."
        },
        {
            id: 2,
            question: "What information do you need to start my project?",
            answer: "To get started, we need your business goals, target audience information, design preferences, and any specific features you want. We'll also need content (text, images, logos) or can help you create it. During our consultation, we'll guide you through everything needed."
        },
        {
            id: 3,
            question: "Do you offer website maintenance after launch?",
            answer: "Yes! We offer two maintenance plans: Essential Plan (150 CHF/year) for basic updates and corrections, and Professional Plan (300 CHF/year) for ongoing improvements and new content sections. Both include technical updates and support."
        },
        {
            id: 4,
            question: "Will my website be mobile-friendly?",
            answer: "Absolutely! All our websites are fully responsive and optimized for mobile devices, tablets, and desktops. We follow mobile-first design principles to ensure your site looks great and functions perfectly on any screen size."
        },
        {
            id: 5,
            question: "Can I update the website content myself?",
            answer: "Yes, if you prefer to manage content yourself, we can build your site with a user-friendly content management system (CMS). We also provide training on how to use it. Alternatively, our maintenance plans include content updates handled by our team."
        },
        {
            id: 6,
            question: "What technologies do you use?",
            answer: "We work with modern, industry-standard technologies including React, Node.js, WordPress, and various frameworks like Tailwind CSS. We choose the best technology stack based on your specific needs, ensuring optimal performance and scalability."
        },
        {
            id: 7,
            question: "Do you provide hosting services?",
            answer: "While we don't provide hosting directly, we can recommend reliable hosting providers and help you set up your hosting environment. We can also manage the deployment process and ensure your website is properly configured for optimal performance."
        },
        {
            id: 8,
            question: "What about SEO and online visibility?",
            answer: "All our websites are built with SEO best practices in mind, including proper structure, meta tags, fast loading times, and mobile optimization. Our maintenance plans also include yearly SEO refreshes to keep your site optimized for search engines."
        },
        {
            id: 9,
            question: "How much does a website cost?",
            answer: "Project costs vary based on complexity, features, and design requirements. Simple websites start from a few thousand CHF, while complex applications require custom quotes. Contact us for a free consultation and detailed quote tailored to your specific needs."
        },
        {
            id: 10,
            question: "What if I need changes after the website is live?",
            answer: "That's what our maintenance plans are for! Both Essential and Professional plans cover various types of updates. For larger changes outside the maintenance scope, we provide affordable hourly rates and can discuss custom solutions for your needs."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8 }
        }
    };

    return (
        <motion.section 
            id="faq" 
            className="py-20 bg-gray-50"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionVariants}
        >
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-bold text-secondary mb-4">Frequently Asked Questions</h2>
                    <p className="text-xl text-gray-600">Everything you need to know about working with us</p>
                </div>

                {/* FAQ Items */}
                <div className="max-w-4xl mx-auto">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={faq.id}
                            className="mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                {/* Question Button */}
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-lg font-semibold text-secondary pr-8">
                                        {faq.question}
                                    </span>
                                    <motion.div
                                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex-shrink-0"
                                    >
                                        <svg
                                            className="w-6 h-6 text-primary"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </motion.div>
                                </button>

                                {/* Answer */}
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-5 pt-2 text-gray-600 leading-relaxed border-t border-gray-100">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="text-center mt-12">
                    <p className="text-gray-600 mb-4">Still have questions?</p>
                    <a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                    >
                        Contact Us
                    </a>
                </div>
            </div>
        </motion.section>
    );
};

export default FAQ;


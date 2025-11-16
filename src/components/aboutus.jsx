import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useCounterAnimation } from '../hooks/useCounterAnimation';

const AboutUs = () => {
    // Custom hook for counter animation 
    const { count, isVisible, setIsVisible } = useCounterAnimation(10, 1500);

    // Animation variant just for the section
    const sectionVariants = {
        hidden: { 
            opacity: 0,
            y: 100
        },
        visible: { 
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.section 
            id="about" 
            className="py-20 bg-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionVariants}
            onViewportEnter={() => setIsVisible(true)}
        >
            <div className="container mx-auto px-4">
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Card 1 with counter */}
                    <div className="bg-secondary rounded-lg shadow-xl overflow-hidden">
                        <div className="p-8">
                            <div className="flex items-center justify-center mb-6">
                                <h1 className="text-7xl font-bold text-primary transition-all duration-300">
                                    {count}
                                    <span className="ml-1">+</span>
                                </h1>
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-4 text-center">Projects</h3>
                            <p className="text-gray-300 text-center">
                                We have successfully delivered over 10 projects across various industries, 
                                helping businesses transform their digital presence and achieve their goals.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-secondary rounded-lg shadow-xl overflow-hidden">
                        <div className="p-8">
                            <div className="flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-4 text-center">Our Mission</h3>
                            <p className="text-gray-300 text-center">
                                We empower businesses through technology, creating digital solutions that solve 
                                complex problems and drive meaningful growth in an ever-evolving digital landscape.
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-secondary rounded-lg shadow-xl overflow-hidden">
                        <div className="p-8">
                            <div className="flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-4 text-center">Our Team</h3>
                            <p className="text-gray-300 text-center">
                                Our diverse team of experts combines technical excellence with creative thinking,
                                working collaboratively to deliver innovative solutions tailored to your unique needs.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default AboutUs;

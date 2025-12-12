import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const testimonials = [
        {
            id: 1,
            name: "Sarah Mitchell",
            position: "CEO, TechStart Solutions",
            company: "TechStart Solutions",
            image: "https://ui-avatars.com/api/?name=Sarah+Mitchell&background=00BBE5&color=fff&size=150",
            rating: 5,
            text: "HEXTECH transformed our online presence completely. Their attention to detail and professional approach made the entire process seamless. Our website traffic has increased by 200% since launch!",
        },
        {
            id: 2,
            name: "Michael Chen",
            position: "Founder, GreenLeaf Organics",
            company: "GreenLeaf Organics",
            image: "https://ui-avatars.com/api/?name=Michael+Chen&background=00BBE5&color=fff&size=150",
            rating: 5,
            text: "Working with HEXTECH was a game-changer for our business. They didn't just build a website; they created a digital experience that our customers love. Highly recommend their services!",
        },
        {
            id: 3,
            name: "Emma Rodriguez",
            position: "Marketing Director, SwiftCommerce",
            company: "SwiftCommerce",
            image: "https://ui-avatars.com/api/?name=Emma+Rodriguez&background=00BBE5&color=fff&size=150",
            rating: 5,
            text: "The team at HEXTECH exceeded all our expectations. Their expertise in modern web technologies and commitment to deadlines made them the perfect partner for our project.",
        },
        {
            id: 4,
            name: "David Thompson",
            position: "Owner, Artisan Cafe",
            company: "Artisan Cafe",
            image: "https://ui-avatars.com/api/?name=David+Thompson&background=00BBE5&color=fff&size=150",
            rating: 5,
            text: "As a small business owner, I needed a website that was both beautiful and functional. HEXTECH delivered exactly that and more. The maintenance plan keeps everything running smoothly!",
        },
        {
            id: 5,
            name: "Lisa Wang",
            position: "COO, FinanceHub",
            company: "FinanceHub",
            image: "https://ui-avatars.com/api/?name=Lisa+Wang&background=00BBE5&color=fff&size=150",
            rating: 5,
            text: "Professional, responsive, and incredibly talented. HEXTECH took our complex requirements and turned them into an elegant solution. Best investment we've made for our digital presence.",
        },
    ];

    const nextTestimonial = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8 }
        }
    };

    const testimonialVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    return (
        <motion.section 
            id="testimonials" 
            className="py-20 bg-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionVariants}
        >
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-bold text-secondary mb-4">What Our Clients Say</h2>
                    <p className="text-xl text-gray-600">Don't just take our word for it</p>
                </div>

                {/* Testimonial Carousel */}
                <div className="max-w-4xl mx-auto">
                    <div className="relative bg-secondary rounded-2xl shadow-2xl p-8 md:p-12 min-h-[400px] overflow-hidden">
                        {/* Quote Icon */}
                        <div className="absolute top-8 left-8 opacity-20">
                            <svg className="w-16 h-16 text-primary" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                        </div>

                        <AnimatePresence mode="wait" custom={activeIndex}>
                            <motion.div
                                key={activeIndex}
                                custom={activeIndex}
                                variants={testimonialVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}
                                className="relative z-10"
                            >
                                {/* Rating Stars */}
                                <div className="flex justify-center mb-6">
                                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className="w-6 h-6 text-primary"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>

                                {/* Testimonial Text */}
                                <p className="text-white text-lg md:text-xl text-center mb-8 leading-relaxed italic">
                                    "{testimonials[activeIndex].text}"
                                </p>

                                {/* Author Info */}
                                <div className="flex flex-col items-center">
                                    <img
                                        src={testimonials[activeIndex].image}
                                        alt={testimonials[activeIndex].name}
                                        className="w-20 h-20 rounded-full border-4 border-primary mb-4"
                                    />
                                    <h4 className="text-white font-bold text-xl">
                                        {testimonials[activeIndex].name}
                                    </h4>
                                    <p className="text-gray-300 text-sm">
                                        {testimonials[activeIndex].position}
                                    </p>
                                    <p className="text-primary text-sm font-semibold">
                                        {testimonials[activeIndex].company}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        <button
                            onClick={prevTestimonial}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-primary/20 hover:bg-primary text-white p-3 rounded-full transition-colors z-20"
                            aria-label="Previous testimonial"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={nextTestimonial}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary/20 hover:bg-primary text-white p-3 rounded-full transition-colors z-20"
                            aria-label="Next testimonial"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Dots Navigation */}
                    <div className="flex justify-center mt-8 gap-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all ${
                                    index === activeIndex
                                        ? 'bg-primary w-8'
                                        : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default Testimonials;


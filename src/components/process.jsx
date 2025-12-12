import { motion } from 'framer-motion';

const Process = () => {
    const steps = [
        {
            id: 1,
            number: "01",
            title: "Discovery & Planning",
            description: "We start by understanding your business goals, target audience, and project requirements. Through detailed consultations, we create a comprehensive project plan and timeline.",
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            ),
            color: "from-blue-400 to-primary"
        },
        {
            id: 2,
            number: "02",
            title: "Design & Prototype",
            description: "Our design team creates wireframes and prototypes based on your brand identity and preferences. We iterate until you're completely satisfied with the visual direction.",
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
            ),
            color: "from-primary to-cyan-600"
        },
        {
            id: 3,
            number: "03",
            title: "Development",
            description: "Our developers bring the design to life using modern technologies and best practices. We build clean, efficient, and scalable code that performs flawlessly.",
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            ),
            color: "from-cyan-600 to-teal-500"
        },
        {
            id: 4,
            number: "04",
            title: "Testing & Quality Assurance",
            description: "Rigorous testing across all devices and browsers ensures everything works perfectly. We fix bugs, optimize performance, and guarantee a smooth user experience.",
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: "from-teal-500 to-green-500"
        },
        {
            id: 5,
            number: "05",
            title: "Launch & Deployment",
            description: "We handle the entire deployment process, ensuring your website goes live smoothly. We configure hosting, domains, and all technical aspects for a successful launch.",
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            ),
            color: "from-green-500 to-emerald-500"
        },
        {
            id: 6,
            number: "06",
            title: "Support & Maintenance",
            description: "Our relationship doesn't end at launch. We provide ongoing support and maintenance to keep your website updated, secure, and performing at its best.",
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            color: "from-emerald-500 to-primary"
        }
    ];

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
            id="process" 
            className="py-20 bg-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionVariants}
        >
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-24">
                    <h2 className="text-5xl font-bold text-secondary mb-4">How We Work</h2>
                    <p className="text-xl text-gray-600">Our proven process for delivering exceptional results</p>
                </div>

                {/* Desktop Timeline View */}
                <div className="hidden lg:block relative pt-8">
                    {/* Timeline Line */}
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-primary via-cyan-600 via-teal-500 via-green-500 to-emerald-500 transform -translate-y-1/2"></div>
                    
                    <div className="relative grid grid-cols-6 gap-4">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex flex-col items-center"
                            >
                                {/* Icon Circle */}
                                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-4 shadow-lg z-10 hover:scale-110 transition-transform`}>
                                    {step.icon}
                                </div>
                                
                                {/* Number */}
                                <span className="text-4xl font-bold text-primary mb-2">{step.number}</span>
                                
                                {/* Title */}
                                <h3 className="text-lg font-bold text-secondary text-center mb-2">
                                    {step.title}
                                </h3>
                                
                                {/* Description */}
                                <p className="text-sm text-gray-600 text-center leading-relaxed">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Mobile/Tablet Accordion View */}
                <div className="lg:hidden">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="mb-6"
                        >
                            <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                                <div className="flex items-start gap-4">
                                    {/* Icon */}
                                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white flex-shrink-0`}>
                                        {step.icon}
                                    </div>
                                    
                                    <div className="flex-1">
                                        {/* Number and Title */}
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-3xl font-bold text-primary">{step.number}</span>
                                            <h3 className="text-xl font-bold text-secondary">
                                                {step.title}
                                            </h3>
                                        </div>
                                        
                                        {/* Description */}
                                        <p className="text-gray-600 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <p className="text-gray-600 mb-6 text-lg">
                        Ready to start your project with our proven process?
                    </p>
                    <a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-block bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
                    >
                        Let's Get Started
                    </a>
                </div>
            </div>
        </motion.section>
    );
};

export default Process;


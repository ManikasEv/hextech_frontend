import { motion } from 'framer-motion';
import { Search, Lightbulb, Code, Rocket, MessageSquare, CheckCircle } from 'lucide-react';

const Process = () => {
    const steps = [
        {
            number: "01",
            title: "Discovery & Consultation",
            description: "We start by understanding your business goals, target audience, and project requirements through detailed discussions.",
            icon: Search,
            color: "from-cyan-400 to-blue-500"
        },
        {
            number: "02",
            title: "Planning & Strategy",
            description: "Our team creates a comprehensive project roadmap, defining timelines, milestones, and technical specifications.",
            icon: Lightbulb,
            color: "from-blue-500 to-purple-500"
        },
        {
            number: "03",
            title: "Design & Prototyping",
            description: "We craft intuitive UI/UX designs and interactive prototypes to visualize your product before development begins.",
            icon: MessageSquare,
            color: "from-purple-500 to-pink-500"
        },
        {
            number: "04",
            title: "Development",
            description: "Our expert developers bring designs to life using cutting-edge technologies and best coding practices.",
            icon: Code,
            color: "from-pink-500 to-red-500"
        },
        {
            number: "05",
            title: "Testing & Quality Assurance",
            description: "Rigorous testing ensures your product is bug-free, secure, and performs optimally across all devices.",
            icon: CheckCircle,
            color: "from-red-500 to-orange-500"
        },
        {
            number: "06",
            title: "Launch & Support",
            description: "We deploy your product and provide ongoing maintenance, updates, and technical support to ensure success.",
            icon: Rocket,
            color: "from-orange-500 to-primary"
        }
    ];

    return (
        <section id="process" className="bg-white min-h-screen py-16">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-bold text-primary mb-4">Our Process</h2>
                    <p className="text-xl text-gray-600">A proven methodology to bring your ideas to life</p>
                </motion.div>

                {/* Process Steps */}
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="relative group"
                                >
                                    <div className="bg-secondary rounded-2xl p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-300 border border-primary/20">
                                        {/* Step Number */}
                                        <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                            {step.number}
                                        </div>

                                        {/* Icon */}
                                        <div className={`mb-6 mt-4 inline-block p-4 rounded-xl bg-gradient-to-br ${step.color}`}>
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-2xl font-bold text-primary mb-4">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed">
                                            {step.description}
                                        </p>

                                        {/* Hover Effect */}
                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"></div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center mt-16"
                >
                    <a 
                        href="#contact"
                        className="inline-block px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg"
                    >
                        Start Your Project
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Process;


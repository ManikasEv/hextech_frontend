import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const Pricing = () => {
    const pricingPlans = [
        {
            name: "Starter",
            price: "CHF 2,500",
            period: "one-time",
            description: "Perfect for small businesses and startups",
            features: [
                "Responsive Website Design",
                "Up to 5 Pages",
                "Basic SEO Optimization",
                "Contact Form Integration",
                "Mobile Responsive",
                "2 Rounds of Revisions",
                "30 Days Support"
            ],
            highlighted: false
        },
        {
            name: "Professional",
            price: "CHF 5,000",
            period: "one-time",
            description: "Ideal for growing businesses",
            features: [
                "Everything in Starter",
                "Up to 10 Pages",
                "Advanced SEO & Analytics",
                "CMS Integration",
                "E-commerce Ready",
                "Custom Animations",
                "API Integration",
                "60 Days Support"
            ],
            highlighted: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            period: "quote",
            description: "For large-scale projects",
            features: [
                "Everything in Professional",
                "Unlimited Pages",
                "Custom Web Application",
                "Mobile App Development",
                "Database Design",
                "Advanced Security",
                "Cloud Deployment",
                "12 Months Support"
            ],
            highlighted: false
        }
    ];

    return (
        <section id="pricing" className="bg-secondary min-h-screen py-16 flex items-center">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-bold text-primary mb-4">Pricing Plans</h2>
                    <p className="text-xl text-gray-300">Choose the perfect plan for your project</p>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {pricingPlans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className={`relative rounded-2xl p-8 ${
                                plan.highlighted 
                                    ? 'bg-primary text-secondary shadow-2xl scale-105 z-10' 
                                    : 'bg-white text-secondary shadow-lg'
                            }`}
                        >
                            {plan.highlighted && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-secondary text-primary px-6 py-1 rounded-full text-sm font-bold">
                                    POPULAR
                                </div>
                            )}

                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                <div className="mb-4">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    {plan.period !== "quote" && (
                                        <span className="text-lg opacity-75">/{plan.period}</span>
                                    )}
                                </div>
                                <p className={`text-sm ${plan.highlighted ? 'text-secondary/80' : 'text-gray-600'}`}>
                                    {plan.description}
                                </p>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-start">
                                        <Check className={`w-5 h-5 mr-3 flex-shrink-0 mt-0.5 ${
                                            plan.highlighted ? 'text-secondary' : 'text-primary'
                                        }`} />
                                        <span className={`text-sm ${
                                            plan.highlighted ? 'text-secondary' : 'text-gray-700'
                                        }`}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-3 rounded-lg font-semibold transition-all ${
                                plan.highlighted
                                    ? 'bg-secondary text-primary hover:bg-secondary/90'
                                    : 'bg-primary text-white hover:bg-primary/90'
                            }`}>
                                Get Started
                            </button>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center mt-12"
                >
                    <p className="text-gray-400">All prices exclude VAT. Contact us for custom solutions.</p>
                </motion.div>
            </div>
        </section>
    );
};

export default Pricing;


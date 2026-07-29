import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import T from './T';

const Pricing = () => {
    const pricingPlans = [
        {
            name: "Website Package",
            price: "CHF 1500",
            period: "one-time",
            description: "Full business website package with one clear pricing model",
            features: [
                "Custom website design and development",
                "SEO-ready structure and fast performance",
                "CHF 200 maintenance fee (yearly)",
                "Domain renewal and email renewal billed at cost",
                "Custom software with database maintenance scales by usage",
                "Perfect for restaurant websites and service businesses",
            ],
            highlighted: true
        }
    ];

    return (
        <section id="pricing" className="min-h-screen py-16 flex items-center">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-bold text-primary mb-4"><T>Website Pricing</T></h2>
                    <p className="text-xl text-gray-300"><T>Simple package with transparent maintenance terms</T></p>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 gap-8 max-w-2xl mx-auto">
                    {pricingPlans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className={`relative rounded-2xl p-8 flex flex-col ${
                                plan.highlighted 
                                    ? 'bg-primary text-secondary shadow-2xl scale-105 z-10' 
                                    : 'bg-white text-secondary shadow-lg'
                            }`}
                        >
                            {plan.highlighted && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-secondary text-primary px-6 py-1 rounded-full text-sm font-bold">
                                    <T>POPULAR</T>
                                </div>
                            )}

                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold mb-2"><T>{plan.name}</T></h3>
                                <div className="mb-4">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    {plan.period !== "quote" && (
                                        <span className="text-lg opacity-75">/<T>{plan.period}</T></span>
                                    )}
                                </div>
                                <p className={`text-sm ${plan.highlighted ? 'text-secondary/80' : 'text-gray-600'}`}>
                                    <T>{plan.description}</T>
                                </p>
                            </div>

                            <ul className="space-y-4 mb-8 flex-grow">
                                {plan.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-start">
                                        <Check className={`w-5 h-5 mr-3 flex-shrink-0 mt-0.5 ${
                                            plan.highlighted ? 'text-secondary' : 'text-primary'
                                        }`} />
                                        <span className={`text-sm ${
                                            plan.highlighted ? 'text-secondary' : 'text-gray-700'
                                        }`}>
                                            <T>{feature}</T>
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <a 
                                href="#contact"
                                className={`w-full py-3 rounded-lg font-semibold transition-all block text-center ${
                                    plan.highlighted
                                        ? 'bg-secondary text-primary hover:bg-secondary/90'
                                        : 'bg-primary text-white hover:bg-primary/90'
                                }`}
                            >
                                <T>Get Started</T>
                            </a>
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
                    <p className="text-gray-400"><T>All prices exclude VAT. Domain and email renewal costs depend on provider pricing.</T></p>
                </motion.div>
            </div>
        </section>
    );
};

export default Pricing;


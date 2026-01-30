import { motion } from 'framer-motion';
import { Briefcase, Mail } from 'lucide-react';
import NavbarCareers from '../components/navbar-careers';
import FooterCareers from '../components/footer-careers';
import T from '../components/T';

const Careers = () => {
    const benefits = [
        {
            title: "Competitive Salary",
            description: "We offer market-leading compensation packages"
        },
        {
            title: "Flexible Hours",
            description: "Work when you're most productive"
        },
        {
            title: "Remote Options",
            description: "Hybrid or fully remote work available"
        },
        {
            title: "Learning Budget",
            description: "Annual budget for courses and conferences"
        },
        {
            title: "Modern Tech",
            description: "Work with the latest technologies and tools"
        },
        {
            title: "Team Events",
            description: "Regular team activities and celebrations"
        }
    ];

    return (
        <div className="bg-secondary min-h-screen">
            <NavbarCareers />
            
            {/* Hero Section */}
            <section className="pt-32 pb-16 px-4">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
                            <T>Join Our Team</T>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                            <T>Be part of a dynamic team building innovative digital solutions for clients across Switzerland and beyond.</T>
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 px-4 bg-white/5">
                <div className="container mx-auto max-w-6xl">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-primary text-center mb-12"
                    >
                        <T>Why Work With Us?</T>
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-secondary border border-primary/20 rounded-lg p-6 hover:border-primary/50 transition-colors"
                            >
                                <h3 className="text-xl font-bold text-primary mb-2"><T>{benefit.title}</T></h3>
                                <p className="text-gray-300"><T>{benefit.description}</T></p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions - No Positions Available */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-6xl">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-primary text-center mb-12"
                    >
                        <T>Open Positions</T>
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-white/5 backdrop-blur-sm border border-primary/20 rounded-lg p-12 text-center"
                    >
                        <Briefcase className="w-20 h-20 mx-auto mb-6 text-primary/50" />
                        <h3 className="text-3xl font-bold text-primary mb-4">
                            <T>No Available Positions Right Now</T>
                        </h3>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            <T>We don't have any open positions at the moment, but we're always interested in connecting with talented professionals.</T>
                        </p>
                        <div className="bg-secondary/50 border border-primary/30 rounded-lg p-6 max-w-md mx-auto">
                            <p className="text-gray-300 mb-4">
                                <T>Send your CV to</T>:
                            </p>
                            <a 
                                href="mailto:info@hextech.ch" 
                                className="inline-flex items-center gap-2 text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
                            >
                                <Mail className="w-6 h-6" />
                                info@hextech.ch
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Application CTA */}
            <section id="apply" className="py-16 px-4 bg-secondary border-t border-primary/20">
                <div className="container mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Mail className="w-16 h-16 mx-auto mb-6 text-primary" />
                        <h2 className="text-4xl font-bold text-primary mb-4">
                            <T>Interested in Joining Us?</T>
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            <T>We're always looking for talented individuals. Send your CV and we'll get in touch if there's a fit.</T>
                        </p>
                        <div className="inline-block bg-white/5 border border-primary/20 rounded-lg p-6">
                            <p className="text-sm text-gray-400 mb-2"><T>Send applications to</T>:</p>
                            <a 
                                href="mailto:info@hextech.ch"
                                className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-2"
                            >
                                <Mail className="w-6 h-6" />
                                info@hextech.ch
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <FooterCareers />
        </div>
    );
};

export default Careers;


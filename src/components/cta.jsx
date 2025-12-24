import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone } from 'lucide-react';

const CTA = () => {
    return (
        <section className="bg-gradient-to-br from-primary via-cyan-500 to-blue-600 py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        {/* Main Heading */}
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Ready to Transform Your Digital Presence?
                        </h2>
                        
                        {/* Subheading */}
                        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
                            Let's build something amazing together. Get in touch with our team and start your journey to digital success.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group px-8 py-4 bg-secondary text-primary rounded-lg font-semibold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
                            >
                                Get Started Now
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.a>
                            
                            <motion.a
                                href="#services"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold text-lg border-2 border-white/30 hover:bg-white/20 transition-all"
                            >
                                View Our Services
                            </motion.a>
                        </div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-6 justify-center items-center text-white/90"
                        >
                            <div className="flex items-center gap-2">
                                <Mail className="w-5 h-5" />
                                <span>info@hextech-it.ch</span>
                            </div>
                            <div className="hidden sm:block w-px h-6 bg-white/30"></div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-5 h-5" />
                                <span>Based in Zurich, Switzerland</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Stats or Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-white/20"
                    >
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white mb-2">50+</div>
                            <div className="text-white/80">Projects Delivered</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white mb-2">100%</div>
                            <div className="text-white/80">Client Satisfaction</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white mb-2">24/7</div>
                            <div className="text-white/80">Support Available</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white mb-2">5+</div>
                            <div className="text-white/80">Years Experience</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CTA;


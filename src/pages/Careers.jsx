import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';
import NavbarCareers from '../components/navbar-careers';
import FooterCareers from '../components/footer-careers';

const Careers = () => {
    const openPositions = [
        {
            title: "Senior React Developer",
            location: "Zurich, Switzerland",
            type: "Full-time",
            description: "We're looking for an experienced React developer to join our frontend team. You'll be working on cutting-edge web applications for our Swiss and international clients.",
            requirements: [
                "5+ years of experience with React",
                "Strong knowledge of TypeScript",
                "Experience with modern CSS frameworks (Tailwind)",
                "Fluent in English, German is a plus"
            ]
        },
        {
            title: "Full Stack Developer",
            location: "Zurich, Switzerland / Remote",
            type: "Full-time",
            description: "Join our team as a Full Stack Developer and work on exciting projects that combine frontend and backend technologies.",
            requirements: [
                "3+ years of full-stack development experience",
                "Proficiency in React and Node.js",
                "Database experience (PostgreSQL, MongoDB)",
                "Strong problem-solving skills"
            ]
        },
        {
            title: "UI/UX Designer",
            location: "Zurich, Switzerland",
            type: "Full-time / Part-time",
            description: "We're seeking a creative UI/UX designer to craft beautiful and intuitive digital experiences for our clients.",
            requirements: [
                "3+ years of UI/UX design experience",
                "Proficiency in Figma and Adobe Creative Suite",
                "Strong portfolio showcasing web and mobile designs",
                "Understanding of frontend development is a plus"
            ]
        },
        {
            title: "Mobile App Developer",
            location: "Zurich, Switzerland",
            type: "Full-time",
            description: "Build innovative mobile applications for iOS and Android using React Native and native technologies.",
            requirements: [
                "3+ years of mobile development experience",
                "Experience with React Native or Flutter",
                "Published apps on App Store/Play Store",
                "Knowledge of native iOS/Android development"
            ]
        }
    ];

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
                            Join Our Team
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                            Be part of a dynamic team building innovative digital solutions for clients across Switzerland and beyond.
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
                        Why Work With Us?
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
                                <h3 className="text-xl font-bold text-primary mb-2">{benefit.title}</h3>
                                <p className="text-gray-300">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-6xl">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-primary text-center mb-12"
                    >
                        Open Positions
                    </motion.h2>

                    <div className="space-y-6">
                        {openPositions.map((position, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white/5 backdrop-blur-sm border border-primary/20 rounded-lg p-8 hover:border-primary/50 transition-all group"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-primary mb-4">
                                            {position.title}
                                        </h3>
                                        
                                        <div className="flex flex-wrap gap-4 mb-4 text-gray-300">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4" />
                                                <span>{position.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                <span>{position.type}</span>
                                            </div>
                                        </div>

                                        <p className="text-gray-300 mb-4">
                                            {position.description}
                                        </p>

                                        <div>
                                            <h4 className="text-lg font-semibold text-primary mb-2">Requirements:</h4>
                                            <ul className="list-disc list-inside space-y-1 text-gray-300">
                                                {position.requirements.map((req, idx) => (
                                                    <li key={idx}>{req}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="lg:ml-6">
                                        <div className="text-center lg:text-right">
                                            <p className="text-sm text-gray-400 mb-2">Apply via email:</p>
                                            <p className="text-lg font-semibold text-primary">info@hextech-it.ch</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
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
                        <Briefcase className="w-16 h-16 mx-auto mb-6 text-primary" />
                        <h2 className="text-4xl font-bold text-primary mb-4">
                            Don't See Your Role?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            We're always looking for talented individuals. Send your CV and cover letter to info@hextech-it.ch and we'll get in touch if there's a fit.
                        </p>
                        <div className="inline-block">
                            <p className="text-sm text-gray-400 mb-2">Send applications to:</p>
                            <p className="text-2xl font-bold text-primary">info@hextech-it.ch</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <FooterCareers />
        </div>
    );
};

export default Careers;


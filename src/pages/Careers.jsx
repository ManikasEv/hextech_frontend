import { Link } from 'react-router-dom';
import NavbarCareers from '../components/navbar-careers';
import Footer from '../components/footer';

const Careers = () => {
    const positions = [
        {
            id: 1,
            title: "Fullstack Developer",
            type: "Full-time",
            location: "Remote / Hybrid",
            description: "We're looking for a talented Fullstack Developer to join our team and help build innovative web solutions.",
            requirements: [
                "3+ years of experience in web development",
                "Strong proficiency in JavaScript/TypeScript",
                "Experience with React and Node.js",
                "Knowledge of modern web technologies and frameworks",
                "Experience with databases (SQL and NoSQL)",
                "Understanding of RESTful APIs and microservices architecture",
                "Familiarity with Git and version control",
                "Strong problem-solving skills and attention to detail"
            ],
            responsibilities: [
                "Develop and maintain web applications using modern technologies",
                "Collaborate with designers and other developers",
                "Write clean, maintainable, and efficient code",
                "Participate in code reviews and technical discussions",
                "Troubleshoot and debug applications",
                "Stay up-to-date with emerging technologies"
            ],
            benefits: [
                "Competitive salary",
                "Flexible working hours",
                "Remote work options",
                "Professional development opportunities",
                "Modern tech stack",
                "Collaborative team environment"
            ],
            email: "info@hextech-it.ch"
        }
    ];


    return (
        <div className="min-h-screen bg-gray-50">
            <NavbarCareers />
            
            {/* Hero Section */}
            <section className="bg-secondary text-white py-20 mt-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-4">Join Our Team</h1>
                    <p className="text-xl text-gray-300">
                        Build the future of web development with HEXTECH
                    </p>
                    <Link 
                        to="/" 
                        className="inline-block mt-6 text-primary hover:text-white transition-colors"
                    >
                        ← Back to Homepage
                    </Link>
                </div>
            </section>

            {/* Open Positions Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-secondary mb-4">Open Positions</h2>
                        <p className="text-gray-600">Explore our current job openings</p>
                    </div>

                    <div className="max-w-5xl mx-auto space-y-8">
                        {positions.map((position) => (
                            <div 
                                key={position.id} 
                                className="bg-white rounded-lg shadow-xl p-8 hover:shadow-2xl transition-shadow"
                            >
                                {/* Position Header */}
                                <div className="border-b border-gray-200 pb-6 mb-6">
                                    <div className="flex flex-wrap justify-between items-start gap-4">
                                        <div>
                                            <h3 className="text-3xl font-bold text-primary mb-2">
                                                {position.title}
                                            </h3>
                                            <div className="flex flex-wrap gap-4 text-gray-600">
                                                <span className="flex items-center">
                                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                                    </svg>
                                                    {position.type}
                                                </span>
                                                <span className="flex items-center">
                                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                    </svg>
                                                    {position.location}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="bg-primary/10 border-2 border-primary px-6 py-3 rounded-lg">
                                            <p className="text-sm text-gray-600 mb-1">Apply via email:</p>
                                            <a 
                                                href={`mailto:${position.email}`}
                                                className="text-xl font-semibold text-primary hover:text-primary/80 transition-colors"
                                            >
                                                {position.email}
                                            </a>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 mt-4">{position.description}</p>
                                </div>

                                {/* Position Details */}
                                <div className="grid md:grid-cols-2 gap-8">
                                    {/* Requirements */}
                                    <div>
                                        <h4 className="text-xl font-semibold text-secondary mb-4">Requirements</h4>
                                        <ul className="space-y-2">
                                            {position.requirements.map((req, index) => (
                                                <li key={index} className="flex items-start">
                                                    <svg className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                                    </svg>
                                                    <span className="text-gray-700">{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Responsibilities */}
                                    <div>
                                        <h4 className="text-xl font-semibold text-secondary mb-4">Responsibilities</h4>
                                        <ul className="space-y-2">
                                            {position.responsibilities.map((resp, index) => (
                                                <li key={index} className="flex items-start">
                                                    <svg className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                                    </svg>
                                                    <span className="text-gray-700">{resp}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Benefits */}
                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <h4 className="text-xl font-semibold text-secondary mb-4">What We Offer</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {position.benefits.map((benefit, index) => (
                                            <div key={index} className="flex items-center bg-gray-50 p-3 rounded">
                                                <svg className="w-5 h-5 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                                <span className="text-gray-700 text-sm">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Contact Information (Bottom) */}
                                <div className="mt-8 text-center bg-gray-50 p-6 rounded-lg">
                                    <p className="text-gray-700 mb-3 text-lg">
                                        Interested in this position? Send your application to:
                                    </p>
                                    <a 
                                        href={`mailto:${position.email}`}
                                        className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors inline-block"
                                    >
                                        {position.email}
                                    </a>
                                    <p className="text-gray-500 text-sm mt-3">
                                        Please include your resume and cover letter
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Additional Info */}
                    <div className="max-w-3xl mx-auto mt-12 bg-white rounded-lg shadow-lg p-8 text-center">
                        <h3 className="text-2xl font-bold text-secondary mb-4">
                            Don't See a Position That Fits?
                        </h3>
                        <p className="text-gray-700 mb-6">
                            We're always looking for talented individuals to join our team. 
                            If you're passionate about web development and think you'd be a great fit, 
                            we'd love to hear from you!
                        </p>
                        <p className="text-gray-600 mb-2">Send your general application to:</p>
                        <a 
                            href="mailto:info@hextech-it.ch"
                            className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors inline-block"
                        >
                            info@hextech-it.ch
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Careers;


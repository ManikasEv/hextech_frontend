const Pricing = () => {
    return (
        <section id="pricing" className="bg-gray-50 min-h-screen py-16 flex justify-center items-center">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-bold text-primary mb-4">Website Maintenance Plans</h2>
                    <p className="text-xl text-gray-600">Choose the perfect plan for your business</p>
                </div>

                {/* Pricing Cards */}
                <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
                    {/* Essential Plan */}
                    <div className="bg-white rounded-lg shadow-xl p-8 flex flex-col w-full md:w-96 hover:scale-105 transition-transform duration-300">
                        <div className="mb-6">
                            <h3 className="text-3xl font-bold text-secondary mb-2">Essential Plan</h3>
                            <div className="flex items-baseline mb-4">
                                <span className="text-5xl font-bold text-primary">150 CHF</span>
                                <span className="text-gray-600 ml-2">/ year</span>
                            </div>
                            <p className="text-gray-600 italic">
                                Perfect for small businesses that just need their website to stay updated and correct.
                            </p>
                        </div>

                        <div className="flex-grow">
                            <h4 className="font-semibold text-lg mb-4 text-secondary">What's included:</h4>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span className="text-gray-700">
                                        <strong>Small text changes</strong><br />
                                        <span className="text-sm text-gray-600">(opening hours, contact info, services, prices)</span>
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span className="text-gray-700">Replace or update photos</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span className="text-gray-700">Fix typos, broken links, or layout issues</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span className="text-gray-700">
                                        <strong>Yearly technical updates</strong><br />
                                        <span className="text-sm text-gray-600">(frameworks, libraries, styling updates)</span>
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span className="text-gray-700">Yearly SEO & legal wording refresh</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span className="text-gray-700">
                                        <strong>Response time:</strong> within 72 hours
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                            <p className="text-center text-gray-700 italic">
                                "Basic yearly care. I keep your website accurate, updated, and working properly."
                            </p>
                        </div>

                        <button className="mt-6 w-full bg-secondary text-white py-3 rounded-lg hover:bg-secondary/90 transition-colors font-semibold">
                            Get Started
                        </button>
                    </div>

                    {/* Professional Plan */}
                    <div className="bg-white rounded-lg shadow-xl p-8 flex flex-col w-full md:w-96 border-4 border-primary hover:scale-105 transition-transform duration-300 relative">
                        {/* Popular Badge */}
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <span className="bg-primary text-white px-6 py-1 rounded-full text-sm font-semibold">
                                ⭐ POPULAR
                            </span>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-3xl font-bold text-secondary mb-2">Professional Plan</h3>
                            <div className="flex items-baseline mb-4">
                                <span className="text-5xl font-bold text-primary">300 CHF</span>
                                <span className="text-gray-600 ml-2">/ year</span>
                            </div>
                            <p className="text-gray-600 italic">
                                For businesses that want their website to improve and grow without a full redesign.
                            </p>
                        </div>

                        <div className="flex-grow">
                            <h4 className="font-semibold text-lg mb-4 text-secondary">What's included:</h4>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span className="text-gray-700 font-semibold">Everything in the Essential Plan</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span className="text-gray-700">
                                        <strong>Adding new sections</strong><br />
                                        <span className="text-sm text-gray-600">(e.g., About Us, Services, Gallery, FAQ, Team section, Testimonials)</span>
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span className="text-gray-700">Reorganizing existing sections</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span className="text-gray-700">
                                        <strong>Light design improvements</strong><br />
                                        <span className="text-sm text-gray-600">(layout cleanup, spacing, alignment, color adjustments)</span>
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span className="text-gray-700">Extra content updates throughout the year</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span className="text-gray-700">
                                        <strong>Faster response time:</strong> within 48 hours
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
                            <p className="text-center text-gray-700 italic">
                                "Yearly improvements and new content sections — without turning your site into a full custom application."
                            </p>
                        </div>

                        <button className="mt-6 w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;


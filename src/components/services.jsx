import serviceNodes from '../interfaces/nodes';

const Services = () => {

    return (
        <section id="services" className="flex flex-col bg-white min-h-screen py-16 justify-center items-center">
            <div className="w-full px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-bold text-primary mb-4">Services</h2>
                    <p className="text-xl text-gray-600">Services for Software Development</p>
                </div>
                
                <div className="overflow-x-auto overflow-y-hidden scroll-smooth pb-8 horizontal-scroll">
                    <div className="flex flex-row gap-8 px-8" style={{ width: 'max-content' }}>
                        {/* Service nodes */}
                        {serviceNodes.map((service, index) => (
                            <div 
                                key={index}
                                className="flex-shrink-0"
                                style={{ width: '400px' }}
                            >
                                {/* Service content card */}
                                <div className="w-full">
                                    <div className="overflow-hidden rounded-lg shadow-xl bg-secondary flex flex-col" style={{ height: '500px' }}>
                                        <div 
                                            className="h-48 bg-cover bg-center flex-shrink-0" 
                                            style={{ backgroundImage: `url(${service.image})` }}
                                        ></div>
                                        <div className="p-6 border border-primary/20 flex flex-col overflow-y-auto custom-scrollbar" style={{ height: 'calc(500px - 192px)' }}>
                                            <h3 className="text-2xl font-bold mb-4 text-primary">{service.title}</h3>
                                            <p className="text-gray-300 mb-4">{service.description}</p>
                                            <button 
                                                disabled 
                                                className="mt-auto px-6 py-2 bg-gray-400 text-gray-600 rounded cursor-not-allowed opacity-50"
                                            >
                                                Learn More
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <style jsx>{`
                /* Horizontal scroll container - cyan scrollbar */
                .horizontal-scroll {
                    scrollbar-width: thin;  /* Firefox */
                    scrollbar-color: #00BBE5 #e5e5e5;  /* Firefox - cyan thumb, light gray track */
                }
                .horizontal-scroll::-webkit-scrollbar {
                    height: 8px;  /* Chrome, Safari and Opera */
                }
                .horizontal-scroll::-webkit-scrollbar-track {
                    background: #e5e5e5;
                    border-radius: 4px;
                }
                .horizontal-scroll::-webkit-scrollbar-thumb {
                    background: #00BBE5;
                    border-radius: 4px;
                }
                .horizontal-scroll::-webkit-scrollbar-thumb:hover {
                    background: #0099c7;
                }
                
                /* Custom scrollbar for text content inside cards */
                .custom-scrollbar {
                    scrollbar-width: thin;  /* Firefox */
                    scrollbar-color: #00BBE5 #1a1a1a;  /* Firefox */
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;  /* Chrome, Safari and Opera */
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #1a1a1a;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #00BBE5;
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #0099c7;
                }
            `}</style>
        </section>
    );
}

export default Services;


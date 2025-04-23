import { useState, useEffect, useRef } from 'react';
import serviceNodes from '../interfaces/nodes';
import { useLineGrowthOnScroll, useElementVisibility } from '../hooks/useScrollAnimation';

const Services = () => {
    // Custom hook for line growth animation
    const { lineHeight, containerRef } = useLineGrowthOnScroll();
    
    // Custom hook for element visibility (5 service nodes + 1 final node)
    const { visibleElements: visibleNodes, elementRefs: nodeRefs } = useElementVisibility(6);

    return (
        <section id="services" className="flex flex-col bg-white min-h-screen py-16 justify-center items-center">
            <div ref={containerRef} className="container mx-auto px-4 flex justify-center">
                <div className="relative max-w-4xl">
                    {/* Vertical line connecting all nodes - grows with scroll */}
                    <div 
                        className="absolute left-6 top-10 w-0.5 bg-primary transition-all duration-300 ease-out" 
                        style={{ 
                            height: `${lineHeight}%`
                        }}
                    ></div>
                    
                    {/* Service nodes */}
                    {serviceNodes.map((service, index) => (
                        <div 
                            key={index}
                            ref={nodeRefs[index]}
                            className={`flex mb-32 transition-all duration-1000 transform ${
                                visibleNodes[index] 
                                ? 'opacity-100 translate-x-0' 
                                : 'opacity-0 -translate-x-12'
                            }`}
                            style={{ minHeight: '60vh' }}
                        >
                            {/* Node circle with number */}
                            <div className="relative z-10">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-lg">
                                    {service.number}
                                </div>
                            </div>
                            
                            {/* Service content card */}
                            <div className="ml-8 mt-20 w-full">
                                <div className="overflow-hidden rounded-lg shadow-xl h-full bg-secondary">
                                    <div 
                                        className="h-48 bg-cover bg-center" 
                                        style={{ backgroundImage: `url(${service.image})` }}
                                    ></div>
                                    <div className="p-6 border border-primary/20">
                                        <h3 className="text-2xl font-bold mb-4 text-primary">{service.title}</h3>
                                        <p className="text-gray-300">{service.description}</p>
                                        <button className="mt-6 px-6 py-2 bg-primary text-white rounded hover:bg-primary/80 transition-colors">
                                            Learn More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Final catchy node */}
                    <div 
                        ref={nodeRefs[5]}
                        className={`flex transform ${
                            visibleNodes[5] 
                            ? 'opacity-100 translate-x-0' 
                            : 'opacity-0 -translate-x-12'
                        } transition-all duration-1000 ease-in-out`}
                        style={{ minHeight: '20vh' }}
                    >
                        <div className="relative z-10">
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white shadow-lg pulse-animation">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                        </div>
                        <div className="ml-8 bg-secondary rounded-lg p-6 shadow-lg max-w-md">
                            <p className="text-2xl font-bold text-primary">Ready to innovate?</p>
                            <p className="text-gray-300 mt-2">Your vision + our expertise = limitless possibilities.</p>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .pulse-animation {
                    animation: pulse 2s infinite;
                }
                @keyframes pulse {
                    0% {
                        box-shadow: 0 0 0 0 rgba(0, 187, 229, 0.7);
                    }
                    70% {
                        box-shadow: 0 0 0 10px rgba(0, 187, 229, 0);
                    }
                    100% {
                        box-shadow: 0 0 0 0 rgba(0, 187, 229, 0);
                    }
                }
            `}</style>
        </section>
    );
}

export default Services;

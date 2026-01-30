import { motion } from 'framer-motion';
import projects from '../interfaces/projectsData';
import T from './T';

const Projects = () => {
    const handleProjectClick = (link, type) => {
        // Only allow clicking on websites
        if (link && type === 'Website') {
            window.open(link, '_blank', 'noopener,noreferrer');
        }
    };

    // Triple projects for seamless infinite scroll
    const duplicatedProjects = [...projects, ...projects, ...projects];

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8 }
        }
    };

    return (
        <motion.section 
            id="projects" 
            className="py-20 bg-gray-50"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionVariants}
        >
            <div className="w-full">
                {/* Section Header */}
                <div className="text-center mb-12 px-4">
                    <h2 className="text-5xl font-bold text-secondary mb-4"><T>Our Projects</T></h2>
                    <p className="text-xl text-gray-600"><T>Explore our latest work and achievements</T></p>
                </div>

                {/* Auto-scrolling container */}
                <div className="overflow-x-hidden overflow-y-visible py-8 relative">
                    <div 
                        className="flex gap-8 animate-scroll"
                        style={{ width: 'max-content' }}
                    >
                        {duplicatedProjects.map((project, index) => (
                            <motion.div
                                key={`${project.id}-${index}`}
                                className={`flex-shrink-0 group ${project.type === 'Website' && project.link ? 'cursor-pointer' : 'cursor-default'}`}
                                style={{ width: '380px' }}
                                whileHover={{ scale: 1.08, y: -10 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => handleProjectClick(project.link, project.type)}
                            >
                                {/* Project Card */}
                                <div className="h-full bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300">
                                    {/* Image Container with Gradient Overlay */}
                                    <div className="relative h-56 overflow-hidden">
                                        <div 
                                            className="w-full h-full bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                                            style={{ backgroundImage: `url(${project.image})` }}
                                        ></div>
                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/40 to-transparent"></div>
                                        
                                        {/* Type Badge */}
                                        <div className="absolute top-4 right-4">
                                            <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                                                project.type === 'Website' 
                                                    ? 'bg-primary text-white' 
                                                    : 'bg-purple-500 text-white'
                                            }`}>
                                                {project.type}
                                            </span>
                                        </div>

                                        {/* Title at bottom of image */}
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                                                {project.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-6 flex flex-col" style={{ height: '200px' }}>
                                        {/* Scrollable description area */}
                                        <div className="flex-1 overflow-y-auto mb-4 custom-scrollbar-project">
                                            <p className="text-gray-600 text-base leading-relaxed">
                                                {project.description}
                                            </p>
                                        </div>

                                        {/* Fixed position button/label */}
                                        <div className="flex-shrink-0">
                                            {project.type === 'Website' && project.link ? (
                                                <div className="flex items-center text-primary font-semibold group-hover:text-secondary transition-colors">
                                                    <span>Visit Website</span>
                                                    <svg 
                                                        className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path 
                                                            strokeLinecap="round" 
                                                            strokeLinejoin="round" 
                                                            strokeWidth={2} 
                                                            d="M17 8l4 4m0 0l-4 4m4-4H3" 
                                                        />
                                                    </svg>
                                                </div>
                                            ) : project.type === 'Website' && !project.link ? (
                                                <div className="flex items-center text-gray-400 font-semibold">
                                                    <span>Coming Soon</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center text-gray-400 font-semibold">
                                                    <span>Software Project</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Instruction text */}
                <div className="text-center mt-8 px-4">
                    <p className="text-gray-600 text-base">
                        <T>Click on website projects to explore them live</T>
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-33.333%);
                    }
                }
                .animate-scroll {
                    animation: scroll 60s linear infinite;
                }
                
                /* Custom scrollbar for project descriptions */
                .custom-scrollbar-project {
                    scrollbar-width: thin;
                    scrollbar-color: #00BBE5 #f3f4f6;
                }
                .custom-scrollbar-project::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar-project::-webkit-scrollbar-track {
                    background: #f3f4f6;
                    border-radius: 2px;
                }
                .custom-scrollbar-project::-webkit-scrollbar-thumb {
                    background: #00BBE5;
                    border-radius: 2px;
                }
                .custom-scrollbar-project::-webkit-scrollbar-thumb:hover {
                    background: #0099c7;
                }
            `}</style>
        </motion.section>
    );
};

export default Projects;


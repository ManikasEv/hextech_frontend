import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import localProjects from '../interfaces/projectsData';
import T from './T';
import { scrambleReveal, wordReveal } from '../utils/textAnimations';

gsap.registerPlugin(ScrollTrigger);

const API_URL = import.meta.env.VITE_API_URL || '';

const CARD_WIDTH_DESKTOP = 380;
const CARD_WIDTH_MOBILE  = 300;
const CARD_GAP           = 32;

// ── Reusable carousel hook ────────────────────────────────────────────────────
function useCarousel(trackRef, cardWidth, projectCount) {
    const tweenRef        = useRef(null);
    const offsetRef       = useRef(0);
    const isDragging      = useRef(false);
    const dragStartX      = useRef(0);
    const dragStartOffset = useRef(0);
    const [activeIndex, setActiveIndex] = useState(0);

    const CARD_STEP      = cardWidth + CARD_GAP;
    const singleSetWidth = projectCount * CARD_STEP;

    const buildTween = useCallback(() => {
        if (!trackRef.current || projectCount === 0) return;
        tweenRef.current?.kill();
        tweenRef.current = gsap.to(offsetRef, {
            current: offsetRef.current - singleSetWidth,
            duration: 25,
            ease: 'none',
            repeat: -1,
            onUpdate: () => {
                let x = offsetRef.current % singleSetWidth;
                if (x > 0) x -= singleSetWidth;
                gsap.set(trackRef.current, { x });
                setActiveIndex(Math.round(Math.abs(x) / CARD_STEP) % projectCount);
            },
        });
    }, [trackRef, singleSetWidth, projectCount, CARD_STEP]);

    const pauseCarousel  = () => tweenRef.current?.pause();
    const resumeCarousel = () => tweenRef.current?.play();

    const onPointerDown = (e) => {
        isDragging.current      = true;
        dragStartX.current      = e.clientX ?? e.touches?.[0]?.clientX;
        dragStartOffset.current = offsetRef.current;
        tweenRef.current?.pause();
        if (trackRef.current) trackRef.current.style.cursor = 'grabbing';
    };

    const onPointerMove = (e) => {
        if (!isDragging.current) return;
        const x      = e.clientX ?? e.touches?.[0]?.clientX;
        const delta  = x - dragStartX.current;
        let   next   = dragStartOffset.current + delta;
        let   visual = next % singleSetWidth;
        if (visual > 0) visual -= singleSetWidth;
        offsetRef.current = next;
        gsap.set(trackRef.current, { x: visual });
    };

    const onPointerUp = () => {
        if (!isDragging.current) return;
        isDragging.current = false;
        if (trackRef.current) trackRef.current.style.cursor = 'grab';
        tweenRef.current?.play();
    };

    const goTo = (idx) => {
        tweenRef.current?.kill();
        const target      = -idx * CARD_STEP;
        offsetRef.current = target;
        setActiveIndex(idx);
        gsap.to(trackRef.current, {
            x: target,
            duration: 0.7,
            ease: 'power3.out',
            onComplete: () => buildTween(),
        });
    };

    return { buildTween, pauseCarousel, resumeCarousel, onPointerDown, onPointerMove, onPointerUp, goTo, activeIndex, tweenRef };
}

// ── Card renderer ─────────────────────────────────────────────────────────────
const ProjectCard = ({ project, cardWidth, onClick }) => (
    <div
        className={`flex-shrink-0 group ${project.type === 'Website' && project.link ? 'cursor-pointer' : 'cursor-default'}`}
        style={{ width: `${cardWidth}px` }}
        onClick={onClick}
    >
        <div className="h-full bg-white/5 border border-primary/20 rounded-2xl shadow-lg overflow-hidden hover:border-primary transition-all duration-300 hover:-translate-y-2">
            <div className="relative overflow-hidden" style={{ height: cardWidth === CARD_WIDTH_DESKTOP ? '224px' : '192px' }}>
                <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url(${project.image_data || project.image_url || project.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/40 to-transparent" />
                <div className="absolute top-4 right-4">
                    <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${project.type === 'Website' ? 'bg-primary text-secondary' : 'bg-purple-500 text-white'}`}>
                        <T>{project.type}</T>
                    </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white drop-shadow-lg"><T>{project.title}</T></h3>
                </div>
            </div>
            <div className="p-6 flex flex-col" style={{ height: '180px' }}>
                <div className="flex-1 overflow-y-auto mb-4 custom-scrollbar-project">
                    <p className="text-gray-400 text-base leading-relaxed"><T>{project.description}</T></p>
                </div>
                <div className="flex-shrink-0">
                    {project.type === 'Website' && project.link ? (
                        <div className="flex items-center text-primary font-semibold">
                            <span><T>Visit Website</T></span>
                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    ) : project.type === 'Website' ? (
                        <div className="flex items-center text-gray-500 font-semibold"><span><T>Coming Soon</T></span></div>
                    ) : (
                        <div className="flex items-center text-gray-500 font-semibold"><span><T>Software Project</T></span></div>
                    )}
                </div>
            </div>
        </div>
    </div>
);

// ── Dots ──────────────────────────────────────────────────────────────────────
const Dots = ({ count, activeIndex, goTo, className = '' }) => (
    <div className={`flex justify-center gap-3 mt-6 ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
            <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${activeIndex === i ? 'w-7 h-3 bg-primary' : 'w-3 h-3 bg-white/20 hover:bg-white/50'}`}
            />
        ))}
    </div>
);

// ── Main component ────────────────────────────────────────────────────────────
const Projects = () => {
    const sectionRef  = useRef(null);
    const headerRef   = useRef(null);
    const h2Ref       = useRef(null);
    const subRef      = useRef(null);

    const desktopTrackRef = useRef(null);
    const mobileTrackRef  = useRef(null);

    // Start with local data, upgrade to DB data when available
    const [projects, setProjects] = useState(localProjects);
    const [loadedFromDB, setLoadedFromDB] = useState(false);

    // Fetch from API
    useEffect(() => {
        if (!API_URL) return;
        fetch(`${API_URL}/api/projects`)
            .then(r => r.ok ? r.json() : Promise.reject(r.status))
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setProjects(data);
                    setLoadedFromDB(true);
                }
            })
            .catch(err => console.warn('[Projects] API unavailable, using local data:', err));
    }, []);

    const duplicatedProjects = [...projects, ...projects, ...projects];

    const handleProjectClick = (link, type) => {
        if (link && type === 'Website') window.open(link, '_blank', 'noopener,noreferrer');
    };

    const desktop = useCarousel(desktopTrackRef, CARD_WIDTH_DESKTOP, projects.length);
    const mobile  = useCarousel(mobileTrackRef,  CARD_WIDTH_MOBILE,  projects.length);

    // ── Entrance animations + start tweens on scroll ─────────────────────────
    useEffect(() => {
        const ctx = gsap.context(() => {
            scrambleReveal(h2Ref.current,  { stagger: 0.04 });
            wordReveal(subRef.current, { y: 22, stagger: 0.06, delay: 0.3 });

            gsap.from(headerRef.current, {
                y: -40, opacity: 0, duration: 0.9, ease: 'power3.out',
                scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none none' },
            });

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top 80%',
                once: true,
                onEnter: () => {
                    desktop.buildTween();
                    mobile.buildTween();
                },
            });
        }, sectionRef);

        return () => {
            ctx.revert();
            desktop.tweenRef.current?.kill();
            mobile.tweenRef.current?.kill();
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Restart carousel when DB data loads
    useEffect(() => {
        if (!loadedFromDB) return;
        desktop.tweenRef.current?.kill();
        mobile.tweenRef.current?.kill();
        setTimeout(() => {
            desktop.buildTween();
            mobile.buildTween();
        }, 100);
    }, [loadedFromDB]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <section ref={sectionRef} id="projects" className="py-20 bg-secondary overflow-hidden">
            <div className="w-full">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-12 px-4">
                    <h2 ref={h2Ref} className="text-5xl font-bold text-primary mb-4"><T>Our Projects</T></h2>
                    <p ref={subRef} className="text-xl text-gray-400"><T>Explore our latest work and achievements</T></p>
                </div>

                {/* ── Desktop carousel ── */}
                <div
                    className="hidden md:block relative py-8"
                    onMouseEnter={desktop.pauseCarousel}
                    onMouseLeave={desktop.resumeCarousel}
                    onPointerDown={desktop.onPointerDown}
                    onPointerMove={desktop.onPointerMove}
                    onPointerUp={desktop.onPointerUp}
                    onPointerLeave={desktop.onPointerUp}
                    style={{ cursor: 'grab', userSelect: 'none' }}
                >
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-secondary to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-secondary to-transparent z-10 pointer-events-none" />
                    <div ref={desktopTrackRef} className="flex gap-8 px-8" style={{ width: 'max-content', willChange: 'transform' }}>
                        {duplicatedProjects.map((project, index) => (
                            <ProjectCard
                                key={`d-${project.id}-${index}`}
                                project={project}
                                cardWidth={CARD_WIDTH_DESKTOP}
                                onClick={() => handleProjectClick(project.link, project.type)}
                            />
                        ))}
                    </div>
                </div>
                <Dots count={projects.length} activeIndex={desktop.activeIndex} goTo={desktop.goTo} className="hidden md:flex" />

                {/* ── Mobile carousel ── */}
                <div
                    className="block md:hidden relative py-8"
                    onMouseEnter={mobile.pauseCarousel}
                    onMouseLeave={mobile.resumeCarousel}
                    onPointerDown={mobile.onPointerDown}
                    onPointerMove={mobile.onPointerMove}
                    onPointerUp={mobile.onPointerUp}
                    onPointerLeave={mobile.onPointerUp}
                    style={{ cursor: 'grab', userSelect: 'none', overflow: 'hidden' }}
                >
                    <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-secondary to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-secondary to-transparent z-10 pointer-events-none" />
                    <div ref={mobileTrackRef} className="flex gap-8 px-4" style={{ width: 'max-content', willChange: 'transform' }}>
                        {duplicatedProjects.map((project, index) => (
                            <ProjectCard
                                key={`m-${project.id}-${index}`}
                                project={project}
                                cardWidth={CARD_WIDTH_MOBILE}
                                onClick={() => handleProjectClick(project.link, project.type)}
                            />
                        ))}
                    </div>
                </div>
                <Dots count={projects.length} activeIndex={mobile.activeIndex} goTo={mobile.goTo} className="flex md:hidden" />

                <div className="text-center mt-4 px-4">
                    <p className="text-gray-500 text-sm"><T>Hover to pause · Drag to browse · Click dots to jump</T></p>
                </div>
            </div>

            <style>{`
                .custom-scrollbar-project { scrollbar-width: thin; scrollbar-color: rgba(0,187,229,0.4) transparent; }
                .custom-scrollbar-project::-webkit-scrollbar { width: 3px; }
                .custom-scrollbar-project::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar-project::-webkit-scrollbar-thumb { background: rgba(0,187,229,0.4); border-radius: 99px; }
            `}</style>
        </section>
    );
};

export default Projects;

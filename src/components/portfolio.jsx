import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import localPortfolio from '../interfaces/portfolioData';
import T from './T';
import { scrambleReveal, wordReveal } from '../utils/textAnimations';

gsap.registerPlugin(ScrollTrigger);

const API_URL = import.meta.env.VITE_API_URL || '';
const PAGE_SIZE_MOBILE = 4;
const PAGE_SIZE_TABLET = 6;
const PAGE_SIZE_DESKTOP = 12;

const FILTERS = [
    { id: 'all', label: 'All Work' },
    { id: 'Website', label: 'Websites' },
    { id: 'Software', label: 'Software' },
    { id: 'Restaurant', label: 'Restaurants' },
];

const TYPE_COLORS = {
    Website: 'bg-primary/20 text-primary border-primary/40',
    Software: 'bg-violet-500/20 text-violet-300 border-violet-400/40',
    Restaurant: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
};

function usePageSize() {
    const [pageSize, setPageSize] = useState(PAGE_SIZE_DESKTOP);

    useEffect(() => {
        const update = () => {
            const w = window.innerWidth;
            if (w < 640) setPageSize(PAGE_SIZE_MOBILE);
            else if (w < 1024) setPageSize(PAGE_SIZE_TABLET);
            else setPageSize(PAGE_SIZE_DESKTOP);
        };
        update();
        window.addEventListener('resize', update, { passive: true });
        return () => window.removeEventListener('resize', update);
    }, []);

    return pageSize;
}

function resolveImage(project) {
    if (project.image) return project.image;
    if (project.image_data) return project.image_data;
    if (project.image_url) return project.image_url;
    return null;
}

function normalizeApiProject(p) {
    return {
        id: p.id,
        title: p.title,
        description: p.description || '',
        type: p.type || 'Website',
        image: resolveImage(p),
        link: p.link || null,
        sort_order: p.sort_order ?? 999,
    };
}

function mergeProjects(apiProjects) {
    const byTitle = new Map();

    for (const p of apiProjects) {
        byTitle.set(p.title.toLowerCase(), p);
    }

    for (const local of localPortfolio) {
        const key = local.title.toLowerCase();
        if (!byTitle.has(key)) {
            byTitle.set(key, local);
        } else {
            const existing = byTitle.get(key);
            if (!existing.image && local.image) {
                byTitle.set(key, { ...existing, image: local.image });
            }
        }
    }

    return Array.from(byTitle.values());
}

function PortfolioCard({ project }) {
    const img = resolveImage(project);
    const typeClass = TYPE_COLORS[project.type] || TYPE_COLORS.Website;
    const hasLink = Boolean(project.link);

    const inner = (
        <>
            {/* Compact image on mobile, taller on desktop */}
            <div className="relative h-36 sm:h-44 md:h-52 overflow-hidden bg-white/5">
                {img ? (
                    <img
                        src={img}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-transparent to-violet-500/10">
                        <span className="text-4xl sm:text-5xl font-bold text-white/10 select-none">
                            {project.title.charAt(0)}
                        </span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-80" />
                <span className={`absolute top-2.5 left-2.5 text-[10px] sm:text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border ${typeClass}`}>
                    <T>{project.type}</T>
                </span>
            </div>

            <div className="p-3.5 sm:p-5 flex flex-col flex-1">
                <h3 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2 group-hover:text-primary transition-colors">
                    <T>{project.title}</T>
                </h3>
                {/* Shorter copy on mobile */}
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed flex-1 line-clamp-2 sm:line-clamp-3">
                    <T>{project.description}</T>
                </p>
                <div className="mt-3 sm:mt-4 flex items-center gap-1.5 text-primary text-xs sm:text-sm font-semibold">
                    {hasLink ? (
                        <>
                            <T>{project.type === 'Software' ? 'View Project' : 'Visit Website'}</T>
                            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </>
                    ) : (
                        <span className="text-primary/80"><T>Software Project</T></span>
                    )}
                </div>
            </div>
        </>
    );

    const className =
        'group portfolio-card flex flex-col h-full rounded-xl sm:rounded-2xl overflow-hidden border border-primary/20 bg-white/5 backdrop-blur-sm hover:border-primary/60 sm:hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(0,187,229,0.15)]';

    if (hasLink) {
        return (
            <a href={project.link} target="_blank" rel="noreferrer" className={className}>
                {inner}
            </a>
        );
    }

    return <div className={className}>{inner}</div>;
}

const Portfolio = () => {
    const sectionRef = useRef(null);
    const h2Ref = useRef(null);
    const subRef = useRef(null);

    const pageSize = usePageSize();
    const [projects, setProjects] = useState(localPortfolio);
    const [filter, setFilter] = useState('all');
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            try {
                const res = await fetch(`${API_URL}/api/projects`);
                if (!res.ok) throw new Error('API error');
                const data = await res.json();
                if (cancelled) return;
                const normalized = (Array.isArray(data) ? data : []).map(normalizeApiProject);
                setProjects(mergeProjects(normalized));
            } catch {
                if (!cancelled) setProjects(localPortfolio);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        load();
        return () => { cancelled = true; };
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            scrambleReveal(h2Ref.current, { stagger: 0.03 });
            wordReveal(subRef.current, { y: 22, stagger: 0.06, delay: 0.3 });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const filtered = useMemo(() => {
        if (filter === 'all') return projects;
        if (filter === 'Website') {
            return projects.filter((p) => p.type === 'Website' || p.type === 'Restaurant');
        }
        return projects.filter((p) => p.type === filter);
    }, [projects, filter]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const safePage = Math.min(page, totalPages - 1);
    const pageItems = filtered.slice(safePage * pageSize, safePage * pageSize + pageSize);

    useEffect(() => {
        setPage(0);
    }, [filter, pageSize]);

    const goToPage = (next) => {
        setPage(Math.max(0, Math.min(totalPages - 1, next)));
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <section ref={sectionRef} id="portfolio" className="py-12 sm:py-16 md:py-20 flex flex-col justify-center items-center">
            <div className="w-full max-w-6xl mx-auto px-4">
                <div className="text-center mb-8 sm:mb-12">
                    <h2 ref={h2Ref} className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-3 sm:mb-4">
                        <T>Our Portfolio</T>
                    </h2>
                    <p ref={subRef} className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-1">
                        <T>Every website, software platform, and restaurant experience we've crafted — all in one place.</T>
                    </p>
                </div>

                {/* Filters — scrollable row on mobile, wrap on desktop */}
                <div className="-mx-4 px-4 mb-7 sm:mb-10 sm:mx-0 sm:px-0">
                    <div className="flex sm:flex-wrap sm:justify-center gap-2 sm:gap-3 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
                        {FILTERS.map((f) => {
                            const active = filter === f.id;
                            const count = f.id === 'all'
                                ? projects.length
                                : f.id === 'Website'
                                    ? projects.filter((p) => p.type === 'Website' || p.type === 'Restaurant').length
                                    : projects.filter((p) => p.type === f.id).length;
                            return (
                                <button
                                    key={f.id}
                                    onClick={() => setFilter(f.id)}
                                    className={`flex-shrink-0 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold border transition-all whitespace-nowrap ${
                                        active
                                            ? 'bg-primary text-secondary border-primary shadow-[0_0_20px_rgba(0,187,229,0.35)]'
                                            : 'bg-white/5 text-gray-300 border-primary/25 hover:border-primary/60 hover:text-white'
                                    }`}
                                >
                                    <T>{f.label}</T>
                                    <span className={`ml-1.5 sm:ml-2 text-[10px] sm:text-xs ${active ? 'text-secondary/70' : 'text-gray-500'}`}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Grid — 1 col mobile, 2 tablet, 3 desktop; tighter gap on mobile */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-7">
                        {Array.from({ length: Math.min(pageSize, 6) }).map((_, i) => (
                            <div key={i} className="h-56 sm:h-80 rounded-xl sm:rounded-2xl border border-primary/10 bg-white/5 animate-pulse" />
                        ))}
                    </div>
                ) : pageItems.length === 0 ? (
                    <p className="text-center text-gray-400 py-12 sm:py-16">
                        <T>No projects in this category yet.</T>
                    </p>
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${filter}-${safePage}-${pageSize}`}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.35 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-7"
                        >
                            {pageItems.map((project) => (
                                <PortfolioCard key={project.id} project={project} />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-8 sm:mt-12 flex items-center justify-center gap-3 sm:gap-4">
                        <button
                            onClick={() => goToPage(safePage - 1)}
                            disabled={safePage === 0}
                            aria-label="Previous page"
                            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-primary/40 text-primary flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/10 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <span className="text-sm text-gray-400 tabular-nums min-w-[4.5rem] text-center sm:hidden">
                            {safePage + 1} / {totalPages}
                        </span>

                        <div className="hidden sm:flex items-center gap-2">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goToPage(i)}
                                    aria-label={`Page ${i + 1}`}
                                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                                        i === safePage
                                            ? 'bg-primary scale-125 shadow-[0_0_10px_rgba(0,187,229,0.6)]'
                                            : 'bg-white/25 hover:bg-white/50'
                                    }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => goToPage(safePage + 1)}
                            disabled={safePage >= totalPages - 1}
                            aria-label="Next page"
                            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-primary/40 text-primary flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/10 transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>

            <style>{`
                .scrollbar-none {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                .scrollbar-none::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
};

export default Portfolio;

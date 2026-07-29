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
const PAGE_SIZE = 12;

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

    // Local restaurants (and any local-only items) always appear —
    // API entries win on title match so live data stays authoritative.
    for (const local of localPortfolio) {
        const key = local.title.toLowerCase();
        if (!byTitle.has(key)) {
            byTitle.set(key, local);
        } else {
            // Prefer local image when API has none
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
            <div className="relative h-52 overflow-hidden bg-white/5">
                {img ? (
                    <img
                        src={img}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-transparent to-violet-500/10">
                        <span className="text-5xl font-bold text-white/10 select-none">
                            {project.title.charAt(0)}
                        </span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-80" />
                <span className={`absolute top-3 left-3 text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full border ${typeClass}`}>
                    <T>{project.type}</T>
                </span>
            </div>

            <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    <T>{project.title}</T>
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed flex-1 line-clamp-3">
                    <T>{project.description}</T>
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-primary text-sm font-semibold">
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
        'group portfolio-card flex flex-col h-full rounded-2xl overflow-hidden border border-primary/20 bg-white/5 backdrop-blur-sm hover:border-primary/60 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(0,187,229,0.15)]';

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
        // Websites includes restaurant sites — they're websites too
        if (filter === 'Website') {
            return projects.filter((p) => p.type === 'Website' || p.type === 'Restaurant');
        }
        return projects.filter((p) => p.type === filter);
    }, [projects, filter]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const safePage = Math.min(page, totalPages - 1);
    const pageItems = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

    useEffect(() => {
        setPage(0);
    }, [filter]);

    const goToPage = (next) => {
        setPage(Math.max(0, Math.min(totalPages - 1, next)));
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <section ref={sectionRef} id="portfolio" className="min-h-screen py-20 flex flex-col justify-center items-center">
            <div className="w-full max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 ref={h2Ref} className="text-5xl font-bold text-primary mb-4">
                        <T>Our Portfolio</T>
                    </h2>
                    <p ref={subRef} className="text-xl text-gray-400 max-w-3xl mx-auto">
                        <T>Every website, software platform, and restaurant experience we've crafted — all in one place.</T>
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
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
                                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${
                                    active
                                        ? 'bg-primary text-secondary border-primary shadow-[0_0_20px_rgba(0,187,229,0.35)]'
                                        : 'bg-white/5 text-gray-300 border-primary/25 hover:border-primary/60 hover:text-white'
                                }`}
                            >
                                <T>{f.label}</T>
                                <span className={`ml-2 text-xs ${active ? 'text-secondary/70' : 'text-gray-500'}`}>
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="h-80 rounded-2xl border border-primary/10 bg-white/5 animate-pulse" />
                        ))}
                    </div>
                ) : pageItems.length === 0 ? (
                    <p className="text-center text-gray-400 py-16">
                        <T>No projects in this category yet.</T>
                    </p>
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${filter}-${safePage}`}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.35 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
                        >
                            {pageItems.map((project) => (
                                <PortfolioCard key={project.id} project={project} />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                )}

                {/* Pagination — every 12 projects */}
                {totalPages > 1 && (
                    <div className="mt-12 flex items-center justify-center gap-4">
                        <button
                            onClick={() => goToPage(safePage - 1)}
                            disabled={safePage === 0}
                            aria-label="Previous page"
                            className="w-11 h-11 rounded-full border border-primary/40 text-primary flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/10 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2">
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
                            className="w-11 h-11 rounded-full border border-primary/40 text-primary flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/10 transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Portfolio;

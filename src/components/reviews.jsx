import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import T from './T';
import { useTranslation } from '../contexts/TranslationContext';

gsap.registerPlugin(ScrollTrigger);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const GOOGLE_REVIEW_URL = 'https://search.google.com/local/writereview?placeid=ChIJp_bZ8jxbNKIR_b1k2prTqmY';

const GoogleIcon = ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
);

const Stars = ({ rating, size = 'sm' }) => {
    const sz = size === 'lg' ? 'w-7 h-7' : size === 'md' ? 'w-5 h-5' : 'w-4 h-4';
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(i => (
                <svg key={i} className={`${sz} ${i <= rating ? 'text-yellow-400' : 'text-gray-600'}`}
                    fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
};

const StarPicker = ({ value, onChange }) => (
    <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(i => (
            <button key={i} type="button" onClick={() => onChange(i)} className="transition-transform hover:scale-110 active:scale-95">
                <svg className={`w-8 h-8 ${i <= value ? 'text-yellow-400' : 'text-gray-600'} transition-colors duration-150`}
                    fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            </button>
        ))}
    </div>
);

// ── Auto-rotating carousel ────────────────────────────────────────────────────
const ReviewCarousel = ({ reviews }) => {
    const [active, setActive]   = useState(0);
    const [paused, setPaused]   = useState(false);
    const cardRef               = useRef(null);
    const intervalRef           = useRef(null);
    const animating             = useRef(false);

    const goTo = useCallback((next) => {
        if (animating.current || !cardRef.current) return;
        animating.current = true;
        gsap.to(cardRef.current, {
            opacity: 0, y: -20, duration: 0.35, ease: 'power2.in',
            onComplete: () => {
                setActive(next);
                gsap.fromTo(cardRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out',
                      onComplete: () => { animating.current = false; } }
                );
            },
        });
    }, []);

    const prev = useCallback(() => goTo((active - 1 + reviews.length) % reviews.length), [active, goTo, reviews.length]);
    const next = useCallback(() => goTo((active + 1) % reviews.length), [active, goTo, reviews.length]);

    // Auto-advance every 5s
    useEffect(() => {
        if (paused) return;
        intervalRef.current = setInterval(() => {
            setActive(a => {
                const n = (a + 1) % reviews.length;
                if (!animating.current && cardRef.current) {
                    animating.current = true;
                    gsap.to(cardRef.current, {
                        opacity: 0, y: -20, duration: 0.35, ease: 'power2.in',
                        onComplete: () => {
                            setActive(n);
                            gsap.fromTo(cardRef.current,
                                { opacity: 0, y: 20 },
                                { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out',
                                  onComplete: () => { animating.current = false; } }
                            );
                        },
                    });
                }
                return a;
            });
        }, 5000);
        return () => clearInterval(intervalRef.current);
    }, [paused, reviews.length]);

    const r = reviews[active];

    return (
        <div className="relative w-full max-w-2xl mx-auto"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}>

            {/* Card */}
            <div ref={cardRef}
                className="bg-white/5 border border-primary/25 rounded-2xl p-8 md:p-10 flex flex-col gap-5 min-h-[220px]">

                {/* Top row */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                        {r.avatar
                            ? <img src={r.avatar} alt={r.author || r.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/30" />
                            : (
                                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg flex-shrink-0 ring-2 ring-primary/20">
                                    {(r.author || r.name || '?').charAt(0).toUpperCase()}
                                </div>
                            )
                        }
                        <div>
                            <p className="text-white font-semibold">{r.author || r.name}</p>
                            {r.company && <p className="text-gray-500 text-xs mt-0.5">{r.company}</p>}
                            <div className="mt-1"><Stars rating={r.rating} size="md" /></div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        {r.isGoogle && <GoogleIcon className="w-5 h-5" />}
                        {r.time && <span className="text-gray-600 text-xs">{r.time}</span>}
                    </div>
                </div>

                {/* Review text */}
                {r.text
                    ? <p className="text-gray-300 leading-relaxed text-[15px] italic">"{r.text}"</p>
                    : <p className="text-gray-600 italic text-sm"><T>No written review.</T></p>
                }
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-5 px-1">
                {/* Prev / Next */}
                <button onClick={prev}
                    className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/50 transition-all">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Dots */}
                <div className="flex gap-2">
                    {reviews.map((_, i) => (
                        <button key={i} onClick={() => goTo(i)}
                            className={`rounded-full transition-all duration-300 ${i === active ? 'w-6 h-2 bg-primary' : 'w-2 h-2 bg-white/20 hover:bg-white/40'}`} />
                    ))}
                </div>

                <button onClick={next}
                    className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/50 transition-all">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

// ── Main component ────────────────────────────────────────────────────────────
const Reviews = () => {
    const sectionRef = useRef(null);
    const headerRef  = useRef(null);
    const { t } = useTranslation();

    const [googleData, setGoogleData]       = useState({ rating: 0, total: 0, reviews: [] });
    const [testimonials, setTestimonials]   = useState([]);
    const [googleLoading, setGoogleLoading] = useState(true);
    const [form, setForm]     = useState({ name: '', company: '', rating: 5, message: '' });
    const [photoFile, setPhotoFile]   = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted]   = useState(false);
    const [error, setError]           = useState('');
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetch(`${API_URL}/api/reviews`)
            .then(r => r.json())
            .then(d => { setGoogleData(d); setGoogleLoading(false); })
            .catch(() => setGoogleLoading(false));
    }, []);

    const loadTestimonials = () => {
        fetch(`${API_URL}/api/testimonials`)
            .then(r => r.json())
            .then(d => Array.isArray(d) && setTestimonials(d))
            .catch(() => {});
    };
    useEffect(() => { loadTestimonials(); }, []);

    // GSAP section entrance
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(headerRef.current, {
                y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
            });
            gsap.from('.reviews-bottom', {
                y: 40, opacity: 0, duration: 0.8, delay: 0.15, ease: 'power3.out',
                scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setPhotoFile(file);
        const reader = new FileReader();
        reader.onload = (ev) => setPhotoPreview(ev.target.result);
        reader.readAsDataURL(file);
    };

    const removePhoto = () => {
        setPhotoFile(null);
        setPhotoPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.message) { setError(t('Please fill in all required fields.')); return; }
        setSubmitting(true); setError('');
        try {
            const fd = new FormData();
            fd.append('name', form.name);
            fd.append('company', form.company || '');
            fd.append('rating', form.rating);
            fd.append('message', form.message);
            if (photoFile) fd.append('photo', photoFile);

            const res = await fetch(`${API_URL}/api/testimonials`, { method: 'POST', body: fd });
            if (!res.ok) throw new Error('Failed');
            setSubmitted(true);
            setForm({ name: '', company: '', rating: 5, message: '' });
            removePhoto();
            loadTestimonials();
        } catch {
            setError(t('Something went wrong. Please try again.'));
        }
        setSubmitting(false);
    };

    const allReviews = [
        ...googleData.reviews.map(r => ({ ...r, isGoogle: true })),
        ...testimonials.map(r => ({ author: r.name, company: r.company, rating: r.rating, text: r.message, avatar: r.photo || null, time: new Date(r.created_at).toLocaleDateString(), isGoogle: false })),
    ];

    // Combined rating
    const allRatings  = allReviews.map(r => r.rating);
    const avgRating   = allRatings.length ? (allRatings.reduce((a, b) => a + b, 0) / allRatings.length) : 0;
    const totalCount  = googleData.total + testimonials.length;

    return (
        <section ref={sectionRef} id="reviews" className="py-20 bg-secondary overflow-hidden">
            <div className="w-full max-w-5xl mx-auto px-4">

                {/* ── Header ── */}
                <div ref={headerRef} className="text-center mb-12">
                    <h2 className="text-5xl font-bold text-primary mb-4"><T>What Our Clients Say</T></h2>
                    <p className="text-xl text-gray-400 mb-8"><T>Real experiences from businesses we've helped grow.</T></p>

                    {/* Big combined rating */}
                    {avgRating > 0 && (
                        <div className="inline-flex flex-col items-center gap-2">
                            <div className="flex items-end gap-3">
                                <span className="text-6xl font-bold text-white leading-none">{avgRating.toFixed(1)}</span>
                                <div className="flex flex-col items-start pb-1 gap-1">
                                    <Stars rating={Math.round(avgRating)} size="lg" />
                                    <span className="text-gray-500 text-sm">{totalCount} <T>reviews</T></span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500 text-xs">
                                <GoogleIcon className="w-4 h-4" />
                                <span><T>Verified Google reviews</T></span>
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Carousel ── */}
                {googleLoading ? (
                    <div className="flex justify-center py-16">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : allReviews.length > 0 ? (
                    <ReviewCarousel reviews={allReviews} />
                ) : (
                    <p className="text-center text-gray-500 py-8"><T>No reviews yet. Be the first!</T></p>
                )}

                {/* ── Divider ── */}
                <div className="border-t border-white/10 my-16" />

                {/* ── Bottom: form + Google CTA ── */}
                <div className="reviews-bottom grid md:grid-cols-2 gap-12 items-start">

                    {/* Form */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2"><T>Share Your Experience</T></h3>
                        <p className="text-gray-400 text-sm mb-6"><T>Your review will appear on this page after a quick check.</T></p>

                        {submitted ? (
                            <div className="bg-primary/10 border border-primary/30 rounded-xl p-6 text-center">
                                <div className="text-4xl mb-3">🎉</div>
                                <h4 className="text-white font-bold text-lg mb-2"><T>Thank you for your review!</T></h4>
                                <p className="text-gray-400 text-sm mb-5"><T>It will appear here once approved. Want to share it on Google too?</T></p>
                                <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm">
                                    <GoogleIcon className="w-4 h-4" />
                                    <T>Also post on Google</T>
                                </a>
                                <button onClick={() => setSubmitted(false)}
                                    className="block mx-auto mt-3 text-gray-500 text-xs hover:text-gray-300 transition-colors">
                                    <T>Leave another review</T>
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-gray-400 text-xs uppercase tracking-wide"><T>Name</T> *</label>
                                        <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                                            placeholder={t('Your name')}
                                            className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary transition-colors" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-gray-400 text-xs uppercase tracking-wide"><T>Company</T></label>
                                        <input value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))}
                                            placeholder={t('Optional')}
                                            className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary transition-colors" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-gray-400 text-xs uppercase tracking-wide"><T>Rating</T> *</label>
                                    <StarPicker value={form.rating} onChange={r => setForm(p => ({ ...p, rating: r }))} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-gray-400 text-xs uppercase tracking-wide"><T>Your review</T> *</label>
                                    <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                                        rows={4} placeholder={t('Tell us about your experience...')}
                                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary transition-colors resize-none" />
                                </div>

                                {/* Photo upload */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-gray-400 text-xs uppercase tracking-wide"><T>Your photo</T> <span className="normal-case text-gray-600">(<T>optional</T>)</span></label>
                                    {photoPreview ? (
                                        <div className="flex items-center gap-4">
                                            <img src={photoPreview} alt="preview" className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/40" />
                                            <div className="flex flex-col gap-1">
                                                <span className="text-gray-400 text-xs">{photoFile?.name}</span>
                                                <button type="button" onClick={removePhoto}
                                                    className="text-red-400 text-xs hover:text-red-300 transition-colors text-left">
                                                    ✕ <T>Remove photo</T>
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button type="button" onClick={() => fileInputRef.current?.click()}
                                            className="flex items-center gap-3 w-full border border-dashed border-white/20 hover:border-primary/50 rounded-lg px-4 py-3 text-gray-400 hover:text-white transition-all text-sm">
                                            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                            </svg>
                                            <T>Upload a photo</T>
                                        </button>
                                    )}
                                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                                </div>

                                {error && <p className="text-red-400 text-sm">{error}</p>}
                                <button type="submit" disabled={submitting}
                                    className="w-full py-3 bg-primary text-secondary font-semibold rounded-lg hover:bg-primary/90 active:scale-95 transition-all text-sm disabled:opacity-50">
                                    {submitting ? <T>Submitting...</T> : <T>Submit Review</T>}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Google CTA */}
                    <div className="flex flex-col items-center justify-center text-center bg-white/3 border border-white/10 rounded-2xl p-8 gap-5">
                        <GoogleIcon className="w-14 h-14" />
                        <div>
                            <h4 className="text-white font-bold text-lg mb-2"><T>Happy with our work?</T></h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                <T>Help others find us by leaving a review on Google. It takes less than a minute and means the world to us.</T>
                            </p>
                        </div>
                        {avgRating > 0 && (
                            <div className="flex items-center gap-2">
                                <Stars rating={Math.round(avgRating)} size="lg" />
                                <span className="text-white font-bold text-2xl">{avgRating.toFixed(1)}</span>
                            </div>
                        )}
                        <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                            <GoogleIcon className="w-4 h-4" />
                            <T>Review us on Google</T>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Reviews;

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import T from './T';
import { useTranslation } from '../contexts/TranslationContext';

gsap.registerPlugin(ScrollTrigger);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const GOOGLE_REVIEW_URL = 'https://search.google.com/local/writereview?placeid=REPLACE_WITH_YOUR_PLACE_ID';

// ── Star display ──────────────────────────────────────────────────────────────
const Stars = ({ rating, size = 'sm' }) => {
    const sz = size === 'lg' ? 'w-6 h-6' : 'w-4 h-4';
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

// ── Single review card ────────────────────────────────────────────────────────
const ReviewCard = ({ name, company, rating, text, time, avatar, isGoogle }) => (
    <div className="flex-shrink-0 w-[300px] md:w-[340px] bg-white/5 border border-primary/20 rounded-2xl p-6 flex flex-col gap-3 hover:border-primary/50 transition-colors duration-300">
        <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
                {avatar
                    ? <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover" />
                    : (
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                            {name.charAt(0).toUpperCase()}
                        </div>
                    )
                }
                <div>
                    <p className="text-white font-semibold text-sm leading-tight">{name}</p>
                    {company && <p className="text-gray-500 text-xs">{company}</p>}
                </div>
            </div>
            {isGoogle && (
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
            )}
        </div>
        <Stars rating={rating} />
        <p className="text-gray-300 text-sm leading-relaxed flex-1 line-clamp-4">{text}</p>
        {time && <p className="text-gray-600 text-xs mt-auto">{time}</p>}
    </div>
);

// ── Star picker for form ──────────────────────────────────────────────────────
const StarPicker = ({ value, onChange }) => (
    <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(i => (
            <button key={i} type="button" onClick={() => onChange(i)}
                className="transition-transform hover:scale-110">
                <svg className={`w-8 h-8 ${i <= value ? 'text-yellow-400' : 'text-gray-600'} transition-colors`}
                    fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            </button>
        ))}
    </div>
);

// ── Main component ────────────────────────────────────────────────────────────
const Reviews = () => {
    const sectionRef = useRef(null);
    const { t } = useTranslation();

    const [googleData, setGoogleData]       = useState({ rating: 0, total: 0, reviews: [] });
    const [testimonials, setTestimonials]   = useState([]);
    const [googleLoading, setGoogleLoading] = useState(true);
    const [form, setForm] = useState({ name: '', company: '', rating: 5, message: '' });
    const [submitting, setSubmitting]       = useState(false);
    const [submitted, setSubmitted]         = useState(false);
    const [error, setError]                 = useState('');

    // Fetch Google reviews
    useEffect(() => {
        fetch(`${API_URL}/api/reviews`)
            .then(r => r.json())
            .then(d => { setGoogleData(d); setGoogleLoading(false); })
            .catch(() => setGoogleLoading(false));
    }, []);

    // Fetch site testimonials
    const loadTestimonials = () => {
        fetch(`${API_URL}/api/testimonials`)
            .then(r => r.json())
            .then(d => Array.isArray(d) && setTestimonials(d))
            .catch(() => {});
    };
    useEffect(() => { loadTestimonials(); }, []);

    // GSAP entrance
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.reviews-card', {
                y: 50, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
                scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, [googleData, testimonials]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.message) { setError(t('Please fill in all required fields.')); return; }
        setSubmitting(true); setError('');
        try {
            const res = await fetch(`${API_URL}/api/testimonials`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error('Failed');
            setSubmitted(true);
            setForm({ name: '', company: '', rating: 5, message: '' });
            loadTestimonials();
        } catch {
            setError(t('Something went wrong. Please try again.'));
        }
        setSubmitting(false);
    };

    const allReviews = [
        ...googleData.reviews.map(r => ({ ...r, isGoogle: true })),
        ...testimonials.map(r => ({ name: r.name, company: r.company, rating: r.rating, text: r.message, time: new Date(r.created_at).toLocaleDateString(), isGoogle: false })),
    ];

    return (
        <section ref={sectionRef} id="reviews" className="py-20 bg-secondary">
            <div className="w-full max-w-6xl mx-auto px-4">

                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-bold text-primary mb-4"><T>What Our Clients Say</T></h2>
                    <p className="text-xl text-gray-400"><T>Real experiences from businesses we've helped grow.</T></p>

                    {/* Overall rating badge */}
                    {googleData.rating > 0 && (
                        <div className="inline-flex items-center gap-3 mt-6 bg-white/5 border border-primary/20 rounded-full px-6 py-3">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            <Stars rating={Math.round(googleData.rating)} />
                            <span className="text-white font-bold">{googleData.rating.toFixed(1)}</span>
                            <span className="text-gray-400 text-sm">({googleData.total} <T>reviews</T>)</span>
                        </div>
                    )}
                </div>

                {/* Reviews carousel */}
                {googleLoading ? (
                    <div className="flex justify-center py-12">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : allReviews.length > 0 ? (
                    <div className="overflow-x-auto pb-4 -mx-4 px-4"
                        style={{ scrollbarWidth: 'none' }}>
                        <div className="flex gap-5 w-max">
                            {allReviews.map((r, i) => (
                                <div key={i} className="reviews-card">
                                    <ReviewCard {...r} />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 py-8"><T>No reviews yet. Be the first!</T></p>
                )}

                {/* Divider */}
                <div className="border-t border-white/10 my-14" />

                {/* Leave a review */}
                <div className="grid md:grid-cols-2 gap-12 items-start">

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
                                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
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
                        <svg className="w-14 h-14" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        <div>
                            <h4 className="text-white font-bold text-lg mb-2"><T>Happy with our work?</T></h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                <T>Help others find us by leaving a review on Google. It takes less than a minute and means the world to us.</T>
                            </p>
                        </div>
                        {googleData.rating > 0 && (
                            <div className="flex items-center gap-2">
                                <Stars rating={Math.round(googleData.rating)} size="lg" />
                                <span className="text-white font-bold text-xl">{googleData.rating.toFixed(1)}</span>
                            </div>
                        )}
                        <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            <T>Review us on Google</T>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Reviews;

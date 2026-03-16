import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { batchTranslationManager, translateBulk } from '../utils/translationQueue';

const TranslationContext = createContext();
const CACHE_VERSION = 'v10';

export const useTranslation = () => {
    const ctx = useContext(TranslationContext);
    if (!ctx) throw new Error('useTranslation must be used within a TranslationProvider');
    return ctx;
};

// Every translatable string in the app. Keep this in sync with UI text.
const ALL_STRINGS = [
    // Navbar
    'Home', 'Services', 'Projects', 'About', 'Contact', 'Careers',
    'Get Started', 'Back to Home',
    // Hero
    'Web Development', 'Mobile Development', 'UI/UX Design',
    'We are a team of experienced developers and designers who are passionate about creating beautiful and functional websites and mobile apps.',
    // About
    'Our Mission', 'Our Team',
    'We have successfully delivered over 20 projects across various industries, helping businesses transform their digital presence and achieve their goals.',
    'We empower businesses through technology, creating digital solutions that solve complex problems and drive meaningful growth in an ever-evolving digital landscape.',
    'Our diverse team of experts combines technical excellence with creative thinking, working collaboratively to deliver innovative solutions tailored to your unique needs.',
    // Services
    'We build digital experiences that set you apart from the competition.',
    'Hover to learn more', 'Tap to learn more',
    'Web Development', 'Custom websites built for speed, beauty & results.',
    'We design and build fully custom websites using modern frameworks. From landing pages to complex web platforms — every site is tailored to your brand, optimized for performance, and crafted to convert visitors into customers.',
    'Hosting & Maintenance', 'Your website, always online and up to date.',
    'We handle everything after launch — fast and reliable hosting, regular updates, security patches, backups, and ongoing technical support. You focus on your business, we keep your site running perfectly.',
    'Google SEO', 'Get found on Google and grow organically.',
    'We optimize your website to rank higher on Google through on-page SEO, technical audits, keyword strategy, and content optimization. More visibility means more traffic and more customers finding you first.',
    'QR & Business Cards', 'Make your first impression unforgettable.',
    'We design custom QR codes and professional business cards that reflect your brand identity. Smart QR codes link to your website, portfolio, or contact info — turning every card into a powerful digital gateway.',
    // Process
    'Our Process', 'A proven methodology to bring your ideas to life',
    'Discovery & Consultation', 'We start by understanding your business goals, target audience, and project requirements through detailed discussions.',
    'Planning & Strategy', 'Our team creates a comprehensive project roadmap, defining timelines, milestones, and technical specifications.',
    'Design & Prototyping', 'We craft intuitive UI/UX designs and interactive prototypes to visualize your product before development begins.',
    'Development', 'Our expert developers bring designs to life using cutting-edge technologies and best coding practices.',
    'Testing & Quality Assurance', 'Rigorous testing ensures your product is bug-free, secure, and performs optimally across all devices.',
    'Launch & Support', 'We deploy your product and provide ongoing maintenance, updates, and technical support to ensure success.',
    'Start Your Project',
    // Projects
    'Our Projects', 'Explore our latest work and achievements',
    'Website', 'Software',
    'Visit Website', 'Coming Soon', 'Software Project',
    'Hover to pause · Drag to browse · Click dots to jump',
    'Portfolio', 'Musician Portfolio', 'Inside Observation', 'AI Software Platform', 'Booking & Invitation System', 'Papageorgiou Fugen',
    'Personal portfolio website showcasing creative work, projects, and professional achievements with modern design.',
    'Portfolio website for a professional musician — showcasing discography, events, and press kit.',
    'Professional website dedicated to energy therapies, holistic wellness, and spiritual healing services.',
    'Advanced AI-powered software solution built with Flowise for intelligent automation and workflows.',
    'Comprehensive software for managing bookings and sending automated invitations to clients.',
    'Professional business website delivering quality services and solutions.',
    // FAQ
    'Frequently Asked Questions', "Got questions? We've got answers",
    'How long does it take to build a website?',
    'The timeline varies based on project complexity. A basic website typically takes 2-4 weeks, while more complex projects with custom features can take 8-12 weeks. We provide a detailed timeline during our initial consultation.',
    'What technologies do you use?',
    'We use modern, industry-standard technologies including React, Node.js, Next.js, Tailwind CSS, and various databases. We choose the best tech stack based on your specific project requirements and goals.',
    'Do you provide ongoing support after launch?',
    "Yes! All our packages include post-launch support. We offer maintenance plans ranging from 30 days to 12 months, depending on your chosen package. We're here to help with updates, bug fixes, and improvements.",
    'Can you help with mobile app development?',
    'Absolutely! We specialize in both iOS and Android app development using React Native and native technologies. We can create cross-platform apps or platform-specific solutions based on your needs.',
    'What is your pricing structure?',
    'We offer flexible pricing based on project scope and requirements. Our packages start from CHF 2,500 for basic websites. For custom projects, we provide detailed quotes after understanding your needs. All prices exclude VAT.',
    'Do you work with clients outside of Zurich?',
    "Yes! While we're based in Zurich, we work with clients throughout Switzerland and internationally. We're comfortable conducting meetings remotely and can travel when necessary.",
    'Will my website be mobile-friendly?',
    'Absolutely! All our websites are fully responsive and optimized for mobile devices, tablets, and desktops. Mobile-first design is a core part of our development process.',
    'Can you help with SEO and digital marketing?',
    'Yes! We implement SEO best practices in all our projects, including proper meta tags, structured data, and performance optimization. We can also connect you with our marketing partners for comprehensive digital marketing strategies.',
    'Still have questions?', 'Contact Us',
    // CTA
    'Ready to Transform Your Digital Presence?',
    "Let's build something amazing together. Get in touch with our team and start your journey to digital success.",
    'Get Started Now', 'View Our Services',
    'Based in Switzerland',
    'Projects Delivered', 'Client Satisfaction', 'Support Available', 'Years Experience',
    // Contact
    'Propose Your Project',
    "Share your vision with us, and let's transform your ideas into innovative digital solutions. Tell us about your project requirements, and we'll get back to you with a tailored plan.",
    'Full Name', 'Email Address', 'Subject', 'Message',
    'Enter your full name', 'Enter your email address', 'What is this regarding?', 'Enter your message here...',
    'Sending...', 'Submit Message',
    'Our Location', 'Phone Number',
    // Footer
    'Quick Links', 'About Us', 'Contact Us', 'All rights reserved.',
    'We specialize in creating beautiful and functional websites and mobile applications that help businesses grow and succeed in the digital world.',
    // Careers
    'Join Our Team',
    'Be part of a dynamic team building innovative digital solutions for clients across Switzerland and beyond.',
    'Why Work With Us?',
    'Competitive Salary', 'We offer market-leading compensation packages',
    'Flexible Hours', "Work when you're most productive",
    'Remote Options', 'Hybrid or fully remote work available',
    'Learning Budget', 'Annual budget for courses and conferences',
    'Modern Tech', 'Work with the latest technologies and tools',
    'Team Events', 'Regular team activities and celebrations',
    'Open Positions', 'No Available Positions Right Now',
    "We don't have any open positions at the moment, but we're always interested in connecting with talented professionals.",
    'Send your CV to', 'Interested in Joining Us?',
    "We're always looking for talented individuals. Send your CV and we'll get in touch if there's a fit.",
    'Send applications to',
    // Service detail
    'Service Not Found', 'Go Home',
    // Reviews
    'What Our Clients Say', 'Real experiences from businesses we\'ve helped grow.',
    'reviews', 'No reviews yet. Be the first!',
    'Share Your Experience', 'Your review will appear on this page after a quick check.',
    'Thank you for your review!', 'It will appear here once approved. Want to share it on Google too?',
    'Also post on Google', 'Leave another review',
    'Name', 'Company', 'Rating', 'Your review',
    'Your name', 'Optional', 'Tell us about your experience...',
    'Submitting...', 'Submit Review',
    'Happy with our work?',
    'Help others find us by leaving a review on Google. It takes less than a minute and means the world to us.',
    'Review us on Google',
    'Please fill in all required fields.', 'Something went wrong. Please try again.',
    'Your photo', 'optional', 'Upload a photo', 'Remove photo',
    'No written review.', 'Verified Google reviews',
    'Email', 'your@email.com (not shown publicly)',
];

// Deduplicate ALL_STRINGS (avoid sending duplicates to DeepL)
const UNIQUE_STRINGS = [...new Set(ALL_STRINGS)];

// ── Load/save helpers ─────────────────────────────────────────────────────────
function loadCache() {
    try {
        const ver = localStorage.getItem('trans_version');
        if (ver !== CACHE_VERSION) {
            localStorage.removeItem('trans_cache');
            localStorage.removeItem('translations');
            localStorage.removeItem('translations_version');
            localStorage.setItem('trans_version', CACHE_VERSION);
            return {};
        }
        return JSON.parse(localStorage.getItem('trans_cache') || '{}');
    } catch { return {}; }
}

function saveCache(data) {
    try { localStorage.setItem('trans_cache', JSON.stringify(data)); } catch {}
}

// ── Provider ──────────────────────────────────────────────────────────────────
export const TranslationProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en');

    // cacheRef is the single source of truth for translations — always up to date.
    // We also keep a `tick` counter so <T> components re-render when cache grows.
    const cacheRef = useRef(loadCache());
    const [tick, setTick] = useState(0);

    // Persist to localStorage whenever cache changes
    const flushCache = useCallback(() => {
        saveCache(cacheRef.current);
        setTick(n => n + 1); // trigger re-render of all <T> components
    }, []);

    useEffect(() => { localStorage.setItem('language', language); }, [language]);

    // Stable — reads cacheRef directly, no stale closures
    const translateText = useCallback(async (text, targetLang) => {
        if (!text || typeof text !== 'string' || targetLang === 'en') return text;
        const key = `${text}__${targetLang}`;
        if (cacheRef.current[key]) return cacheRef.current[key];
        try {
            const result = await batchTranslationManager.translate(text, targetLang);
            cacheRef.current = { ...cacheRef.current, [key]: result };
            flushCache();
            return result;
        } catch { return text; }
    }, [flushCache]);

    // Sync getter — used by <T> for immediate zero-delay reads
    const t = useCallback((text) => {
        if (!text || language === 'en') return text;
        return cacheRef.current[`${text}__${language}`] || text;
    }, [language]);

    // Pre-warm: fetch only strings NOT already in cache
    const prewarm = useCallback(async (targetLang) => {
        const missing = UNIQUE_STRINGS.filter(s => !cacheRef.current[`${s}__${targetLang}`]);
        if (missing.length === 0) return; // everything cached — instant, no API call
        try {
            const translated = await translateBulk(missing, targetLang);
            const newEntries = {};
            missing.forEach((s, i) => { newEntries[`${s}__${targetLang}`] = translated[i] ?? s; });
            cacheRef.current = { ...cacheRef.current, ...newEntries };
            flushCache();
        } catch (e) {
            console.error('[Translation] pre-warm failed:', e);
        }
    }, [flushCache]);

    // On mount: pre-warm if language is non-English
    useEffect(() => {
        if (language !== 'en') prewarm(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Change language + pre-warm
    const changeLanguage = useCallback(async (newLang) => {
        if (newLang === language) return;
        setLanguage(newLang);
        if (newLang !== 'en') await prewarm(newLang);
    }, [language, prewarm]);

    return (
        <TranslationContext.Provider value={{ language, cacheRef, tick, changeLanguage, translateText, t }}>
            {children}
        </TranslationContext.Provider>
    );
};

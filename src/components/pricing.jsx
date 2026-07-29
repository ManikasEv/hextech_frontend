import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import T from './T';

const websitePlan = {
    name: 'Website Package',
    price: 'CHF 1’500',
    period: 'one-time',
    description: 'Full business website with clear, transparent pricing',
    features: [
        'Custom website design and development',
        'SEO-ready structure and fast performance',
        'CHF 200 maintenance fee (yearly)',
        'Domain renewal and email renewal billed at cost',
        'Custom software with database maintenance scales by usage',
        'Ideal for restaurants and service businesses',
    ],
    cta: 'Get Started',
};

// Organised by creative effort + how many ads you get
const adPlans = [
    {
        name: 'Product Ads',
        price: 'CHF 350',
        period: 'month',
        volume: '6 ads / month',
        effort: 'Light effort',
        description: 'Simple product ads — clean stills and short clips that show what you sell.',
        features: [
            'Up to 6 simple product ads per month',
            'Product stills & short clip formats',
            'AI-assisted creative production',
            'Fast turnaround for catalog-style ads',
            'Best for shops, menus, and product launches',
        ],
        highlighted: false,
        badge: null,
    },
    {
        name: 'Story Ads',
        price: 'CHF 750',
        period: 'month',
        volume: '3 ads / month',
        effort: 'Medium effort',
        description: 'Short story-driven ads (about 15–30s) with more concept and editing.',
        features: [
            'Up to 3 story ads per month',
            '15–30 second narrative creatives',
            'Concept, script direction & editing',
            'Stronger brand storytelling',
            'Ideal for offers, promotions, and brand awareness',
        ],
        highlighted: true,
        badge: 'MOST POPULAR',
    },
    {
        name: 'Commercial Film',
        price: 'CHF 2’800',
        period: 'film',
        volume: '1 film / project',
        effort: 'High effort',
        description: 'A full cinematic commercial — like a short movie built around your brand.',
        features: [
            '1 full commercial / short film per project',
            'Cinematic concept, storyboard & direction',
            'Advanced AI + post-production finish',
            'Multiple aspect ratios for ads & social',
            'Best when you want a hero film, not just product shots',
        ],
        highlighted: false,
        badge: null,
    },
];

function PlanCard({ plan, index = 0 }) {
    const isHot = plan.highlighted;

    return (
        <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative flex flex-col rounded-2xl border p-6 sm:p-8 h-full transition-all ${
                isHot
                    ? 'bg-primary text-secondary border-primary shadow-[0_0_40px_rgba(0,187,229,0.25)] scale-[1.02] z-10'
                    : 'bg-white/5 text-white border-primary/25 hover:border-primary/50 backdrop-blur-sm'
            }`}
        >
            {plan.badge && (
                <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-bold tracking-wide flex items-center gap-1.5 ${
                    isHot ? 'bg-secondary text-primary' : 'bg-primary text-secondary'
                }`}>
                    <Sparkles className="w-3 h-3" />
                    <T>{plan.badge}</T>
                </div>
            )}

            <div className="text-center mb-5">
                <h3 className={`text-xl sm:text-2xl font-bold mb-3 ${isHot ? 'text-secondary' : 'text-white'}`}>
                    <T>{plan.name}</T>
                </h3>

                {/* Volume + effort chips */}
                {(plan.volume || plan.effort) && (
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {plan.volume && (
                            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                                isHot
                                    ? 'border-secondary/40 bg-secondary/15 text-secondary'
                                    : 'border-primary/40 bg-primary/10 text-primary'
                            }`}>
                                <T>{plan.volume}</T>
                            </span>
                        )}
                        {plan.effort && (
                            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                                isHot
                                    ? 'border-secondary/40 bg-secondary/10 text-secondary/90'
                                    : 'border-white/20 bg-white/5 text-gray-300'
                            }`}>
                                <T>{plan.effort}</T>
                            </span>
                        )}
                    </div>
                )}

                <div className="mb-3">
                    <span className={`text-3xl sm:text-4xl font-bold ${isHot ? 'text-secondary' : 'text-primary'}`}>
                        {plan.price}
                    </span>
                    {plan.period && (
                        <span className={`text-sm sm:text-base ml-1 ${isHot ? 'text-secondary/70' : 'text-gray-400'}`}>
                            /<T>{plan.period}</T>
                        </span>
                    )}
                </div>
                <p className={`text-sm leading-relaxed ${isHot ? 'text-secondary/80' : 'text-gray-400'}`}>
                    <T>{plan.description}</T>
                </p>
            </div>

            <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2.5">
                        <Check className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 ${
                            isHot ? 'text-secondary' : 'text-primary'
                        }`} />
                        <span className={`text-sm ${isHot ? 'text-secondary' : 'text-gray-300'}`}>
                            <T>{feature}</T>
                        </span>
                    </li>
                ))}
            </ul>

            <a
                href="#contact"
                className={`w-full py-3 rounded-lg font-semibold transition-all block text-center mt-auto ${
                    isHot
                        ? 'bg-secondary text-primary hover:bg-secondary/90'
                        : 'bg-primary text-secondary hover:bg-primary/90'
                }`}
            >
                <T>{plan.cta || 'Get Started'}</T>
            </a>
        </motion.div>
    );
}

const Pricing = () => {
    return (
        <section id="pricing" className="py-12 sm:py-16 md:py-20">
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55 }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-3 sm:mb-4">
                        <T>Pricing</T>
                    </h2>
                    <p className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto">
                        <T>Clear packages for websites and advertising — pick what fits, or ask us for a custom mix.</T>
                    </p>
                </motion.div>

                {/* ── Websites ── */}
                <div className="mb-14 sm:mb-20">
                    <div className="flex items-center gap-3 mb-6 sm:mb-8">
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">
                            <T>Websites</T>
                        </span>
                        <div className="flex-1 h-px bg-primary/20" />
                    </div>

                    <div className="max-w-2xl mx-auto">
                        <PlanCard plan={websitePlan} index={0} />
                    </div>
                </div>

                {/* ── Advertising ── */}
                <div>
                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">
                            <T>Advertising</T>
                        </span>
                        <div className="flex-1 h-px bg-primary/20" />
                    </div>
                    <p className="text-sm text-gray-400 mb-6 sm:mb-8 max-w-3xl">
                        <T>Packages are based on how many ads you need and how much creative effort each one takes — from simple product shots to full cinematic commercials. Media ad spend is paid to the platforms separately.</T>
                    </p>

                    <div className="flex lg:grid lg:grid-cols-3 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none gap-5 lg:gap-6 -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 lg:pb-0 scrollbar-none items-stretch">
                        {adPlans.map((plan, index) => (
                            <div
                                key={plan.name}
                                className="flex-shrink-0 w-[min(85vw,320px)] sm:w-[min(70vw,340px)] lg:w-auto snap-center pt-4"
                            >
                                <PlanCard plan={plan} index={index} />
                            </div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-10 sm:mt-12 max-w-2xl mx-auto space-y-3"
                >
                    <p className="text-sm text-gray-400 leading-relaxed">
                        <T>The prices shown are our standard package rates. Scope and investment can be adjusted to your needs — feel free to contact us and we’ll prepare a tailored proposal.</T>
                    </p>
                    <p className="text-sm text-gray-500">
                        <T>All prices exclude VAT.</T>
                    </p>
                    <a
                        href="#contact"
                        className="inline-block mt-2 text-primary font-semibold text-sm hover:underline"
                    >
                        <T>Contact us about custom pricing</T>
                    </a>
                </motion.div>
            </div>

            <style>{`
                .scrollbar-none {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                    -webkit-overflow-scrolling: touch;
                }
                .scrollbar-none::-webkit-scrollbar { display: none; }
            `}</style>
        </section>
    );
};

export default Pricing;

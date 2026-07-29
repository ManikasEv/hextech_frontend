import meraki from '../assets/meraki.png';
import labellaelena from '../assets/labellaelena.png';
import steki from '../assets/steki.png';
import meracosmetics from '../assets/meracosmetics.png';
import portfoliomani from '../assets/portfoliomani.png';
import ioinside from '../assets/ioinside.png';
import projecpapa from '../assets/projecpapa.png';

// Local fallback / merge data — used when the API is unreachable,
// and always merged for restaurant sites that live as local assets.
const localPortfolio = [
    {
        id: 'local-meraki',
        title: 'Meraki Restaurant',
        description: 'Griechisches Restaurant in Bassersdorf with a modern online presence and reservation-ready design.',
        type: 'Restaurant',
        image: meraki,
        link: 'https://meraki-restaurant.ch/',
    },
    {
        id: 'local-labellaelena',
        title: 'La Bella Elena',
        description: 'Restaurant website with elegant branding and a clear, welcoming customer journey.',
        type: 'Restaurant',
        image: labellaelena,
        link: 'https://labellaelena.ch/',
    },
    {
        id: 'local-steki',
        title: 'STEKI Foodtruck',
        description: 'Greek streetfood foodtruck website with menu, live location finder, and event booking for Wettingen.',
        type: 'Restaurant',
        image: steki,
        link: 'https://steki.ch/',
    },
    {
        id: 'local-meracosmetics',
        title: 'Mera Cosmetics',
        description: 'Elegant beauty studio website for a Zurich cosmetics and skincare practice, with online appointment booking.',
        type: 'Website',
        image: meracosmetics,
        link: 'https://meracosmetics.ch/',
    },
    {
        id: 'local-portfolio',
        title: 'Portfolio',
        description: 'Personal portfolio website showcasing creative work, projects, and professional achievements with modern design.',
        type: 'Website',
        image: portfoliomani,
        link: 'https://www.manikasevangelos.com/',
    },
    {
        id: 'local-inside',
        title: 'Inside Observation',
        description: 'Professional website dedicated to energy therapies, holistic wellness, and spiritual healing services.',
        type: 'Website',
        image: ioinside,
        link: 'https://insideobservation.com/',
    },
    {
        id: 'local-papa',
        title: 'Papageorgiou Fugen',
        description: 'Professional business website delivering quality services and solutions.',
        type: 'Website',
        image: projecpapa,
        link: 'https://papageorgiou-fugen.ch/',
    },
    {
        id: 'local-musician',
        title: 'Musician Portfolio',
        description: 'Portfolio website for a professional musician — showcasing discography, events, and press kit.',
        type: 'Website',
        image: null,
        link: null,
    },
    {
        id: 'local-ai',
        title: 'AI Software Platform',
        description: 'Advanced AI-powered software solution built with Flowise for intelligent automation and workflows.',
        type: 'Software',
        image: null,
        link: null,
    },
    {
        id: 'local-booking',
        title: 'Booking & Invitation System',
        description: 'Comprehensive software for managing bookings and sending automated invitations to clients.',
        type: 'Software',
        image: null,
        link: null,
    },
    {
        id: 'local-crm',
        title: 'Professional CRM',
        description: 'Custom CRM platform for managing clients, pipelines, and follow-ups in one dashboard.',
        type: 'Software',
        image: null,
        link: null,
    },
    {
        id: 'local-retail-crm',
        title: 'Retail Sales CRM',
        description: 'Custom CRM for a multi-location retail chain, tracking customer profiles, purchase history, and loyalty rewards in one dashboard.',
        type: 'Software',
        image: null,
        link: null,
    },
    {
        id: 'local-realestate-crm',
        title: 'Real Estate CRM',
        description: 'Lead and listing management system for a real estate agency, with automated buyer matching and viewing scheduling.',
        type: 'Software',
        image: null,
        link: null,
    },
    {
        id: 'local-health-crm',
        title: 'Healthcare Patient CRM',
        description: 'Patient relationship platform for a private clinic, handling records, appointment reminders, and automated follow-ups.',
        type: 'Software',
        image: null,
        link: null,
    },
    {
        id: 'local-auto-crm',
        title: 'Automotive Dealership CRM',
        description: 'Inventory-linked CRM for a car dealership, managing test-drive bookings, sales pipelines, and service reminders.',
        type: 'Software',
        image: null,
        link: null,
    },
    {
        id: 'local-fitness-crm',
        title: 'Fitness & Wellness CRM',
        description: 'Membership management system for a fitness studio chain, covering class bookings, check-ins, and renewal automation.',
        type: 'Software',
        image: null,
        link: null,
    },
];

export default localPortfolio;

import portfolioMani from '../assets/portfoliomani.png';
import ioInside from '../assets/ioinside.png';
import projecpapa from '../assets/projecpapa.png';

const projects = [
    {
        id: 1,
        title: 'Portfolio',
        image: portfolioMani,
        description: 'Personal portfolio website showcasing creative work, projects, and professional achievements with modern design',
        type: 'Website',
        link: 'https://www.manikasevangelos.com/'
    },
    {
        id: 2,
        title: 'Musician Portfolio',
        image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800&auto=format&fit=crop',
        description: 'Portfolio website for musician - Coming Soon',
        type: 'Website',
        link: null
    },
    {
        id: 3,
        title: 'Inside Observation',
        image: ioInside,
        description: 'Professional website dedicated to energy therapies, holistic wellness, and spiritual healing services',
        type: 'Website',
        link: 'https://insideobservation.com/'
    },
    {
        id: 4,
        title: 'AI Software Platform',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
        description: 'Advanced AI-powered software solution built with Flowise for intelligent automation and workflows',
        type: 'Software',
        link: null
    },
    {
        id: 5,
        title: 'Booking & Invitation System',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop',
        description: 'Comprehensive software for managing bookings and sending automated invitations to clients',
        type: 'Software',
        link: null
    },
    {
        id: 6,
        title: 'Papage',
        image: projecpapa,
        description: 'Professional business website delivering quality services and solutions',
        type: 'Website',
        link: 'https://papage.ch/'
    }
];

export default projects;


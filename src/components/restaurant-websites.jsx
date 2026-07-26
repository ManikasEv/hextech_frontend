import meraki from '../assets/meraki.png';
import labellaelena from '../assets/labellaelena.png';
import T from './T';

const restaurants = [
    {
        name: 'Meraki Restaurant',
        image: meraki,
        url: 'https://meraki-restaurant.ch/',
        note: 'Griechisches Restaurant in Bassersdorf with modern online presence.',
    },
    {
        name: 'La Bella Elena',
        image: labellaelena,
        url: 'https://labellaelena.ch/',
        note: 'Restaurant website with elegant branding and clear customer journey.',
    },
];

export default function RestaurantWebsites() {
    return (
        <section id="restaurant-websites" className="bg-secondary py-20 border-t border-primary/15">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-bold text-primary mb-4"><T>Restaurant Websites</T></h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        <T>We design restaurant websites and we also build custom reservation software with database support.</T>
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {restaurants.map((restaurant) => (
                        <a
                            key={restaurant.name}
                            href={restaurant.url}
                            target="_blank"
                            rel="noreferrer"
                            className="group rounded-2xl overflow-hidden border border-primary/25 bg-white/5 hover:border-primary transition-all hover:-translate-y-1"
                        >
                            <div className="h-64 overflow-hidden">
                                <img
                                    src={restaurant.image}
                                    alt={restaurant.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-white mb-2">{restaurant.name}</h3>
                                <p className="text-gray-300 mb-3">{restaurant.note}</p>
                                <span className="text-primary font-semibold">Visit Website</span>
                            </div>
                        </a>
                    ))}
                </div>

                <div className="mt-10 rounded-xl border border-primary/20 bg-primary/5 p-6 text-gray-200">
                    <p>
                        <strong className="text-primary">Reservation Software:</strong> Custom reservation systems with database usage have maintenance that scales based on actual traffic and usage needs.
                    </p>
                </div>
            </div>
        </section>
    );
}

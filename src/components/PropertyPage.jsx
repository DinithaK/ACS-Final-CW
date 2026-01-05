import { useParams, Link } from "react-router-dom";
import data from "../data/properties.json";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useFavourites } from "../context/FavouritesContext";

const PropertyPage = () => {
    const { id } = useParams();
    const { addFavourite, removeFavourite, isFavourite } = useFavourites();

    const property = data.properties.find(
        (p) => p.id === id
    );

    if (!property) {
        return (
            <div className="app-container" style={{ textAlign: 'center', marginTop: '50px' }}>
                <h2>Property not found</h2>
                <Link to="/" className="view-btn" style={{ display: 'inline-block', marginTop: '20px' }}>Back to Search</Link>
            </div>
        );
    }

    const isFav = isFavourite(property.id);

    const toggleFavourite = () => {
        if (isFav) {
            removeFavourite(property.id);
        } else {
            addFavourite(property);
        }
    };

    return (
        <div className="app-container">
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '20px', gap: '5px' }}>
                &larr; Back to Results
            </Link>

            <div className="prop-hero-image">
                <img src={`/${property.picture}`} alt={property.type} />
            </div>

            <div className="property-page-container">
                <div className="prop-main-content">
                    <div className="prop-header">
                        <h2>{property.type} in {property.location}</h2>
                        <div className="prop-stats">
                            <span>{property.bedrooms} Bedrooms</span>
                            <span>•</span>
                            <span>{property.tenure}</span>
                            <span>•</span>
                            <span>Added {property.added.month} {property.added.year}</span>
                        </div>
                    </div>

                    <Tabs>
                        <TabList>
                            <Tab>Description</Tab>
                            <Tab>Floor Plan</Tab>
                            <Tab>Map</Tab>
                        </TabList>

                        <TabPanel>
                            <h3>Property Description</h3>
                            <p>{property.description}</p>
                        </TabPanel>
                        <TabPanel>
                            <h3>Floor Plan</h3>
                            <div style={{ background: '#eee', padding: '50px', textAlign: 'center', borderRadius: '8px', border: '2px dashed #ccc' }}>
                                <p>Floor plan image placeholder</p>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <h3>Location Map</h3>
                            <iframe
                                width="100%"
                                height="400"
                                style={{ border: 0, borderRadius: '8px' }}
                                loading="lazy"
                                allowFullScreen
                                src={`https://www.google.com/maps/embed/v1/place?key=TEST_KEY&q=${encodeURIComponent(property.location)}`}>
                            </iframe>
                            <p style={{ fontSize: '0.8em', color: 'var(--text-muted)', marginTop: '10px' }}>* Note: Google Maps API key required for full functionality.</p>
                        </TabPanel>
                    </Tabs>
                </div>

                <div className="prop-sidebar">
                    <div className="prop-sidebar-card">
                        <p className="prop-price">£{property.price.toLocaleString()}</p>
                        <p style={{ marginBottom: '20px' }}>Guide Price</p>

                        <button
                            onClick={toggleFavourite}
                            style={{
                                width: '100%',
                                padding: '12px',
                                fontSize: '1.1em',
                                marginBottom: '15px',
                                background: isFav ? '#d9534f' : 'var(--primary-color)',
                                border: 'none',
                                color: 'white'
                            }}
                        >
                            {isFav ? 'Remove from Favourites' : 'Add to Favourites'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyPage;
import { useParams, Link } from "react-router-dom";
import data from "../data/properties.json";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useFavourites } from "../context/FavouritesContext";
import { useState } from "react";

const PropertyPage = () => {
    const { id } = useParams();
    const { addFavourite, removeFavourite, isFavourite } = useFavourites();

    const property = data.properties.find(
        (p) => p.id === id
    );

    const [mainImage, setMainImage] = useState(property ? `${import.meta.env.BASE_URL}${property.picture}` : '');

    if (!property) {
        return (
            <div className="app-container" style={{ textAlign: 'center', marginTop: '50px' }}>
                <h2>Property not found</h2>
                <Link to="/" className="view-btn" style={{ display: 'inline-block', marginTop: '20px' }}>Back to Search</Link>
            </div>
        );
    }

    const images = property.images && property.images.length > 0
        ? property.images.map(img => `${import.meta.env.BASE_URL}${img}`)
        : [`${import.meta.env.BASE_URL}${property.picture}`];

    if (!mainImage && images.length > 0) {
        setMainImage(images[0]);
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

            <div className="gallery-container">
                <div className="prop-hero-image">
                    <img src={mainImage} alt={property.type} />
                </div>
                <div className="gallery-thumbnails">
                    {images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            className={`thumbnail ${mainImage === img ? 'active' : ''}`}
                            onClick={() => setMainImage(img)}
                        />
                    ))}
                </div>
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
                            {property.floorPlan ? (
                                <div style={{ textAlign: 'center', background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
                                    <img
                                        src={`${import.meta.env.BASE_URL}${property.floorPlan}`}
                                        alt="Floor Plan"
                                        style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }}
                                    />
                                </div>
                            ) : (
                                <div style={{ background: '#eee', padding: '50px', textAlign: 'center', borderRadius: '8px', border: '2px dashed #ccc' }}>
                                    <p>Floor plan not available</p>
                                </div>
                            )}
                        </TabPanel>
                        <TabPanel>
                            <h3>Location Map</h3>
                            <iframe
                                width="100%"
                                height="400"
                                style={{ border: 0, borderRadius: '8px' }}
                                loading="lazy"
                                allowFullScreen
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                            >
                            </iframe>

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
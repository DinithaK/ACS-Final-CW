import { Link } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";


const PropertyCard = ({ property }) => {
    const { addFavourite, removeFavourite, isFavourite } = useFavourites();
    const isFav = isFavourite(property.id);

    const handleDragStart = (e) => {
        e.dataTransfer.setData("application/json", JSON.stringify(property));
        e.dataTransfer.effectAllowed = "copy";
    };

    const toggleFavourite = (e) => {
        e.preventDefault(); // Prevent navigation if clicking the button triggers Link (optional safety)
        if (isFav) {
            removeFavourite(property.id);
        } else {
            addFavourite(property);
        }
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            className="property-card"
            style={{ cursor: 'grab' }}
        >
            <img src={property.picture} alt={property.id} />

            <div className="card-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                        <h3 className="card-title">{property.type}</h3>
                        <p style={{ fontSize: '0.9em', color: 'var(--text-muted)', margin: '5px 0 0 0' }}>
                            {property.location}
                        </p>
                        <p style={{ fontSize: '0.9em', color: 'var(--text-muted)', marginTop: '8px', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {property.description}
                        </p>
                    </div>
                </div>

                <p className="card-price">£{property.price.toLocaleString()}</p>

                <div className="card-details">
                    <span>{property.bedrooms} Beds</span>
                    <span>•</span>
                    <span>{property.tenure}</span>
                </div>

                <div className="card-actions" style={{ display: 'flex', gap: '10px' }}>
                    <Link to={`/property/${property.id}`} className="view-btn" style={{ flex: 1 }}>
                        View Details
                    </Link>
                    <button
                        onClick={toggleFavourite}
                        style={{
                            background: isFav ? '#d9534f' : 'transparent',
                            border: '1px solid ' + (isFav ? '#d9534f' : 'var(--primary-color)'),
                            color: isFav ? 'white' : 'var(--primary-color)',
                            padding: '8px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            flex: 1,
                            fontWeight: 600
                        }}
                    >
                        {isFav ? 'Remove' : 'Favourite'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
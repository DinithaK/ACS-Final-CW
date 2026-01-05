import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
    const handleDragStart = (e) => {
        e.dataTransfer.setData("application/json", JSON.stringify(property));
        e.dataTransfer.effectAllowed = "copy";
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
                    </div>
                </div>

                <p className="card-price">£{property.price.toLocaleString()}</p>

                <div className="card-details">
                    <span>{property.bedrooms} Beds</span>
                    <span>•</span>
                    <span>{property.tenure}</span>
                </div>

                <div className="card-actions">
                    <Link to={`/property/${property.id}`} className="view-btn">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
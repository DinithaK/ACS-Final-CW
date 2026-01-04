import { Link } from "react-router-dom";
const PropertyCard = ({ property }) => {
    const handleDragStart = (e) => {
        e.dataTransfer.setData("application/json", JSON.stringify(property));
        e.dataTransfer.effectAllowed = "copy";
    };

    return (
        <div draggable onDragStart={handleDragStart} style={{ cursor: 'grab' }}>
            <img src={property.picture} alt={property.id} />
            <h3>{property.type}</h3>
            <p>£{property.price.toLocaleString()}</p>
            <p>{property.bedrooms} bedrooms</p>
            <p>{property.postcode}</p>

            <Link to={`/property/${property.id}`}>
                View details
            </Link>
        </div>
    );
};

export default PropertyCard;
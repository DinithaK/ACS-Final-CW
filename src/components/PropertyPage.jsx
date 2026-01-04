import { useParams, Link } from "react-router-dom";
import data from "../data/properties.json";

const PropertyPage = () => {
    const { id } = useParams();

    const property = data.properties.find(
        (p) => p.id === id
    );

    if (!property) {
        return <p>Property not found</p>;
    }

    return (
        <div>
            <h2>{property.type}</h2>
            <img src={property.picture} alt={property.id} />

            <p><strong>Price:</strong> £{property.price}</p>
            <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
            <p><strong>Tenure:</strong> {property.tenure}</p>
            <p><strong>Location:</strong> {property.location}</p>

            <p>{property.description}</p>

            <p>
                Added: {property.added.month}{" "}
                {property.added.day}, {property.added.year}
            </p>

            <Link to="/">Back to results</Link>
        </div>
    );
};

export default PropertyPage;
import properties from "../data/properties.json";
import PropertyCard from "./PropertyCard";

const ResultsList = () => {
    return (
        <div>
            {properties.map((property) => (
                <PropertyCard key={property.id} property={property}/>
            ))}
        </div>
    );
};

export default ResultsList;
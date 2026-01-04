import data from "../data/properties.json";
import PropertyCard from "./PropertyCard";
import { useState } from "react";
import filterProperties from "../utils/filterProperties";
import SearchBar from "./SearchBar";
import FavouritesPanel from "./FavouritesPanel";

const ResultsList = () => {

    const [filteredProperties, setFilteredProperties] = useState(
        data.properties
    );

    const handleSearch = (criteria) => {
        const results = filterProperties(data.properties, criteria);
        setFilteredProperties(results);
    }

    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 3 }}>
                <SearchBar onSearch={handleSearch} />
                <div className="results-container">
                    {filteredProperties.map((property) => (
                        <div key={property.id} className="property-card">
                            <PropertyCard property={property} />
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ flex: 1 }}>
                <FavouritesPanel />
            </div>
        </div>
    );
};

export default ResultsList;
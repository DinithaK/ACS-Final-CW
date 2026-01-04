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
    const [searchKey, setSearchKey] = useState(0);

    const handleSearch = (criteria) => {
        const results = filterProperties(data.properties, criteria);
        setFilteredProperties(results);
    }

    const handleClearFilters = () => {
        setFilteredProperties(data.properties);
        setSearchKey(prev => prev + 1);
    }

    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 3 }}>
                <SearchBar key={searchKey} onSearch={handleSearch} />
                {filteredProperties.length === 0 ? (
                    <div style={{ textAlign: 'center', marginTop: '40px', padding: '20px', background: '#333', borderRadius: '8px' }}>
                        <h3>No properties found</h3>
                        <p>Try adjusting your search criteria or clear filters.</p>
                        <button
                            onClick={handleClearFilters}
                            style={{ marginTop: '10px', backgroundColor: '#646cff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className="results-container">
                        {filteredProperties.map((property) => (
                            <div key={property.id} className="property-card">
                                <PropertyCard property={property} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div style={{ flex: 1 }}>
                <FavouritesPanel />
            </div>
        </div>
    );
};

export default ResultsList;
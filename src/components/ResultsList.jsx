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
        <div className="app-container">
            <SearchBar key={searchKey} onSearch={handleSearch} />

            <div className="results-wrapper">
                <div className="results-column">
                    {filteredProperties.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            marginTop: '40px',
                            padding: '40px',
                            background: 'var(--card-bg)',
                            borderRadius: '12px',
                            border: '1px solid var(--border-color)'
                        }}>
                            <h3>No properties found</h3>
                            <p style={{ color: 'var(--text-muted)' }}>Try adjusting your search criteria or clear filters.</p>
                            <button
                                onClick={handleClearFilters}
                                style={{ marginTop: '20px' }}
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div className="results-grid">
                            {filteredProperties.map((property) => (
                                <div key={property.id} className="property-card-wrapper">
                                    <PropertyCard property={property} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div style={{ flex: 1, minWidth: '300px' }}>
                    <FavouritesPanel />
                </div>
            </div>
        </div>
    );
};

export default ResultsList;
import data from "../data/properties.json";
import PropertyCard from "./PropertyCard";
import {useState} from "react";
import filterProperties from "../utils/filterProperties";
import SearchBar from "./SearchBar";

const ResultsList = () => {

    const [filteredProperties, setFilteredProperties] = useState(
        data.properties
    );

    const handleSearch = (criteria) => {
        const results = filterProperties(data.properties, criteria);
        setFilteredProperties(results);
    }

    return (
        <div>
            <SearchBar onSearch={handleSearch}/>
            {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property}/>
            ))}
        </div>
    );
};

export default ResultsList;
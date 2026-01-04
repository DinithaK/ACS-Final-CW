const filterProperties = (properties, criteria) => {
    return properties.filter((property) => {
        if (criteria.type && property.type !== criteria.type){
            return false;
        }

        if (criteria.minPrice && property.price < criteria.minPrice) {
            return false;
        }

        if (criteria.maxPrice && property.price > criteria.maxPrice){
            return false;
        }
        
        if (criteria.bedrooms && property.bedrooms !== criteria.bedrooms){
            return false;
        }

        if (
            criteria.location &&
            !property.location.toLowerCase().includes(criteria.location.toLowerCase())
        ){
            return false;
        }
        return true;
    });
};

export default filterProperties;
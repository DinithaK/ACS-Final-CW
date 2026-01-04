const filterProperties = (properties, criteria) => {
    return properties.filter((property) => {
        // Type
        if (criteria.type && property.type !== criteria.type) {
            return false;
        }

        // Price
        if (criteria.minPrice && property.price < criteria.minPrice) {
            return false;
        }
        if (criteria.maxPrice && property.price > criteria.maxPrice) {
            return false;
        }

        // Bedrooms
        if (criteria.minBedrooms && property.bedrooms < criteria.minBedrooms) {
            return false;
        }
        if (criteria.maxBedrooms && property.bedrooms > criteria.maxBedrooms) {
            return false;
        }

        // Postcode Area (e.g. "BR1" matches "BR1 2AB")
        if (criteria.postcodeArea) {
            // Safe check if property has postcode
            const propPostcode = property.postcode || "";
            if (!propPostcode.toLowerCase().startsWith(criteria.postcodeArea.toLowerCase())) {
                // Fallback: Check location string if postcode field is missing
                if (!property.location.toLowerCase().includes(criteria.postcodeArea.toLowerCase())) {
                    return false;
                }
            }
        }

        // Date Added
        if (criteria.addedAfter) {
            const propDate = new Date(property.addedDate);
            const afterDate = new Date(criteria.addedAfter);
            if (propDate < afterDate) {
                return false;
            }
        }

        if (criteria.addedBetweenStart && criteria.addedBetweenEnd) {
            const propDate = new Date(property.addedDate);
            const startDate = new Date(criteria.addedBetweenStart);
            const endDate = new Date(criteria.addedBetweenEnd);

            if (propDate < startDate || propDate > endDate) {
                return false;
            }
        }

        return true;
    });
};

export default filterProperties;
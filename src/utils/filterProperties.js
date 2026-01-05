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
        if (criteria.bedrooms && property.bedrooms < criteria.bedrooms) {
            return false;
        }
        if (criteria.maxBedrooms && property.bedrooms > criteria.maxBedrooms) {
            return false;
        }

        // Postcode Area (User provided logic: check last part of location string)
        if (criteria.postcodeArea) {
            const lastPart = property.location.split(' ').pop().toLowerCase();
            const searchPostcode = criteria.postcodeArea.toLowerCase();

            // Check if dedicated postcode matches OR if the last part of location matches
            const matchesPostcodeField = property.postcode && property.postcode.toLowerCase().startsWith(searchPostcode);
            const matchesLocationSuffix = lastPart.startsWith(searchPostcode);

            if (!matchesPostcodeField && !matchesLocationSuffix) {
                return false;
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
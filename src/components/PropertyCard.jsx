const PropertyCard = ({property}) => {
    return (
        <div>
            <h3>{property.type}</h3>
            <p>&euro{property.price}</p>
            <p>{property.bedrooms} bedrooms</p>
            <p>{property.postcode}</p>
        </div>
    );
};

export default PropertyCard;
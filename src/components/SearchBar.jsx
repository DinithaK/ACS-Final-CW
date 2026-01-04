const SearchBar = ({ onSearch }) => {
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const criteria = {
            type: formData.get("type"),
            minPrice: Number(formData.get("minPrice")) || null,
            maxPrice: Number(formData.get("maxPrice")) || null,
            bedrooms: Number(formData.get("bedrooms")) || null,
            location: formData.get("location")
        };
        onSearch(criteria);
    };

    return (
        <form onSubmit={handleSubmit}>
            <select name="type">
                <option value="">Any Type</option>
                <option value="House">House</option>
                <option value="Flat">Flat</option>
            </select>

            <input type="number" name="minPrice" placeholder="Min price"/>
            <input type="number" name="maxPrice" placeholder="Max price"/>
            <input type="number" name="bedrooms" placeholder="Bedrooms"/>
            <input type="text" name="location" placeholder="Postcode / area"/>

            <button type="submit">Search</button>
        </form>
    );
};
export default SearchBar;
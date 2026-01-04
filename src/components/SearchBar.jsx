const SearchBar = ({ onSearch }) => {
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const criteria = {
            type: formData.get("type"),
            minPrice: Number(formData.get("minPrice")) || null,
            maxPrice: Number(formData.get("maxPrice")) || null,
            minBedrooms: Number(formData.get("minBedrooms")) || null,
            maxBedrooms: Number(formData.get("maxBedrooms")) || null,
            postcodeArea: formData.get("postcodeArea"),
            addedAfter: formData.get("addedAfter") || null,
            addedBetweenStart: formData.get("addedBetweenStart") || null,
            addedBetweenEnd: formData.get("addedBetweenEnd") || null,
        };
        onSearch(criteria);
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <div className="search-group">
                <select name="type">
                    <option value="">Any Type</option>
                    <option value="House">House</option>
                    <option value="Flat">Flat</option>
                </select>
                <input type="text" name="postcodeArea" placeholder="Postcode Area (e.g. BR1)" />
            </div>

            <div className="search-group">
                <input type="number" name="minPrice" placeholder="Min Price" />
                <input type="number" name="maxPrice" placeholder="Max Price" />
            </div>

            <div className="search-group">
                <input type="number" name="minBedrooms" placeholder="Min Bed" />
                <input type="number" name="maxBedrooms" placeholder="Max Bed" />
            </div>

            <div className="search-group">
                <label>Added After:</label>
                <input type="date" name="addedAfter" />
            </div>

            <div className="search-group">
                <label>Between:</label>
                <input type="date" name="addedBetweenStart" />
                <label>and</label>
                <input type="date" name="addedBetweenEnd" />
            </div>

            <button type="submit">Search</button>
        </form>
    );
};
export default SearchBar;
const SearchBar = ({ onSearch, onClear }) => {
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const criteria = {
            type: formData.get("type"),
            minPrice: Number(formData.get("minPrice")) || null,
            maxPrice: Number(formData.get("maxPrice")) || null,
            minBedrooms: Number(formData.get("minBedrooms")) || null,
            maxBedrooms: Number(formData.get("maxBedrooms")) || null,
            postcodeArea: formData.get("postcodeArea").trim(),
            addedAfter: formData.get("addedAfter") || null,
        };
        onSearch(criteria);
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            {/* Type & Postcode */}
            <div className="search-group">
                <label>Property Type</label>
                <select name="type">
                    <option value="">Any Type</option>
                    <option value="House">House</option>
                    <option value="Flat">Flat</option>
                </select>
            </div>

            <div className="search-group">
                <label>Location</label>
                <input type="text" name="postcodeArea" placeholder="Postcode (e.g. BR1)" />
            </div>

            {/* Price Range */}
            <div className="search-group">
                <label>Min Price</label>
                <input type="number" name="minPrice" placeholder="Min £" />
            </div>

            <div className="search-group">
                <label>Max Price</label>
                <input type="number" name="maxPrice" placeholder="Max £" />
            </div>

            {/* Bedrooms */}
            <div className="search-group">
                <label>Bedrooms</label>
                <div style={{ display: 'flex', gap: '5px' }}>
                    <input type="number" name="minBedrooms" placeholder="Min" style={{ width: '50%' }} />
                    <input type="number" name="maxBedrooms" placeholder="Max" style={{ width: '50%' }} />
                </div>
            </div>

            {/* Date Added */}
            <div className="search-group">
                <label>Added After</label>
                <input type="date" name="addedAfter" placeholder="Added After" />
            </div>

            <div className="search-actions" style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                <button type="submit" style={{ flex: 2, height: '42px' }}>Search</button>
                <button
                    type="button"
                    onClick={onClear}
                    style={{
                        flex: 1,
                        height: '42px',
                        backgroundColor: 'transparent',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-color)'
                    }}
                >
                    Clear Filters
                </button>
            </div>
        </form>
    );
};
export default SearchBar;
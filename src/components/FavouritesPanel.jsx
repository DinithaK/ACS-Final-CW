import { useFavourites } from '../context/FavouritesContext';
import { Link } from 'react-router-dom';

const FavouritesPanel = () => {
    const { favourites, removeFavourite, clearFavourites, addFavourite } = useFavourites();

    const handleDrop = (e) => {
        e.preventDefault();
        const propertyData = e.dataTransfer.getData("application/json");
        if (propertyData) {
            const property = JSON.parse(propertyData);
            addFavourite(property);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div
            className="favourites-panel"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{
                border: '2px dashed #666',
                padding: '10px',
                backgroundColor: '#2a2a2a',
                minHeight: '200px',
                marginTop: '20px'
            }}
        >
            <h3>Favourites</h3>
            <p style={{ fontSize: '0.8em', color: '#aaa' }}>Drag properties here</p>

            {favourites.length === 0 ? (
                <p>No favourites yet.</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {favourites.map(fav => (
                        <li key={fav.id} style={{ marginBottom: '10px', padding: '5px', background: '#333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div draggable onDragStart={(e) => {
                                // Allow dragging OUT of favourites (optional requirement implementation)
                                e.dataTransfer.setData("propertyId", fav.id);
                            }}>
                                <Link to={`/property/${fav.id}`} style={{ fontSize: '0.9em', display: 'block' }}>{fav.type} - {fav.postcode}</Link>
                                <span style={{ fontSize: '0.8em' }}>£{fav.price.toLocaleString()}</span>
                            </div>
                            <button onClick={() => removeFavourite(fav.id)} style={{ fontSize: '0.8em', padding: '2px 5px', marginLeft: '5px' }}>X</button>
                        </li>
                    ))}
                </ul>
            )}

            {favourites.length > 0 && (
                <button onClick={clearFavourites} style={{ width: '100%', marginTop: '10px', backgroundColor: '#800' }}>Clear All</button>
            )}
        </div>
    );
};

export default FavouritesPanel;

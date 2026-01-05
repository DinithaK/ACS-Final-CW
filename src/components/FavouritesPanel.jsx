import { useFavourites } from '../context/FavouritesContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const FavouritesPanel = () => {
    const { favourites, removeFavourite, clearFavourites, addFavourite } = useFavourites();

    const [isDragOver, setIsDragOver] = useState(false);

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const propertyData = e.dataTransfer.getData("application/json");
        if (propertyData) {
            const property = JSON.parse(propertyData);
            addFavourite(property);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    return (
        <div
            className={`favourites-panel ${isDragOver ? 'drag-over' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            <h3>Favourites</h3>
            <p style={{ fontSize: '0.8em', color: 'var(--text-muted)' }}>Drag properties here</p>

            {favourites.length === 0 ? (
                <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>No favourites yet.</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {favourites.map(fav => (
                        <li key={fav.id} className="fav-item">
                            <div draggable onDragStart={(e) => {
                                // Allow dragging OUT of favourites (optional requirement implementation)
                                e.dataTransfer.setData("propertyId", fav.id);
                            }} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <img src={`/${fav.picture}`} alt={fav.type} className="fav-thumbnail" />
                                <div>
                                    <Link to={`/property/${fav.id}`} style={{ fontSize: '0.9em', display: 'block', fontWeight: 'bold' }}>{fav.type}</Link>
                                    <span style={{ fontSize: '0.8em', color: 'var(--text-muted)' }}>£{fav.price.toLocaleString()}</span>
                                </div>
                            </div>
                            <button onClick={() => removeFavourite(fav.id)} style={{ fontSize: '0.8em', padding: '2px 5px', marginLeft: '5px', background: 'transparent', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer' }}>X</button>
                        </li>
                    ))}
                </ul>
            )}

            {favourites.length > 0 && (
                <button onClick={clearFavourites} style={{ width: '100%', marginTop: '10px', backgroundColor: '#d9534f' }}>Clear All</button>
            )}
        </div>
    );
};

export default FavouritesPanel;

import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { FavouritesProvider, useFavourites } from '../src/context/FavouritesContext';

// Helper component to test hook
const TestComponent = () => {
    const { favourites, addFavourite, removeFavourite } = useFavourites();
    return (
        <div>
            <span data-testid="count">{favourites.length}</span>
            <button onClick={() => addFavourite({ id: '1', type: 'House' })}>Add</button>
            <button onClick={() => removeFavourite('1')}>Remove</button>
        </div>
    );
};

describe('Favourites Context', () => {
    test('can add and remove favourites', () => {
        render(
            <FavouritesProvider>
                <TestComponent />
            </FavouritesProvider>
        );

        const count = screen.getByTestId('count');
        const addButton = screen.getByText('Add');
        const removeButton = screen.getByText('Remove');

        expect(count.textContent).toBe('0');

        act(() => {
            fireEvent.click(addButton);
        });
        expect(count.textContent).toBe('1');

        // Test duplicate add prevention
        act(() => {
            fireEvent.click(addButton);
        });
        expect(count.textContent).toBe('1'); // Should still be 1

        act(() => {
            fireEvent.click(removeButton);
        });
        expect(count.textContent).toBe('0');
    });
});

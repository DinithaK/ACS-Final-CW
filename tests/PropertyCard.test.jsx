import React from 'react';
import { render, screen } from '@testing-library/react';
import PropertyCard from '../src/components/PropertyCard';
import { BrowserRouter } from 'react-router-dom';
import { FavouritesProvider } from '../src/context/FavouritesContext';

const mockProperty = {
    id: 'prop1',
    type: 'House',
    bedrooms: 3,
    price: 750000,
    tenure: 'Freehold',
    location: 'London',
    postcode: 'SW1',
    picture: 'images/p1.jpeg',
    description: 'A lovely house.'
};

describe('PropertyCard Component', () => {
    test('renders property details correctly', () => {
        render(
            <BrowserRouter>
                <FavouritesProvider>
                    <PropertyCard property={mockProperty} />
                </FavouritesProvider>
            </BrowserRouter>
        );

        expect(screen.getByText('House')).toBeInTheDocument();
        expect(screen.getByText('£750,000')).toBeInTheDocument();
        expect(screen.getByText(/London/)).toBeInTheDocument();
        expect(screen.getByText(/3 Beds/)).toBeInTheDocument();
        expect(screen.getByText(/Freehold/)).toBeInTheDocument();
    });


});

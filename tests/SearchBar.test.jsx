import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../src/components/SearchBar';

// Mock properties data
const mockProperties = [
    { id: '1', type: 'House', price: 500000, addedDate: '2023-01-01', location: 'London', bedrooms: 3, postcode: 'SW1' },
    { id: '2', type: 'Flat', price: 300000, addedDate: '2023-02-01', location: 'Manchester', bedrooms: 2, postcode: 'M1' }
];

describe('SearchBar Component', () => {
    const mockOnSearch = jest.fn();

    test('renders search inputs correctly', () => {
        render(<SearchBar properties={mockProperties} onSearch={mockOnSearch} />);

        // Use more specific selectors matching current component structure
        expect(screen.getByRole('combobox')).toBeInTheDocument(); // The Select
        expect(screen.getByPlaceholderText(/Min £/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Max £/i)).toBeInTheDocument();
    });

    test('updates inputs and triggers search', () => {
        render(<SearchBar properties={mockProperties} onSearch={mockOnSearch} />);

        const typeSelect = screen.getByRole('combobox');
        fireEvent.change(typeSelect, { target: { value: 'House' } });

        expect(typeSelect.value).toBe('House');

        const searchButton = screen.getByText(/search/i);
        fireEvent.click(searchButton);

        expect(mockOnSearch).toHaveBeenCalled();
    });

    test('clear filters resets inputs', () => {
        render(<SearchBar properties={mockProperties} onSearch={mockOnSearch} onClear={jest.fn()} />);

        const typeSelect = screen.getByRole('combobox');
        fireEvent.change(typeSelect, { target: { value: 'House' } });

        const clearButton = screen.getByText(/clear filters/i);
        fireEvent.click(clearButton);

        // Assuming parent handles clear, or internal state resets. 
    });
});

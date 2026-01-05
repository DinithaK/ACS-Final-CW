import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';
import { BrowserRouter } from 'react-router-dom';

describe('App Component', () => {
    test('renders without crashing', () => {
        // We wrap in BrowserRouter since App likely uses Router features but might declare its own Router or rely on index.js
        // Based on main.jsx seen earlier, App is wrapped in BrowserRouter in main.jsx.
        // So here we need to wrap it too.

        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );

        // Check for header
        expect(screen.getByText(/Estate Agent/i)).toBeInTheDocument();
    });
});

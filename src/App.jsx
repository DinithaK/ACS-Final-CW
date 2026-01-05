import ResultsList from './components/ResultsList'
import { Routes, Route } from "react-router-dom";
import PropertyPage from "./components/PropertyPage";
import { FavouritesProvider } from './context/FavouritesContext';

function App() {
  return (
    <FavouritesProvider>
      <header className="main-header">
        <div className="app-container">
          <h1>Estate Agent</h1>
          <p style={{ color: 'var(--text-muted)' }}>Find your dream home with ease</p>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<ResultsList />} />
        <Route path="/property/:id" element={<PropertyPage />} />
      </Routes>
    </FavouritesProvider>
  );
}
export default App;

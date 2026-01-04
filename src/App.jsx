import ResultsList from './components/ResultsList'
import { Routes, Route } from "react-router-dom";
import PropertyPage from "./components/PropertyPage";
import { FavouritesProvider } from './context/FavouritesContext';

function App() {
  return (
    <FavouritesProvider>
      <Routes>
        <Route path="/" element={<ResultsList />} />
        <Route path="/property/:id" element={<PropertyPage />} />
      </Routes>
    </FavouritesProvider>
  );
}
export default App;

import ResultsList from './components/ResultsList'
import { Routes, Route } from "react-router-dom";
import PropertyPage from "./components/PropertyPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ResultsList />} />
      <Route path="/property/:id" element={<PropertyPage />} />
    </Routes>
  );
}
export default App;

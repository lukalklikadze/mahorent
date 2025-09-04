import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import HomePage from "./pages/homepage";
import CarsPage from "./pages/carsPage";
import FloatingWhatsApp from "./components/floatingWhatsapp";
import CarDetailsPage from "./components/carDetails";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main className="pt-18">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/cars/:id" element={<CarDetailsPage />} />
        </Routes>
      </main>

      <FloatingWhatsApp />
    </BrowserRouter>
  );
}

export default App;

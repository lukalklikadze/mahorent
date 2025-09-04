import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import HomePage from "./pages/homepage";
import CarsPage from "./pages/carsPage";
import HotelsPage from "./pages/hotelsPage";
import FloatingWhatsApp from "./components/floatingWhatsapp";
import CarDetailsPage from "./components/carDetails";
import HotelDetailsPage from "./components/hotelDetails";
import ToursPage from "./pages/toursPage";
import TourDetailsPage from "./components/tourDetails";
import Footer from "./components/footer";
import TranslationWidget from "./components/translationWidget";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40">
        <TranslationWidget />
      </div>
      <main className="pt-18 pb-80">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/cars/:id" element={<CarDetailsPage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/hotels/:id" element={<HotelDetailsPage />} />
          <Route path="/tours" element={<ToursPage />} />
          <Route path="/tours/:id" element={<TourDetailsPage />} />
        </Routes>
      </main>
      <FloatingWhatsApp />
      <Footer />
    </BrowserRouter>
  );
}

export default App;

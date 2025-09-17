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
import AdminPanel from "./pages/adminPanel";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="pt-18 pb-80">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/cars/:id" element={<CarDetailsPage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/hotels/:id" element={<HotelDetailsPage />} />
          <Route path="/tours" element={<ToursPage />} />
          <Route path="/tours/:id" element={<TourDetailsPage />} />
          <Route path="/secret-admin-panel-andria22" element={<AdminPanel />} />
        </Routes>
      </main>
      <FloatingWhatsApp />
      <Footer />
    </BrowserRouter>
  );
}

export default App;

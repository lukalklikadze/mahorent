import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/header";
import FloatingWhatsApp from "./components/floatingWhatsapp";
import Footer from "./components/footer";

const HomePage = lazy(() => import("./pages/homepage"));
const CarsPage = lazy(() => import("./pages/carsPage"));
const HotelsPage = lazy(() => import("./pages/hotelsPage"));
const ToursPage = lazy(() => import("./pages/toursPage"));
const CarDetailsPage = lazy(() => import("./components/carDetails"));
const HotelDetailsPage = lazy(() => import("./components/hotelDetails"));
const TourDetailsPage = lazy(() => import("./components/tourDetails"));
const AdminWrapper = lazy(() => import("./components/adminWrapper"));
const FAQPage = lazy(() => import("./pages/faqPage"));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
    <div className="text-xl text-blue-800">Loading...</div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="pt-18 pb-80 -mt-2">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cars" element={<CarsPage />} />
            <Route path="/cars/:id" element={<CarDetailsPage />} />
            <Route path="/hotels" element={<HotelsPage />} />
            <Route path="/hotels/:id" element={<HotelDetailsPage />} />
            <Route path="/tours" element={<ToursPage />} />
            <Route path="/tours/:id" element={<TourDetailsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/admin_panel" element={<AdminWrapper />} />
          </Routes>
        </Suspense>
      </main>
      <FloatingWhatsApp />
      <Footer />
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import HomePage from "./pages/homepage";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <div className="min-h-screen bg-blue-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

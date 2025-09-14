import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

const carSchema = new mongoose.Schema({
  name: String,
  location: String,
  gearsType: String,
  steeringWheelSide: String,
  fuel: String,
  prevPrice: String,
  newPrice: String,
  photos: { type: [String], default: [] },
  bookedDates: { type: [String], default: [] },
});

const hotelSchema = new mongoose.Schema({
  name: String,
  location: String,
  bedrooms: String,
  beds: String,
  bathrooms: String,
  prevPrice: String,
  newPrice: String,
  photos: { type: [String], default: [] },
  tagline: String,
  bookedDates: { type: [String], default: [] },
});

const tourSchema = new mongoose.Schema({
  name: String,
  prevPrice: String,
  newPrice: String,
  photos: { type: [String], default: [] },
  destinations: { type: [String], default: [] },
  bookedDates: { type: [String], default: [] },
});

const Car = mongoose.model("Car", carSchema);
const Hotel = mongoose.model("Hotel", hotelSchema);
const Tour = mongoose.model("Tour", tourSchema);

// Car endpoints
app.get("/api/cars", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/cars/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/cars", async (req, res) => {
  try {
    const newCar = new Car(req.body);
    await newCar.save();
    res.json(newCar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/cars/:id/book", async (req, res) => {
  try {
    const { dates } = req.body;
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ error: "Car not found" });

    car.bookedDates.push(...dates);
    car.bookedDates = [...new Set(car.bookedDates)];
    await car.save();

    res.json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/hotels", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/hotels/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/hotels", async (req, res) => {
  try {
    const newHotel = new Hotel(req.body);
    await newHotel.save();
    res.json(newHotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/hotels/:id/book", async (req, res) => {
  try {
    const { dates } = req.body;
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ error: "Hotel not found" });

    hotel.bookedDates.push(...dates);
    hotel.bookedDates = [...new Set(hotel.bookedDates)];
    await hotel.save();

    res.json(hotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/tours", async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/tours/:id", async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ error: "Tour not found" });
    }
    res.json(tour);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/tours", async (req, res) => {
  try {
    const newTour = new Tour(req.body);
    await newTour.save();
    res.json(newTour);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/tours/:id/book", async (req, res) => {
  try {
    const { dates } = req.body;
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ error: "Tour not found" });

    tour.bookedDates.push(...dates);
    tour.bookedDates = [...new Set(tour.bookedDates)];
    await tour.save();

    res.json(tour);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

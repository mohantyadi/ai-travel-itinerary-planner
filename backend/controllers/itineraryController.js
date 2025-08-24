import Trip from '../models/Trip.js';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Create Trip with AI-generated itinerary
export const createTrip = async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: "Gemini API key is missing" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const { destination, startDate, endDate, preference } = req.body;

    // Validate required fields
    if (!destination || !startDate || !endDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Prompt for Gemini
    const prompt = `
    Create a detailed travel itinerary for a trip to ${destination} 
    from ${startDate} to ${endDate}. 
    Preferences: ${preference}.
    Include day-by-day plans.
    `;

    // Call Gemini API
    const result = await model.generateContent(prompt);
    const itineraryText = result.response.text();

    // Save to DB
    const newTrip = new Trip({
      destination,
      startDate,
      endDate,
      preference,
      itinerary: itineraryText
    });

    await newTrip.save();
    res.status(201).json(newTrip);

  } catch (error) {
    console.error("❌ Error creating trip:", error);
    res.status(500).json({ message: "Error creating trip", error: error.message });
  }
};

// Get all trips
export const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trips" });
  }
};

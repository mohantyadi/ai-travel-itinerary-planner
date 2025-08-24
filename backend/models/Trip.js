import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  destination: String,
  startDate: String,
  endDate: String,
  preference: String,
  itinerary: String
});

export default mongoose.model('Trip', tripSchema);

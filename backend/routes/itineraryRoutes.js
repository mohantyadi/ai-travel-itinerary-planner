import express from 'express';
import { createTrip, getTrips } from '../controllers/itineraryController.js';

const router = express.Router();

// Final routes will be /api/trips
router.post('/', createTrip);
router.get('/', getTrips);

export default router;

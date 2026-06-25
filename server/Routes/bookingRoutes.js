import express from "express";
import { createBooking, getAvailableSeats, getOccupiedSeats } from "../controller/bookingController.js";

const BoookingRouter = express.Router();


BoookingRouter.post('/create',createBooking);
BoookingRouter.post('/getSeats/:movieId',getAvailableSeats);
BoookingRouter.get('/seats/:showId',getOccupiedSeats);

export default BoookingRouter;


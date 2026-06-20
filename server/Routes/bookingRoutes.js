import express from "express";
import { createBooking, getAvailableSeats } from "../controller/bookingController.js";

const BoookingRouter = express.Router();


BoookingRouter.post('/create',createBooking);
BoookingRouter.post('/getSeats/:movieId',getAvailableSeats);

export default BoookingRouter;


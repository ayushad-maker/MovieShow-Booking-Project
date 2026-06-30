import express from "express";
import {
  createBooking,
  getOccupiedSeats,
  verifyPayment,
} from "../controller/bookingController.js";

const BookingRouter = express.Router();

BookingRouter.post("/create", createBooking);
BookingRouter.post("/verify-payment", verifyPayment);
BookingRouter.get("/seats/:showId", getOccupiedSeats);

export default BookingRouter;

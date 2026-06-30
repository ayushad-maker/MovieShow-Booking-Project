import mongoose from "mongoose";

const BookingShows = new mongoose.Schema(
  {
    user: { type: String, required: true, ref: "User" },
    show: { type: String, required: true, ref: "Show" },
    amount: { type: Number, required: true },
    bookedSeats: { type: Array, required: true },
    isPaid: { type: Boolean, default: false },
    qrCode: {
      type: String,
      default: "",
    },
    paymentLink: { type: String },
  },
  { timestamps: true },
);

const Booking = mongoose.model("Booking", BookingShows);

export default Booking;

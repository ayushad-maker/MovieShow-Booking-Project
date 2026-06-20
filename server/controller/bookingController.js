import { err } from "inngest/types";
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";

export const getAvailableSeats = async (showId, selectedSeats) => {
  try {
    const showData = await Show.findById(showId);

    if (!showData) {
      return res.json({ message: "showData is not found." });
    }

    const occupiedSeats = showData.occupiedSeats;

    const isAnySeatTaken = selectedSeats.some((seat) => occupiedSeats[seat]);

    return !isAnySeatTaken;
  } catch (error) {
    return res.json({
      sucess: "false",
      message: error.message,
    });
  }
};

export const createBooking = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { showId, selectedSeats } = req.body;
    const { origin } = req.headers;

    const isAvailable = await getAvailableSeats(showId, selectedSeats);

    if (!isAvailable) {
      return res.json({
        success: "false",
        message: "selected Seats are not available.",
      });
    }

    const showData = await Show.findById(showId).populate("movie");

    const booking = await Booking.create({
      user: userId,
      show: showId,
      amount: showData.showPrice * selectedSeats.length,
      bookedSeats: selectedSeats,
    });

    selectedSeats.map((seat) => {
      showData.occupiedSeats[seat] = userId;
    });

    showData.markModified("occupiedSeats");

    await showData.save();

    // payment gateway

    res.json({
      success: true,
      message: "Booked Successfully.",
    });
  } catch (error) {
    console.log("error");
    return res.json({
      sucess: "false",
      message: error.message,
    });
  }
};

export const getOccupiedSeats = async (req, res) => {
  try {
    const { showId } = req.params;

    const showData = await Show.findById(showId);

    const occupiedSeats = Object.keys(showData.occupiedSeats);

    return res.json({
      success: true,
      message: "successfully fetched occupied seats",
      occupiedSeats,
    });
  } catch (error) {
    console.log(err);
    return res.json({
      success: false,
      message: err.message,
    });
  }
};

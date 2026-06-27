import { err } from "inngest/types";
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import stripe, { Stripe } from "stripe";

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

    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

    const line_items = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: showData.movie.title,
          },
          unit_amount: Math.floor(booking.amount) * 100,
        },
        quantity: 1,
      },
    ];

    const session = await stripeInstance.checkout.sessions.create({
      success_url: `${origin}/loading/myBookings`,
      cancel_url: `${origin}/myBookings`,
      line_items: line_items,
      mode: "payment",
      metadata: {
        bookingId: booking._id.toString(),
      },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
    });

    booking.paymentLink = session.url;
    await booking.save();

    res.json({
      success: true,
      url:session.url,
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

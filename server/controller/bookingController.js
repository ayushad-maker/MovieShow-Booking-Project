import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import QRCode from "qrcode";
import { clerkClient } from "@clerk/express";
import sendBookingEmail from "../utils/sendBookingEmail.js";

export const getAvailableSeats = async (showId, selectedSeats) => {
  try {
    const showData = await Show.findById(showId);

    if (!showData) {
      return false;
    }

    const occupiedSeats = showData.occupiedSeats;

    const isAnySeatTaken = selectedSeats.some((seat) => occupiedSeats[seat]);

    return !isAnySeatTaken;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const createBooking = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { showId, selectedSeats } = req.body;

    const isAvailable = await getAvailableSeats(showId, selectedSeats);

    if (!isAvailable) {
      return res.json({
        success: false,
        message: "Selected seats are not available.",
      });
    }

    const showData = await Show.findById(showId).populate("movie");

    const booking = await Booking.create({
      user: userId,
      show: showId,
      amount: showData.showPrice * selectedSeats.length,
      bookedSeats: selectedSeats,
    });

    selectedSeats.forEach((seat) => {
      showData.occupiedSeats[seat] = userId;
    });

    showData.markModified("occupiedSeats");
    await showData.save();

    // Razorpay Instance
    console.log("KEY ID:", process.env.RAZORPAY_KEY_ID);
    console.log("KEY SECRET:", process.env.RAZORPAY_KEY_SECRET);
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Create Razorpay Order
    const options = {
      amount: booking.amount * 100, // amount in paise
      currency: "INR",
      receipt: booking._id.toString(),
    };

    const order = await razorpay.orders.create(options);

    // Save Order ID
    booking.paymentLink = order.id;
    await booking.save();

    return res.json({
      success: true,
      order,
      bookingId: booking._id,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { userId } = req.auth();

    const {
      bookingId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    // Find booking and populate show -> movie
    const booking = await Booking.findById(bookingId).populate({
      path: "show",
      populate: {
        path: "movie",
      },
    });

    if (!booking) {
      return res.json({
        success: false,
        message: "Booking not found.",
      });
    }

    // Verify owner
    if (booking.user.toString() !== userId) {
      return res.json({
        success: false,
        message: "Unauthorized.",
      });
    }

    // Verify Razorpay Order
    if (booking.paymentLink !== razorpay_order_id) {
      return res.json({
        success: false,
        message: "Invalid Razorpay Order.",
      });
    }

    // Verify Signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.json({
        success: false,
        message: "Payment verification failed.",
      });
    }

    // Generate QR
    const qrData = JSON.stringify({
      bookingId: booking._id,
      movie: booking.show.movie.title,
      seats: booking.bookedSeats,
      user: booking.user,
    });

    booking.qrCode = await QRCode.toDataURL(qrData);
    booking.isPaid = true;
    booking.paymentLink = "";

    await booking.save();

    // Fetch Clerk user
    const user = await clerkClient.users.getUser(userId);

    const email = user.emailAddresses[0].emailAddress;

    // Send Email
    try {
      await sendBookingEmail(
        email,
        booking.show.movie.title,
        new Date(booking.show.showDateTime).toLocaleDateString(),
        new Date(booking.show.showDateTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        booking.bookedSeats,
        booking.amount,
        booking.qrCode,
      );
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }

    return res.json({
      success: true,
      message: "Payment verified successfully.",
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
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
      message: "Successfully fetched occupied seats.",
      occupiedSeats,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error.message,
    });
  }
};

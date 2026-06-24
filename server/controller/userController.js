import Booking from "../models/Booking.js";
import { clerkClient } from "@clerk/express";
import Movie from "../models/Movie.js";

export const UserBookings = async (req, res) => {
  try {
    const user = req.auth().userId;

    const bookings = await Booking.find({ user })
      .populate({
        path: "show",
        populate: { path: "movie" },
      })
      .sort({ createdAt: -1 });

    return res.json({
      success: false,
      bookings,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const UpdateFavourite = async (req, res) => {
  try {
    const userId  = req.auth().userId;

    const { movieId } = req.body;

    const user = await clerkClient.users.getUser(userId);

    if (!user.privateMetadata.favorites) {
      user.privateMetadata.favorites = [];
    }

    if (!user.privateMetadata.favorites.includes(movieId)) {
      user.privateMetadata.favorites.push(movieId);
    } else {
      user.privateMetadata.favorites = user.privateMetadata.favorites.filter(
        (item) => item != movieId,
      );
    }

    await clerkClient.users.updateUserMetadata(userId, {
  privateMetadata: {
    favorites:user.privateMetadata.favorites,
  },
});

    res.json({
      success: true,
      message: "favorites updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const userId = req.auth().userId;

    const user = await clerkClient.users.getUser(userId);

    const favorites = await user.privateMetadata.favorites;

    const movies = await Movie.find({ _id: { $in: favorites } });

    res.json({ success: true, message: "get all favorites movies", movies });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

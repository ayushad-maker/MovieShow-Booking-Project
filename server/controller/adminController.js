import Booking from "../models/Booking.js";
import Show from "../models/Show.js";

export const isAdmin = async (req, res) => {
  return res.json({
    success: true,
    isAdmin: true,
  });
};

export const dashBoardData = async (req, res) => {
  try {
    const bookings = await Booking.find({ isPaid: true });
    const activeShows = await Show.find(showDateTime, {
      $gte: new Date(),
    }).populate("movie");

    const totalUser = await User.countDocuments();

    const dashBoardData = {
      totalbookings: bookings.length,
      totalReveune: bookings.reduce(
        (acc, bookings) => acc + bookings.amount,
        0,
      ),
      activeShows,
      totalUser,
    };

    return res.json({
      success: true,
      dashBoardData,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllShow = async (req, res) => {
  try {
    const allShows = (
      await Show.find(showDateTime, { $gte: new Date() }).populate("movie")
    ).toSorted({ showDateTime: 1 });

    return res.json({
      success: true,
      allShows,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllBookings = async (req,res)=>{
   
    try {
         
        const bookings = await Booking.find({}).populate('user').populate({
            path : 'show',
            populate: {path : 'movie'}
        }).sort({createdAt : -1});

        return res.json({
            success : true,
            message : "get all bookings successfully",
            bookings
        })

    } catch (error) {
         console.log(error);
         return res.json({
            success: false,
            message: error.message
         })
    }

}

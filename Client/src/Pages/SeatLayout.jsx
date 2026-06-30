import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Loading from "../Components/Loading";
import { ArrowRightIcon, ClockIcon } from "lucide-react";
import isoTimeFormat from "../Lib/isoTimeFormat";
import BlurCircle from "../Components/BlurCircle";
import toast from "react-hot-toast";
import { useAppContext } from "../Context/AppContext";

const SeatLayout = () => {
  const groupRows = [
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
    ["I", "J"],
  ];

  const { id, date } = useParams();

  const [selectedSeats, setselectedSeats] = useState([]);
  const [selectedTime, setselectedTime] = useState(null);
  const [show, setShow] = useState(null);
  const [occupiedSeats, setOccupiedSeats] = useState([]);

  const navigate = useNavigate();

  const { user, getToken, axios } = useAppContext();

  const getShow = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get(`/api/show/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setShow(data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSeatClick = (seatId) => {
    try {
      if (!selectedTime) {
        return toast("Please select time first");
      }

      if (!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
        return toast("You can only select 5 seats");
      }

      if (occupiedSeats.includes(seatId)) {
        return toast("This seat is already occupied.");
      }

      setselectedSeats((prev) =>
        prev.includes(seatId)
          ? prev.filter((seat) => seat !== seatId)
          : [...prev, seatId]
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex gap-2 mt-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`;

          return (
            <button
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              className={`h-8 w-8 rounded border border-primary/60 hover:scale-110 cursor-pointer
              ${
                selectedSeats.includes(seatId)
                  ? "bg-primary text-white"
                  : ""
              }
              ${
                occupiedSeats.includes(seatId)
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {seatId}
            </button>
          );
        })}
      </div>
    </div>
  );

  const getOccupiedSeats = async () => {
    try {
      const { data } = await axios.get(
        `/api/booking/seats/${selectedTime.showId}`
      );

      if (data.success) {
        setOccupiedSeats(data.occupiedSeats);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const bookingSeats = async () => {
    try {
      if (!user) {
        return toast.error("Please login first");
      }

      if (!selectedSeats.length || !selectedTime) {
        return toast.error("Please select seats");
      }

      const token = await getToken();

      const { data } = await axios.post(
        "/api/booking/create",
        {
          showId: selectedTime.showId,
          selectedSeats,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!data.success) {
        return toast.error(data.message);
      }

      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "QuickShow",
        description: "Movie Ticket Booking",
        order_id: data.order.id,

        handler: async function (response) {
          try {
            const token = await getToken();

            const verify = await axios.post(
              "/api/booking/verify-payment",
              {
                bookingId: data.bookingId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (verify.data.success) {
              toast.success("Payment Successful");
              navigate("/myBookings");
            } else {
              toast.error(verify.data.message);
            }
          } catch (error) {
            toast.error(error.message);
          }
        },

        prefill: {
          name: user?.fullName || "",
          email: user?.primaryEmailAddress?.emailAddress || "",
        },

        theme: {
          color: "#4f46e5",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      getShow();
    }
  }, [user]);

  useEffect(() => {
    if (selectedTime) {
      getOccupiedSeats();
    }
  }, [selectedTime]);

  return show ? (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50">
      {/* Timings */}
      <div className="w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30">
        <p className="text-lg font-semibold px-6">Available Timings</p>

        <div className="mt-5 space-y-1">
          {show.dateTime[date].map((item) => (
            <div
              key={item.time}
              onClick={() => setselectedTime(item)}
              className={`flex items-center gap-2 px-6 py-2 rounded-r-md cursor-pointer w-max ${
                selectedTime?.time === item.time
                  ? "bg-primary text-white"
                  : "hover:bg-primary/20"
              }`}
            >
              <ClockIcon className="w-4 h-4" />
              <p>{isoTimeFormat(item.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Seats */}
      <div className="relative flex-1 flex flex-col items-center max-md:mt-16">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="0px" left="0px" />
        <BlurCircle top="10px" right="-100px" />

        <h1 className="text-2xl font-semibold mb-4">
          Select your Seat
        </h1>

        <img src={assets.screenImage} alt="" />

        <p className="text-gray-400 mb-6">Screen Side</p>

        <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
            {groupRows[0].map((row) => renderSeats(row))}
          </div>

          <div className="grid grid-cols-2 gap-11">
            {groupRows.slice(1).map((group, idx) => (
              <div key={idx}>
                {group.map((row) => renderSeats(row))}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={bookingSeats}
          className="flex items-center gap-2 mt-20 px-10 py-3 bg-primary hover:bg-primary-dull rounded-full font-medium cursor-pointer"
        >
          Proceed To Checkout
          <ArrowRightIcon className="w-4 h-4" strokeWidth={3} />
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default SeatLayout;
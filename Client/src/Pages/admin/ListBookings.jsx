import { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import Title from "../../Components/admin/Title";
import { dummyBookingData } from "../../assets/assets";
import { dateFormat } from "../../Lib/dataFormat";
import { useAppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const { user, getToken, axios } = useAppContext();

  const [show, setShow] = useState([]);
  const [loading, setLoading] = useState(true);

  const getShows = async () => {
     const token = await getToken();

    const { data } = await axios.get("/api/admin/all-bookings", {
      headers: { Authorization: `Bearer ${token}.` },
    });
    if (data.success) {
      toast.success("Get All Bookings");
      setShow(data.bookings);
    } else {
      toast.error(data.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      getShows();
    }
  }, [user]);

  return !loading ? (
    <>
      <Title text1="List" text2="Bookings" />
      <div className="max-w-4xl mt-6 overflow-x-auto">
        <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
          <thead>
            <tr className="bg-primary/20 text-left text-white">
              <th className="p-2 font-medium pl-5">User Name</th>
              <th className="p-2 font-medium ">Movie Name</th>
              <th className="p-2 font-medium ">Show Time</th>
              <th className="p-2 font-medium ">Seats</th>
              <th className="p-2 font-medium ">Amount</th>
            </tr>
          </thead>
          <tbody className="font-small text-sm">
            {show.map((shows, index) => (
              <tr key={index} className="border-b border-primary/20">
                <td className="p-2 min-w-45 pl-5">{shows.user.name}</td>
                <td className="p-2">{shows.show.movie.title}</td>
                <td className="p-2">{dateFormat(shows.show.showDateTime)}</td>
                <td className="p-2">
                  {Object.keys(shows.bookedSeats)
                    .map((seat) => shows.bookedSeats[seat])
                    .join(",")}
                </td>
                <td className="p-2">
                  {currency} {shows.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default ListBookings;

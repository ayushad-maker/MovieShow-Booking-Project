import { useEffect, useState } from "react";
import { dummyShowsData } from "../../assets/assets";
import Loading from "../../Components/Loading";
import Title from "../../Components/admin/Title";
import { dateFormat } from "../../Lib/dataFormat.js";
import { useAppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";

const ListShows = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const { user, getToken, axios } = useAppContext();

  const [show, setShow] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllShows = async () => {
    try {
      
      const token =await  getToken();

      const { data } = await axios.get("/api/admin/all-shows", {
        headers: { Authorization: `Bearer ${token}.` },
      });
      if (data.success) {
        toast.success("fetch All Success.");
        setShow(data.allShows);
      } else {
        toast.error(data.message);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

 

  useEffect(() => {
    if (user) {
      getAllShows();
    }
  }, [user]);

  return !loading ? (
    <>
      <Title text1="List" text2="Shows" />
      <div className="max-w-4xl mt-6 overflow-x-auto">
        <table className="w-full mt-6 ">
          <thead>
            <tr className="bg-primary/20 text-left text-white">
              <th className="p-2 font-medium pl-5">Movie Name</th>
              <th className="p-2 font-medium">Show Time</th>
              <th className="p-2 font-medium">Total Bookings</th>
              <th className="p-2 font-medium">Earnings</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light">
            {show.map((shows, index) => (
              <tr
                key={index}
                className="border-b border-primary/10 bg-primary/5 even:bg-primary/10"
              >
                <td className="p-2 min-w-45 pl-5">{shows.movie.title}</td>
                <td className="p-2">{dateFormat(shows.showDateTime)}</td>
                <td className="p-2">
                  {Object.keys(shows.occupiedSeats).length}
                </td>
                <td className="p-2">
                  {currency}{" "}
                  {Object.keys(shows.occupiedSeats).length * shows.showPrice}
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

export default ListShows;

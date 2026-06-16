import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { dummyDashboardData } from "../../assets/assets";
import Loading from "../../Components/Loading";
import Title from "../../Components/admin/Title";
import BlurCircle from "../../Components/BlurCircle";
import { dateFormat } from "../../Lib/dataFormat";

const DashBoard = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [dashBoardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0,
  });

  const [loading, setLoading] = useState(true);

  const dashboardCards = [
    {
      title: "Total Bookings",
      value: dashBoardData.totalBookings || "0",
      icon: ChartLineIcon,
    },
    {
      title: "Total Revenue",
      value: currency + dashBoardData.totalRevenue || "0",
      icon: CircleDollarSignIcon,
    },
    {
      title: "Active Shows",
      value: dashBoardData.activeShows.length || "0",
      icon: PlayCircleIcon,
    },
    {
      title: "Total Users",
      value: dashBoardData.totalUser || "0",
      icon: UsersIcon,
    },
  ];

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return !loading ? (
    <>
      <Title text1="Admin" text2="DashBoard" />

      <div className="relative flex gap-4 mt-6">
        <BlurCircle top="-100px" left="0" />
        <div className="flex gap-4 w-full">
          {dashboardCards.map((cards, index) => (
            <div key={index} className="flex items-center justify-between px-4 py-3 bg-primary/10 border border-primary/20 rounded-md max-w-50 w-full hover:scale-105">
              <div className="hover:scale-105">
                <h1>{cards.title}</h1>
                <p className="text-xl font-medium mt-1">{cards.value}</p>
              </div>
              <cards.icon className="w-6 h-6"/>
            </div>
          ))}
        </div>
      </div>
   
     <p className="mt-10 text-lg font-medium">Active Shows</p>
     <div className="relative flex flex-wrap gap-6 mt-4 max-w-5xl">
      <BlurCircle  top="100px" left="-10px"/>
      {dashBoardData.activeShows.map((show)=>(
        <div key={show.id} className="w-55 rounded-lg bg-primary/10 h-full overflow-hidden pb-3 border border-primary/20 hover:translate-y-1 transition duration-300"> 
       <img src={show.movie.poster_path} alt="" className="h-60 w-full object-cover" />
       <p className="font-medium p-2 truncate">{show.movie.title}</p>
       <div className="flex items-center justify-between px-2">
        <p className="text-lg font-medium">{currency} {show.showPrice}</p>
        <p className="flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1">
          <StarIcon className="w-4 h-4 text-primary fill-primary"/>
          {show.movie.vote_average.toFixed(1)}
        </p>
       </div>
       <p className="px-2 pt-6 text-sm text-gray-400">{dateFormat(show.showDateTime)}</p>
        </div>
      ))}

     </div>

    </>
  ) : (
    <Loading />
  );
};

export default DashBoard;

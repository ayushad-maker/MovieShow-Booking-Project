import Navbar from "./Components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Movies from "./Pages/Movies.jsx";
import Favourite from "./Pages/Favourite.jsx";
import MyBookings from "./Pages/MyBookings.jsx";
import SeatLayout from "./Pages/SeatLayout.jsx";
import MovieDetails from "./Pages/MovieDetails.jsx";
import Footer from "./Components/Footer.jsx";
import { Toaster } from "react-hot-toast";
import Layout from "./Pages/admin/Layout.jsx";
import DashBoard from "./Pages/admin/DashBoard.jsx";
import AddShows from "./Pages/admin/AddShows.jsx";
import ListShows from "./Pages/admin/ListShows.jsx";
import ListBookings from "./Pages/admin/ListBookings.jsx";

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith("/admin");

  return (
    <>
      <Toaster />
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/favourites" element={<Favourite />} />
        <Route path="/myBookings" element={<MyBookings />} />
        <Route path="/movies/:id/:date" element={<SeatLayout />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/admin/*" element={<Layout />}>
          <Route index element={<DashBoard />} />
          <Route path="add-shows" element={<AddShows />} />
          <Route path="list-shows" element={<ListShows />} />
          <Route path="list-bookings" element={<ListBookings />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;

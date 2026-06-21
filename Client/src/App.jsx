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
import { useAppContext } from "./Context/AppContext.jsx";
import { SignIn } from "@clerk/react";

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith("/admin");

  const {user} = useAppContext();

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
        <Route path="/admin/*"  element={user ? <Layout /> : (
          <div className="min-h-screen flex items-center justify-center ">
            <SignIn fallbackRedirectUrl={'/admin'} />
          </div>
        )}>
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

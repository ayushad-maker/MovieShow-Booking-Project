import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from "lucide-react";
import { useState } from "react";
import { useClerk, UserButton, useUser } from "@clerk/react";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {user} = useUser()
  const {openSignIn} = useClerk();

  const Navigate = useNavigate()



  return (
    <div className="fixed top-0 left-0 z-50 w-full  text-white px-6 flex justify-between items-center md:px-16 lg:px-36 py-5">
      <Link to="/">
        <img src={assets.logo} alt="" className="w-36 h-auto" />
      </Link>

      <div
        className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium
max-md:text-lg z-50 flex flex-col md:flex-row items-center
max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen
min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border
border-gray-300/20 overflow-hidden transition-[width] duration-300 ${isMenuOpen ? "max-md:w-64" : "max-md:w-0"}`}
      >
        <XIcon className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)} />
        <Link
          to="/"
          onClick={()=> {setIsMenuOpen(false); scrollTo(0,0)}}
          className=" text-lg font-medium hover:text-primary transition"
        >
          Home
        </Link>
        <Link
          to="/movies"
            onClick={()=> {setIsMenuOpen(false); scrollTo(0,0)}}
          className=" text-lg font-medium hover:text-primary transition mx-6"
        >
          Movies
        </Link>
        <Link
          to="/tv-shows"
            onClick={()=> {setIsMenuOpen(false); scrollTo(0,0)}}
          className=" text-lg font-medium hover:text-primary transition"
        >
          Threaters
        </Link>
        <Link
          to="/people"
            onClick={()=> {setIsMenuOpen(false); scrollTo(0,0)}}
          className=" text-lg font-medium hover:text-primary transition mx-6"
        >
          Releases
        </Link>
        <Link
          to="/favourites"
            onClick={()=> {setIsMenuOpen(false),scrollTo(0,0)}}
          className=" text-lg font-medium hover:text-primary transition mx-6"
        >
          Favorites
        </Link>
      </div>

      <div className="flex items-center gap-8 justify-between">
        <SearchIcon className="hidden md:inline-block w-6 h-6 cursor-pointer" />
        {
          !user ? (
             <button onClick={openSignIn} className="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer">
          Login
        </button>
          ) : (
            <UserButton >
              <UserButton.MenuItems>
                <UserButton.Action label="My Bookings" labelIcon={<TicketPlus width={16} />} onClick={()=>{Navigate("/bookings")}}/>
              </UserButton.MenuItems>
            </UserButton>
          )
        }
      </div>

      <MenuIcon className="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)} />
    </div>
  );
};

export default Navbar;

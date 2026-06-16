import {ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import BlurCircle from "./BlurCircle"
import {dummyShowsData } from "../assets/assets"
import MovieCard from "./MovieCard"

const FeaturedSection = () => {

    const navigate = useNavigate()

  return (
    <>
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden">

      <div className=" relative flex items-center justify-between pt-20 pb-10">
        <BlurCircle top="0" right="-80px"/>
        <p className="">Now Showing</p> 
        <button onClick={() => navigate("/movies")}  className="flex items-center text-gray-300 gap-2 cursor-pointer">View All <ArrowRight className="hover:translate-x-1.5 transition w-4.5 h-4.5"/></button>

      </div>

      <div className="flex group flex-wrap items-center justify-start gap-28 overflow-x-auto pb-10">
        {dummyShowsData.slice(0,8).map((show) => (
          <MovieCard  key={show._id} movie={show}/>
        ))}
      </div>

      <div onClick={() => {navigate("/movies"); scrollTo(0,0)}} className="flex items-center justify-center gap-6 overflow-x-auto pb-10">
        <button className="px-10 py-3 text-sm bg-primary text-white rounded-md hover:bg-primary-dull cursor-pointer">Show More</button>
      </div>

  

    </div>
    </>

  )
}

export default FeaturedSection
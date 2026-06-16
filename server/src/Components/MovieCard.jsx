import { StarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom"
import timeFormat from "../Lib/timeFormat";

const MovieCard = ({ movie }) => {

    const navigate = useNavigate()

  return (
    <div className="flex flex-col justify-between p-3 bg-gray-800 rounded-2xl hover:-translate-y-1 transtion duration-300 w-66 group-hover:not-hover:opacity-40">

       <img onClick={() => {navigate(`/movies/${movie.id}`); scrollTo(0,0)}} src={movie.backdrop_path} alt="" className="rounded-lg h-52 w-full object-cover object-right-bottom cursor-pointer"/>

       <p className="font-semibold mt-2 truncate">{movie.title}</p>

       <p className="text-sm text-gray-400 mt-1">
        {new Date(movie.release_date).getFullYear()} • {movie.genres.slice(0,2).map(genre => genre.name).join("|")} • {timeFormat(movie.runtime)}
       </p>

       <div className="flex items-center justify-between mt-4 pb-3">
        <button className="gap-2 mt-4 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition-colors duration-200 rounded-2xl cursor-pointer">Buy Tickets</button>
        <p className="flex items-center gap-1 mt-2 text-sm text-gray-300 pr-2">
            <StarIcon className="w-4 h-4 text-primary fill-primary"/> {movie.vote_average.toFixed(1)}
        </p>
       </div>


    </div>
  )
}

export default MovieCard
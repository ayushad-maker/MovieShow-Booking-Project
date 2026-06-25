import Title from "../Components/admin/Title";
import BlurCircle from "../Components/BlurCircle";
import MovieCard from "../Components/MovieCard";
import { useAppContext } from "../Context/AppContext";

const Favourite = () => {
  const { favouriteMovies } = useAppContext();

  return favouriteMovies.length > 0 ? (
    <div className="relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-20 overflow-hidden">
      <h1 className="text-3xl font-bold flex items-center justify-start ml-8">
        <Title text1="Your" text2="Favourite Movies" />
      </h1>
      <BlurCircle top="100px" left="0px" />
      <BlurCircle top="120px " right="-50px" />
      <div className="flex flex-wrap items-center justify-center gap-15 overflow-x-auto pb-10 mt-10">
        {favouriteMovies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  ) : (
    <div>
      <h1 className="min-h-screen flex items-center justify-center text-4xl font-bold">
        No Movies Available
      </h1>
    </div>
  );
};

export default Favourite;

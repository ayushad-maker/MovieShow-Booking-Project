import { ArrowRight, Calendar1Icon, Clock1 } from "lucide-react"
import { assets } from "../assets/assets"
import { useNavigate } from "react-router-dom"



const HeroSection = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-start justify-center gap-6 px-6 md:px-16 lg:px-36 bg-[url('/backgroundImage.png')] bg-cover bg-center h-screen text-white">
      
      <img src={assets.marvelLogo} alt="QuickShow Logo" className="max-h-14 lg:h-14 mt-20" />


      <h1 className="text-4xl md:text-[70px] md:leading-18 font-semibold max-w-110">Guardians <br /> of the Galaxy</h1>

      <div className="flex items-center gap-4  text-gray-300">
        <span>Action | Adventure | Sci-Fi</span>

    
        <div className="flex items-center gap-1">
            <Calendar1Icon />2018
        </div>
        <div className="flex items-center gap-1">
            <Clock1 />2h 18min
        </div>
         </div>
      
         <div className="flex flex-col items-start gap-6">
        <p className="max-w-md text-gray-300 mt-4 ">
            In a post-apocalyptic world where cities ride on wheels and consume each other to survive, two people meet in London and try to stop a conspiracy.
        </p>

        <button onClick={() => navigate('/movies')}  className="flex items-center gap-2 mt-4 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition-colors duration-200 rounded-2xl cursor-pointer">Explore Movies
            <ArrowRight className="inline-block w-4 h-4 ml-2" />
        </button>
       

      </div>

    </div>
  )
}

export default HeroSection
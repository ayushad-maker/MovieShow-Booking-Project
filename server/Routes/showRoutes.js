import express from "express";
import { addShow, getAllShow, getNowPlayingMovies, getShow } from "../controller/showController.js";
import { protectAdmin } from "../middleware/auth.js";



const showRouter = express.Router();

showRouter.get('/now-playing',protectAdmin,getNowPlayingMovies);

showRouter.post('/add',addShow);
showRouter.get('/all',getAllShow);
showRouter.get('/:movieId',getShow);


export default showRouter
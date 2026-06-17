import express from "express";
import { getNowPlayingMovies } from "../controller/showController.js";


const showRouter = express.Router();

showRouter.get('/now-playing',getNowPlayingMovies);

export default showRouter
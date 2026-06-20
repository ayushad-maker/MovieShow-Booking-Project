import express from "express";
import { getFavorites, UpdateFavourite, UserBookings } from "../controller/userController.js";


const UserRouter = express.Router();

UserRouter.get("/bookings",UserBookings);
UserRouter.post("/update-favorite",UpdateFavourite);
UserRouter.get("/favorites",getFavorites);

export default UserRouter;
import express from "express";
import { dashBoardData, getAllBookings, getAllShow, isAdmin } from "../controller/adminController.js";
import { protectAdmin } from "../middleware/auth.js";

const AdminRoutes = express.Router();

AdminRoutes.get("/is-Admin",protectAdmin,isAdmin);
AdminRoutes.get('/dashboard',protectAdmin,dashBoardData);
AdminRoutes.get('/all-shows',protectAdmin,getAllShow);
AdminRoutes.get('/all-bookings',protectAdmin,getAllBookings);

export default AdminRoutes;



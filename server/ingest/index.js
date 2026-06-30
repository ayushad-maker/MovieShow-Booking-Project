import { Inngest } from "inngest";
import User from "../models/user.js";
import Booking from "../models/Booking.js";
import sendEmail from "../configs/nodeMailer.js";

export const inngest = new Inngest({ id: "movie-ticket-booking" });

// inngest function to save the user in the database
const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
    triggers: [{ event: "clerk/user.created" }],
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    await User.create({
      _id: id,
      name: `${first_name} ${last_name}`,
      email: email_addresses[0].email_address,
      image: image_url,
    });
  },
);

// inngest function to delete the user from the database

const syncUserDeletion = inngest.createFunction(
  {
    id: "delete-user-with-clerk",
    triggers: [{ event: "clerk/user.deleted" }],
  },
  async ({ event }) => {
    await User.findByIdAndDelete(event.data.id);
  },
);

const syncUserUpdation = inngest.createFunction(
  {
    id: "update-user-with-clerk",
    triggers: [{ event: "clerk/user.updated" }],
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    await User.findByIdAndUpdate(id, {
      name: `${first_name} ${last_name}`,
      email: email_addresses[0].email_address,
      image: image_url,
    });
  },
);

const sendBookingConfirmationEmail = inngest.createFunction(
  {
    id: "send-booking-confirmation-email",
    triggers: [
      {
        event: "app/show.booked",
      },
    ],
  },
  async ({ event, step }) => {
    const { bookingId } = event.data;

    const booking = await Booking.findById(bookingId)
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "Movie",
        },
      })
      .populate("user");

    await sendEmail({
      to: booking.user.email,
      subject: `Payment Conformation: "${booking.show.movie.title}" booked!`,
      body: `
<div style="font-family: Arial, sans-serif; line-height: 1.5;">
    <h2>Hi ${booking.user.name},</h2>

    <p>
        Your booking for
        <strong style="color: #F84565;">
            "${booking.show.movie.title}"
        </strong>
        is confirmed.
    </p>

    <p>
        <strong>Date:</strong>
        ${new Date(booking.show.showDateTime).toLocaleDateString("en-US", {
          timeZone: "Asia/Kolkata",
        })}<br/>

        <strong>Time:</strong>
        ${new Date(booking.show.showDateTime).toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
        })}
    </p>

    <p>Enjoy the show! 🍿</p>

    <p>
        Thanks for booking with us!<br/>
        — QuickShow Team
    </p>
</div>`,
    });
  },
);

export const functions = [
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdation,
  sendBookingConfirmationEmail,
];

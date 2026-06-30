import { Stripe } from "stripe";
import Booking from "../models/Booking.js";

export const stripeWebhooks = async (request, response) => {
  console.log("✅ Stripe webhook called");
  const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    return response.status(400).send(`Webhook Error : ${error.message}.`);
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        console.log("Payment succeeded!");

        const paymentIntent = event.data.object;
        console.log("PaymentIntent ID:", paymentIntent.id);

        const sessionList = await stripeInstance.checkout.sessions.list({
          payment_intent: paymentIntent.id,
        });

        console.log("Session List:", sessionList.data);

        if (sessionList.data.length === 0) {
          console.log("❌ No checkout session found");
          break;
        }

        const session = sessionList.data[0];

        console.log("Session:", session);
        console.log("Metadata:", session.metadata);

        const bookingId = session.metadata.bookingId;

        console.log("Booking ID:", bookingId);

        const booking = await Booking.findByIdAndUpdate(
          bookingId,
          {
            isPaid: true,
            paymentLink: "",
          },
          { new: true },
        );

        console.log("Updated booking:", booking);

        break;
      }

      default:
        console.log("Unhandled event type:", event.type);
    }
    response.json({ recieved: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    response.status(500).send("Internal Server Error");
  }
};

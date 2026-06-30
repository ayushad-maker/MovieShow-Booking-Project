import transporter from "../configs/nodeMailer.js";

const sendBookingEmail = async (
  email,
  movie,
  date,
  time,
  seats,
  amount,
  qrCode
) => {
  // Remove the data:image/png;base64, prefix
  const qrBase64 = qrCode.replace(/^data:image\/png;base64,/, "");

  const info = await transporter.sendMail({
    from: `"QuickShow" <${process.env.SENDER_EMAIL}>`,
    to: email,
    subject: `🎟️ Booking Confirmed - ${movie}`,

    html: `
    <div style="max-width:650px;margin:auto;background:#ffffff;border-radius:12px;border:1px solid #e5e5e5;font-family:Arial,sans-serif;overflow:hidden">

      <div style="background:#5B3DF5;padding:24px;text-align:center;color:white;">
        <h1 style="margin:0;">🎬 QuickShow</h1>
        <p style="margin:8px 0 0;">Your Movie Ticket is Confirmed</p>
      </div>

      <div style="padding:30px;">

        <h2 style="margin-top:0;">${movie}</h2>

        <table style="width:100%;font-size:15px;border-collapse:collapse;">
          <tr>
            <td style="padding:8px 0;"><strong>📅 Date</strong></td>
            <td>${date}</td>
          </tr>

          <tr>
            <td style="padding:8px 0;"><strong>🕒 Time</strong></td>
            <td>${time}</td>
          </tr>

          <tr>
            <td style="padding:8px 0;"><strong>💺 Seats</strong></td>
            <td>${seats.join(", ")}</td>
          </tr>

          <tr>
            <td style="padding:8px 0;"><strong>💳 Amount</strong></td>
            <td>₹${amount}</td>
          </tr>
        </table>

        <div style="text-align:center;margin-top:40px;">

          <img
            src="cid:qrcode"
            width="220"
            style="border:8px solid #f5f5f5;border-radius:12px;"
          />

          <p style="margin-top:20px;color:#666;">
            Scan this QR code at the theatre entrance.
          </p>

        </div>

      </div>

      <div style="background:#f7f7f7;padding:18px;text-align:center;font-size:13px;color:#666;">
        🍿 Thank you for choosing <strong>QuickShow</strong>.
        <br/>
        Enjoy your movie!
      </div>

    </div>
    `,

    attachments: [
      {
        filename: "ticket-qr.png",
        content: qrBase64,
        encoding: "base64",
        cid: "qrcode",
      },
    ],
  });

  console.log("Email sent:", info.messageId);
};

export default sendBookingEmail;
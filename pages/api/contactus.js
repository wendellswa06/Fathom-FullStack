const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST" || !req.body) {
    res.json({ status: 400 });
    res.end();
    return;
  }

  const { fullname, email, subject, message } = req.body;

  try {
    const msg = {
      to: process.env.EMAIL_RECEIVER,
      from: process.env.EMAIL_SENDER,
      subject: "Customer contacted to Fathom team!",
      html: `<div>
            <h1>Contact Support Received From ${fullname}</h1>
            <p>${message}</p>
            <p>Reply Email: <a href="mailto:${email}">${email}</a></p>
            </div>
        `,
    };

    await sgMail.send(msg);

    res.status(200).json({
      status: true,
      message: "Contact us email sent!",
    });
  } catch (error) {
    console.log(error.response.body);
    res.status(403).json({ error });
  }
}

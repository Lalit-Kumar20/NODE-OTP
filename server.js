const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const nodemailer = require("nodemailer");

// OTP generator
function generateOTP(length = 6) {
  return  Math.floor(1000 + Math.random() * 9000).toString();
}

async function sendOTP(toEmail, whoEmail, whoPhone) {
  const otp = generateOTP();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "bjohny636@gmail.com",      // your Gmail
      pass: "xmzr kcfw dzkm ybnj",   // Gmail app password
    },
  });

  const mailOptions = {
    from: "bjohny636@gmail.com",
    to: toEmail,
    subject: "Your OTP Code",
    text: `Email: ${whoEmail}, Phone: ${whoPhone} Your OTP is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
  console.log(`OTP ${otp} sent to ${toEmail}`);
}

// Example usage


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Basic route
app.post('/otp', (req, res) => {
  const email = req.body.email;
  const phone = req.body.phone;
  //const currentOtp = Math.floor(1000 + Math.random() * 9000).toString();
  sendOTP("lalitk2282k@gmail.com",email,phone);
  res.send("Otp Sent");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
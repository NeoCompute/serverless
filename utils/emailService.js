const mailgun = require("mailgun-js");

const DOMAIN = process.env.MAILGUN_DOMAIN;
const API_KEY = process.env.MAILGUN_API_KEY;
const fromEmail = process.env.FROM_EMAIL;
const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });

async function sendVerificationEmail(email, verificationLink) {
  const data = {
    from: fromEmail,
    to: email,
    subject: "Verify Your Email Address",
    text: `Please verify your email by clicking on the link: ${verificationLink}. This link expires in 2 minutes.`,
  };

  await mg.messages().send(data);
}

module.exports = { sendVerificationEmail };

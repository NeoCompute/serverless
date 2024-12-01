const mailgun = require("mailgun-js");

async function sendVerificationEmail(
  email,
  verificationLink,
  apiKey,
  domain,
  fromEmail
) {
  console.log("Sending Verification Email to:", email);
  const mg = mailgun({ apiKey, domain });
  const data = {
    from: fromEmail,
    to: email,
    subject: "Verify Your Email Address",
    text: `Please verify your email by clicking on the link: ${verificationLink}. This link expires in 2 minutes.`,
  };

  await mg.messages().send(data);
}

module.exports = { sendVerificationEmail };

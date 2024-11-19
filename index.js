const { sendVerificationEmail } = require("./utils/emailService");
const verifyEmailLink = process.env.VERIFY_EMAIL_LINK;

exports.handler = async (event) => {
  try {
    const snsMessage = event.Records[0].Sns.Message;
    const { email, firstName, lastName, verificationToken } =
      JSON.parse(snsMessage);
    const verificationLink = `${verifyEmailLink}/${verificationToken}`;
    console.log("verificationLink", verificationLink);
    await sendVerificationEmail(email, verificationLink);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Verification email sent and logged successfully",
      }),
    };
  } catch (error) {
    console.error("Error in Lambda function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error processing verification email" }),
    };
  }
};

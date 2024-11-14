const { sendVerificationEmail } = require("./utils/emailService");
const { updateTokenExpiry } = require("./utils/tokenService");

exports.handler = async (event) => {
  try {
    const snsMessage = event.Records[0].Sns.Message;
    const { email, firstName, lastName, verificationToken } =
      JSON.parse(snsMessage);

    const verificationLink = `http://akhil-k.com/verify?token=${verificationToken}`;
    await sendVerificationEmail(email, verificationLink);

    await updateTokenExpiry(email, verificationToken);

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

const { sendVerificationEmail } = require("./utils/emailService");
const { saveVerificationRecord } = require("./utils/database");

exports.handler = async (event) => {
  try {
    const snsMessage = event.Records[0].Sns.Message;
    const {
      email,
      firstName,
      lastName,
      verificationToken,
      verificationTokenExpires,
    } = JSON.parse(snsMessage);

    const verificationLink = `http://akhil-k.com/verify?token=${verificationToken}`;
    await sendVerificationEmail(
      email,
      verificationLink,
      verificationTokenExpires
    );

    await saveVerificationRecord({
      email,
      verificationToken,
      verificationTokenExpires,
    });

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

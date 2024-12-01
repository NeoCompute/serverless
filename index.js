const AWS = require("aws-sdk");
const secretsManager = new AWS.SecretsManager();

async function getEmailCredentials() {
  const secret = await secretsManager
    .getSecretValue({ SecretId: process.env.EMAIL_SECRET_ID })
    .promise();
  return JSON.parse(secret.SecretString);
}

const { sendVerificationEmail } = require("./utils/emailService");

exports.handler = async (event) => {
  const emailCredentials = await getEmailCredentials();
  const apiKey = emailCredentials.apiKey;
  const domain = emailCredentials.domain;
  const fromEmail = emailCredentials.fromEmail;
  const verify_email_link = emailCredentials.verify_email_link;
  const verify_email_expiry_time = emailCredentials.verify_email_expiry_time;

  try {
    const snsMessage = event.Records[0].Sns.Message;
    const { email, firstName, lastName, verificationToken } =
      JSON.parse(snsMessage);
    const verificationLink = `${verify_email_link}/${verificationToken}`;
    console.log("verificationLink", verificationLink);
    await sendVerificationEmail(
      email,
      verificationLink,
      apiKey,
      domain,
      fromEmail
    );
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

const User = require("../models/user");
const verifyEmailExpiry = parseInt(process.env.VERIFY_EMAIL_EXPIRY_TIME) || 120;

async function updateTokenExpiry(email, token) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { error: "User not found" };
    }
    user.verificationTokenExpiry = new Date(
      new Date().getTime() + verifyEmailExpiry * 1000
    );
    await user.save();
    return { success: "Token expiry updated" };
  } catch (error) {
    return { error: "Error updating token expiry" };
  }
}

module.exports = { updateTokenExpiry };

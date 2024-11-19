# serverless

### This repo implements a serverless email verification service using AWS Lambda, Mailgun for sending emails, and RDS for storing user data. The service sends a verification email to users.

## Features

1. Email Verification: Sends email verification links to users using Mailgun.
2. Serverless Architecture: Designed for AWS Lambda and SNS integration.

### File Structure

1. utils/emailService.js

Handles the logic for sending email verification messages using Mailgun.

- Key functionalities:
  - Fetches MAILGUN_DOMAIN, MAILGUN_API_KEY, and FROM_EMAIL from environment variables.
  - Sends a verification email with a time-sensitive link.

2. index.js

The entry point for the AWS Lambda function that orchestrates the email verification flow.

- Key functionalities:
  - Parses SNS messages to extract user details (email, name, token).
  - Constructs a verification link using VERIFY_EMAIL_LINK from environment variables.
  - Calls sendVerificationEmail to send the email.
  - Updates token expiry using updateTokenExpiry.


### Environment Variables

Ensure the following environment variables are set in your .env file:

```bash
MAILGUN_DOMAIN=
MAILGUN_API_KEY=
FROM_EMAIL=
VERIFY_EMAIL_LINK=
VERIFY_EMAIL_EXPIRY_TIME=
```
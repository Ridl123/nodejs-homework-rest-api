const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationEmail = async (to, verificationToken) => {
  const msg = {
    to,
    from: process.env.SENDER_EMAIL,
    subject: "Please verify your email address",
    text: "Click on the link below to verify your email address",
    html: `<a href="${process.env.BASE_URL}/users/verify/${verificationToken}">Verify Email</a>`,
  };
  await sgMail.send(msg);
};

module.exports = { sendVerificationEmail };

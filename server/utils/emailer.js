const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "benderrodriguez34@gmail.com",
    pass: ";trf_bender"
  }
});

module.exports.sendConfirmation = email => {
  const url = `http://localhost:3000/confirmation/${email}`;

  transporter.sendMail(
    {
      from: "benderrodriguez34@gmail.com",
      to: email,
      subject: "Confirm Email",
      html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`
    },
    (error, info) => {
      if (error) {
        console.log("Error occurred");
        console.log(error.message);
      }

      console.log("Message sent successfully!");
      console.log(nodemailer.getTestMessageUrl(info));
    }
  );
};

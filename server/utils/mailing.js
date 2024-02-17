import nodemailer from 'nodemailer';

export const sendEmail = async ({email, subject, text}) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Send the email
  await transporter.sendMail({
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject,
    text,
  });
}
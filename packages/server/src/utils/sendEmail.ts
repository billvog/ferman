import nodemailer from "nodemailer";
import { __prod__ } from "../constants";

export const sendEmail = async (to: string, subject: string, body: string) => {
  let transporter;
  if (__prod__) {
    transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      auth: {
        user: "apikey",
        pass:
          "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",
      },
    });
  } else {
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: "e3azlrucypnhw275@ethereal.email",
        pass: "zb8nWDxSFSvb8UgzkU",
      },
    });
  }

  let info = await transporter.sendMail({
    from: '"Ferman" <no-reply@ferman.ga>',
    to,
    subject,
    html: body,
  });

  console.log("Message sent: %s", info.messageId);

  if (!__prod__) {
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
};

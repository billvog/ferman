import nodemailer from "nodemailer";
import { __prod__ } from "../constants";

const stylesheet = `
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.frmn-wrapper {
  display: flex;
  flex-direction: column;
}
.frmn-container {
  padding: 36px 40px;
  background-color: burlywood;
  color: saddlebrown;
  border-radius: 15px 15px 0 0;
}
.frmn-h1 { margin: 0 0 8px 0 }
.frmn-container code {
  background-color: brown;
  color: white;
  padding: 3px 6px;
  border-radius: 4px;
}
.frmn-footer {
  background-color: bisque;
  color: saddlebrown;
  font-weight: 600;
  font-size: 10pt;
  border-radius: 0 0 15px 15px;
  padding: 10px 16px;
}
.frmn-footer a, .frmn-footer a:visited {
  color: brown;
}
`;

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
    html: `
    <html>
    <head>
      <style>
        ${stylesheet}
      </style>
    </head>
    <body>
      <div class='frmn-wrapper'>
        <div class="frmn-container">
          <h1 class="frmn-h1">${subject}</h1>
          ${body}
        </div>
        <div class="frmn-footer">
          © 2021 Ferman, <a href="https://ferman.ga" target="_blank" rel="noopener noreferrer">ferman.ga</a>
        </div>
      </div>
    </body>
    </html>
    `,
  });

  console.log("Message sent: %s", info.messageId);

  if (!__prod__) {
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
};

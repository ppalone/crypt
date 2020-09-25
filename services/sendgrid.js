const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
  sendEmailVerificationMail: async (email, token) => {
    let template = {
      to: email,
      from: process.env.SENDGRID_FROM,
      subject: 'CRYPT - Email Verification',
      text: 'Please verify your email by clicking on link below',
      html: `<div style="color: rgb(255, 71, 101)">
                <h1>CRYPT</h1>
            </div>
          <div>
            <p>Thank you for registering on Crypt.</p>
            <p>Please verify your account by clicking on the link <a href=${process.env.DOMAIN_URL}/verify?token=${token}>verify</a>.</p>
        </div>`,
    };

    try {
      let sendgridResponse = await sendgrid.send(template);
      return sendgridResponse;
    } catch (err) {
      return err;
    }
  },
  sendPasswordResetMail: async (email, token) => {
    let template = {
      to: email,
      from: process.env.SENDGRID_FROM,
      subject: 'CRYPT - Password Reset',
      text: 'Please click on the link below to reset your password',
      html: `<div style="color: rgb(255, 71, 101)">
          <h1>CRYPT</h1>
        </div>
      <div>
        <p>So, you forgot your password? Don't worry we'll help you to reset it.</p>
        <p>Please reset your password by clicking on the link <a href=${process.env.DOMAIN_URL}/users/reset?token=${token}>reset</a>.</p>
      </div>`,
    };

    try {
      let sendgridResponse = await sendgrid.send(template);
      return sendgridResponse;
    } catch (err) {
      return err;
    }
  },
};

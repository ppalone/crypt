const sendgrid = require('@sendgrid/mail');

// SETUP
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

// TODO - Better error handling while sending emails to users

module.exports = {
  sendEmailVerificationMail: async (email, token) => {
    let template = {
      to: email,
      from: process.env.SENDGRID_FROM,
      subject: 'CRYPT - Email Verification',
      text: 'Please verify your email by clicking on link below',
      html: `
        <a href=${process.env.DOMAIN_URL}/verify?token=${token}>Verify</a>
      `,
    };

    try {
      await sendgrid.send(template);
      console.log('Verification email sent successfully');
    } catch (err) {
      console.log(err);
    }
  },
  sendPasswordResetMail: async (email, token) => {
    let template = {
      to: email,
      from: process.env.SENDGRID_FROM,
      subject: 'CRYPT - Password Reset',
      text: 'Please click on the link below to reset your password',
      html: `
        <a href=${process.env.DOMAIN_URL}/verify?token=${token}>Verify</a>
      `,
    };

    try {
      await sendgrid.send(template);
      console.log('Password reset email sent successfully');
    } catch (err) {
      console.log(err);
    }
  },
};

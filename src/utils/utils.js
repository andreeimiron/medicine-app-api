const nodemailer = require('nodemailer');
const { senderEmail, secretPass } = require('../config/index');

const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const randomNumber = (start, end) => {
  return Math.floor(Math.random() * (end - start + 1)) + start;
};

const sendLoginDetails = async (name, email, password) => {
  const transporter = nodemailer.createTransport({
    service: 'Yahoo',
    auth: {
      user: senderEmail,
      pass: secretPass,
    },
  });

  await transporter.sendMail({
    from: `"Medical App" <${senderEmail}>`,
    to: email,
    subject: "Contul tau medical este acum activ!",
    text: `Salut ${name}, Acestea sunt datele tale de autentificare pe platforma noastra medicala:` +
      `email: ${email} parola: ${password} Apasa aici pentru a accesa platforma sau copiaza linkul acesta: ` +
      'http://localhost:8000',
    html: `
        <div>
            <p>Salut ${name},</p>
            <br>
            <p>Acestea sunt datele tale de autentificare pe platforma noastra medicala.</p>  
            <p><strong>email:</strong> ${email}</p>
            <p><strong>parola:</strong> ${password}</p>
            <p>Apasa <a href="http://localhost:3000/login">aici</a> pentru a accesa platforma sau copiaza acest link in browser: <strong>http://localhost:3000/login</strong></p>
            <br>
            <p>Iti dorim o zi productiva!</p>
            <p>Echipa Medical App</p>
        </div>
    `,
  }, (err, info) => {
    if (err) {
      console.log('Something went wrong sending email!');
    } else {
      console.log('Email sent ', info.messageId);
    }
  });
}

module.exports = {
  randomDate,
  randomNumber,
  sendLoginDetails,
}

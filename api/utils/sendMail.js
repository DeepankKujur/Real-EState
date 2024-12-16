import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: "gauravsinghchunar007@gmail.com",
    pass: "yqjasjeqmiffwcgl",
  },
});

// async..await is not allowed in global scope, must use a wrapper
export const sendMail=async(to,subject,text,html)=> {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Real-Estate " <gauravsinghchunar007@gmail.com>',
    to, 
    subject, 
    text, 
    html
  });
}


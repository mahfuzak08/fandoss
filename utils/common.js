const bcrypt = require('bcryptjs');
const Users = require('../models/user');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'fandossofficial@gmail.com',
    pass: 'Fandoss@#$'
  }
});

function sendEmail(to, subject, body){
	var mailOptions = {
	  from: 'fandossofficial@gmail.com',
	  to: to,
	  subject: subject ? subject : 'Sending Email from FanDoss',
	  text: body ? body : 'That was easy!'
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
		console.log(error);
	  } else {
		console.log('Email sent: ' + info.response);
	  }
	});
}

function passwordToHass(str) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(str, salt, (err, hash) => {
                if (err) reject(err);
                resolve(hash);
            });
        });
    });
}

async function add_user(req){
    return new Promise(async (resolve, reject) => {
		let code = Math.floor(100000 + Math.random() * 900000);
		try{
			let newUser = {
				fullname: req.body.fullname ? req.body.fullname : 'Full Name',
				email: req.body.email,
				password: await passwordToHass(req.body.password),
				email_otp: code.toString(),
				role: req.body.role ? req.body.role : 'Member',
			};
			if(req.body.phone){
				newUser.phone = req.body.phone;
			}
        	
			let addedUser = await new Users(newUser).save();
			// sendEmail(addedUser.email, `Sign in OTP from FanDoss`, `Please login by this OTP: ${code}`);
			resolve(addedUser);
		}catch(e){
			reject(e);
		}
    });
}

module.exports = { add_user };
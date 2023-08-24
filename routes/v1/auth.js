const express = require('express');
const router = express.Router();
const passport = require('passport');
const Validator = require("validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const OTP = require('../../models/email_otp');

var logger = require('../../logger');
var { add_user, compare_pass, sendEmail } = require('../../utils/common');
var { extractToken } = require('../../utils/jwt_helper');

router.get('/signup', (req, res) => {
	console.log(11);
});
/**
 * Signup 
 * email = required
 * password = required
 * fullname = optional
 */
router.post('/signup', async (req, res) => {
	console.log('signup', req.body);
	let errors = [];
    if (!Validator.isEmail(req.body.email)){
		errors.push("Invalid email.");
	}
	if (Validator.isEmpty(req.body.fullname)){
		errors.push("Password is required.");
	}
	if(errors.length > 0)
		return res.status(400).json({ name: 'Validation error', error: errors });

	let check_duplicate = await OTP.findOne({email: req.body.email}).exec();
	if(check_duplicate){
		logger.info({ name: 'DUPLICATE', error: `This email already registered` });
		return res.status(400).json({ name: 'DUPLICATE', error: `This email already registered` });
	}
	
	try {
		let code = Math.floor(100000 + Math.random() * 900000);
		await new OTP({email: req.body.email, otp: code}).save();
        sendEmail(req.body.email, `Sign in OTP from FanDoss`, `Hello ${req.body.fullname},<br>Please verify your email address by using the bellow OTP code.<br><br><h3>Your OTP: ${code} </h3><br><br><h4>NB: The otp will expire within 5 minutes</h4>`);
		
		return res.status(200).json({name: 'OTP_SEND', message: "Please check your email to verify. NB: The otp will expire within 5 minutes"});
    } catch (e) {
        return res.status(400).json({ name: 'UNEXPECTED', error: e });
    }
});

router.post('/signup_otp_verify', async (req, res) => {
	console.log('signup_otp_verify', req.body);
	let errors = [];
    if (!Validator.isEmail(req.body.email)){
		errors.push("Invalid email.");
	}
	if (Validator.isEmpty(req.body.password)){
		errors.push("Password is required.");
	}
	if (Validator.isEmpty(req.body.code)){
		errors.push("Code is required.");
	}
	if (Validator.isEmpty(req.body.fullname)){
		errors.push("Fullname is required.");
	}

	let otp_verify = await OTP.findOne({email: req.body.email, otp: req.body.code}).exec();
	if(! otp_verify){
		errors.push("OTP not match.");
	}
	if(errors.length > 0)
		return res.status(400).json({ name: 'VALIDATION_ERROR', error: errors });
	
	try {
        var result = await add_user(req);
        return res.status(200).json({user_info: result, message: "User created successfully."});
    } catch (e) {
        return res.status(400).json({ name: 'ERROR', error: e });
    }
});

/**
 * Login
 */
router.post('/login', async (req, res) => {
	console.log('login', req.body);
	let errors = [];
    if (!Validator.isEmail(req.body.email)){
		errors.push("Invalid email.");
	}
	if (Validator.isEmpty(req.body.password)){
		errors.push("Password is required.");
	}
	if(errors.length > 0)
		return res.status(400).json({ name: 'VALIDATION_ERROR', error: errors });
	
	try {
		let user = await User.findOne({email: req.body.email, is_delete: 0}).lean();
		if(user){
			let isMatch = await compare_pass(user.password, req.body.password);
			if(isMatch){
				const payload = {
					_id: user._id,
					fullname: user.fullname
				};

				jwt.sign(
					payload,
					process.env.JWT_ACCESS_TOKEN_SECRET, {
					expiresIn: 900 // 15 min in seconds
				}, async (err, access_token) => {
					jwt.sign(
						{_id: user._id},
						process.env.JWT_REFRESH_TOKEN_SECRET, {
						expiresIn: 86400 // 1 day in seconds
					}, async (err, refresh_token) => {
						let user_update = await User.updateOne({ _id: user._id }, {refresh_token}).exec();
						
						return res.status(200).json({status: 'Login success', _id: user._id, fullname: user.fullname, access_token: 'Bearer ' + access_token, refresh_token, message: 'Welcome to Fandos...'});
					});
				});
			}
			else throw new Error('Invalid password...');
		}
		else throw new Error('User not found...');
    } catch (e) {
        console.log(1214, e)
        return res.status(400).json({ name: 'ERROR', error: e });
    }
});

/**
 * Refresh token api
 * Header with Bearer token
 * Request with body refresh_token
 */
router.post('/refresh_token', async (req, res) => {
	console.log('refresh_token', req.body);
	let token = extractToken(req);
	try{
		let decode = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
		res.status(200).send(decode);
	}catch(e){
		if(e.name === 'TokenExpiredError'){
			let user = await User.findOne({refresh_token: {$in: req.body.refresh_token}}).lean();
			if(user && user._id){
				const payload = {
					_id: user._id,
					fullname: user.fullname
				};

				jwt.sign(
					payload,
					process.env.JWT_ACCESS_TOKEN_SECRET, {
					expiresIn: 15 // 900 // 15 min in seconds
				}, async (err, access_token) => {
					jwt.sign(
						{_id: user._id},
						process.env.JWT_REFRESH_TOKEN_SECRET, {
						expiresIn: 86400 // 1 day in seconds
					}, async (err, refresh_token) => {
						let user_update = await User.updateOne({ _id: user._id }, {refresh_token}).exec();

						return res.status(200).json({status: 'REFRESH_TOKEN_SUCCESS', access_token: 'Bearer ' + access_token, refresh_token, message: 'New access token and refresh token send successfully.'});
					});
				});
			}
			else{
				return res.status(401).send({name: 'unauthenticated', error: 'Unauthenticated user.'});
			}
		}
		else 
			return res.status(400).send({name: 'UNEXPECTED', error: e});
	}
});

module.exports = router;
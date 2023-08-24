const express = require('express');
const router = express.Router();
const passport = require('passport');
const Validator = require("validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

var { add_user, compare_pass } = require('../../utils/common');
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
	if (Validator.isEmpty(req.body.password)){
		errors.push("Password is required.");
	}
	if(errors.length > 0)
		return res.status(400).json({ name: 'Validation error', error: errors });
	
	try {
        var result = await add_user(req);
        return res.status(200).json({user_info: result, message: "User created successfully."});
    } catch (e) {
        console.log(1214, e)
		if(e.code === 11000){
			return res.status(400).json({ name: 'Duplicate error', error: `This email already registered` });
		}
        return res.status(400).json({ name: 'Error', error: e });
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
		return res.status(400).json({ name: 'Validation error', error: errors });
	
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
						if(user.is_active === 0 && user.email_otp){
							return res.status(200).json({status: 'Not Verified', access_token: 'Bearer ' + access_token, refresh_token, message: 'Please check your email, and give the OTP for active your account.'});
						}
						else return res.status(200).json({status: 'Login success', _id: user._id, fullname: user.fullname, access_token: 'Bearer ' + access_token, refresh_token, message: 'Welcome to Fandos...'});
					});
				});
			}
			else throw new Error('Invalid password...');
		}
		else throw new Error('User not found...');
    } catch (e) {
        console.log(1214, e)
        return res.status(400).json({ name: 'Error', error: e });
    }
});

router.post('/otp_verify', async (req, res) => {
	console.log('login', req.body);
	let errors = [];
    if (!Validator.isEmail(req.body.email)){
		errors.push("Invalid email.");
	}
	if (Validator.isEmpty(req.body.code)){
		errors.push("Code is required.");
	}
	if(errors.length > 0)
		return res.status(400).json({ name: 'Validation error', error: errors });
	
	try {
		let result = await User.updateOne({email: req.body.email, email_otp: req.body.code}, {verified: 'yes', email_otp: '', is_active: 1}).exec();
        if(result.modifiedCount === 1){
			return res.status(200).json({result: 'Email verified successfully...'});
		}
		else throw new Error('Email address or otp not match');
    } catch (e) {
        console.log(1214, e)
        return res.status(400).json({ name: 'Error', error: e });
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
						return res.status(200).json({status: 'REFRESH_TOKEN_SUCCESS', access_token: 'Bearer ' + access_token, refresh_token, message: 'Welcome to Fandos...'});
					});
				});
			}
			else{
				return res.status(401).send({name: 'unauthenticated', error: 'Unauthenticated user.'});
			}
		}
		else 
			return res.status(400).send(e);
	}
});

module.exports = router;
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Validator = require("validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var { add_user } = require('../../utils/common');

router.get('/signup', (req, res) => {
	console.log(11);
});
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
		return res.status(400).json({ error: 'Validation error', message: errors });
	
	try {
        var result = await add_user(req);
        return res.status(200).json(result);
    } catch (e) {
        console.log(1214, e)
        return res.status(400).json({ error: 'Error', message: e });
    }
})

module.exports = router;
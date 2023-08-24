const express = require('express');
const router = express.Router();
const Validator = require("validator");
var Posts = require('../../models/post');

router.get('/', async (req, res) => {
    try{
        let query = {};
        if(req.query.id) query = {_id: req.query.id};
        let posts = await Posts.find(query).lean();
        res.status(200).send({posts: posts ? posts : [], status: 'Success'});
    }catch(e){
        res.status(400).send({name: 'UNEXPECTED', error: e});
    }	
});

router.post('/', async (req, res) => {
    try{
        console.log('post post', req.body);
        let errors = [];
        if (Validator.isEmpty(req.body.title)){
            errors.push("Title is required.");
        }
        if(errors.length > 0)
		    return res.status(400).json({ name: 'VALIDATION_ERROR', error: errors });

        let post = await new Posts(req.body).save();
        res.status(200).send(post ? post : req.body);
    }catch(e){
        res.status(400).send({name: 'UNEXPECTED', error: e});
    }	
});


module.exports = router;
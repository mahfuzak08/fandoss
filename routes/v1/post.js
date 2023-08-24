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
        res.status(400).send({name: 'Unexpected Error', error: e});
    }	
});

router.post('/', async (req, res) => {
    try{
        console.log('post post', req.body);
        let errors = [];
        if (Validator.isEmpty(req.body.title)){
            errors.push("Title is required.");
        }
        let post = await new Posts(req.body).save();
        res.status(200).send(post ? post : req.body);
    }catch(e){
        res.status(400).send({name: 'Unexpected Error', error: e});
    }	
});


module.exports = router;
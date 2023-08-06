var mongoose = require('mongoose')

main().catch(err => console.log(3, err));

async function main(){
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("MongoDB Connected Successfully...");
	require('../models/index');
}
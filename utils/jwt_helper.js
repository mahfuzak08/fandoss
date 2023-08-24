const jwt = require('jsonwebtoken');

function extractToken(req){
	const bearerHeader = req.headers["authorization"];
	if(typeof bearerHeader !== 'undefined'){
		const bearer = bearerHeader.split(" ");
		if(bearer[0] == "Bearer"){
			const bearerToken = bearer[1];
			return bearerToken;
		}
		else{
			return false;
		}
	}
	else{
		return false;
	}
}

module.exports = { extractToken };
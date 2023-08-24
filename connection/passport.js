const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Users = require('../models/user')

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_ACCESS_TOKEN_SECRET;
module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
			console.log(11, jwt_payload);
            var user = await Users.findOne({ _id: jwt_payload._id, is_active: 1 }).exec();
            console.log(13,user)
			if (user) {
				return done(null, user);
			}
			return done(null, false);
        })
    );
};

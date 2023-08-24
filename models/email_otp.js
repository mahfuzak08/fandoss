var mongoose = require('mongoose');
var schema = mongoose.Schema;

var email_otp = new schema({
    email: { type: String, unique: true },
    otp: { type: Number, default: 0 },
    created_at: { type: Date, default:Date.now }
}, { strict: 'throw' });

email_otp.index({ created_at: 1 }, { expireAfterSeconds: 300 });

module.exports = mongoose.model('email_otp', email_otp);
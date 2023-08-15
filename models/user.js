var mongoose = require('mongoose');
var schema = mongoose.Schema;

var user = new schema({
    email: { type: String, unique: true },
    fullname: { type: String },
    phone: { type: String, unique: true },
    img: { type: String, default: "img.png" },
    is_active: { type: Number, default: 0 },
    is_delete: { type: Number, default: 0 },
    login_total: { type: Number, default: 0 },
    last_login: { type: Date },
    password: { type: String },
    role: { type: String },
    access: { type: Array, default: [] },
    created_at: { type: Date, default:Date.now },
    updated_at: { type: Date },
    birth_day: { type: Date},
    mobile_otp: { type: String },
    email_otp: { type: String },
    verified: { type: String },
    gender: { type: String },
    nickname: { type: String },
    nid: { type: String },
    intro: { type: String }
}
);
module.exports = mongoose.model('user', user);
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var post = new schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    title: { type: String, default: "New Post" },
    description: { type: String },
    attach: { type: Array, default: [] },
    location: { type: String },
    has_published: { type: Number, default: 1 },
    is_delete: { type: Number, default: 0 },
    privacy: { type: String, default: 'Public' },
    category: { type: Array, default: [] },
    created_at: { type: Date, default:Date.now },
    updated_at: { type: Date }
}, { strict: 'throw' });
module.exports = mongoose.model('post', post);
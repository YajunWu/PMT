var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Contact = new Schema({
    username: { type: String },
    age:      { type: Number }
});

module.exports = {
    Contact: mongoose.model('Contact', Contact)
};

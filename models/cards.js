var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Card = new Schema({
    idShort: { type: String },
    content: { type: String }
});

module.exports = {
    Card: mongoose.model('Card', Card)
};

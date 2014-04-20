var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var ListCard = new Schema({
    idShort: { type: String },
    title: { type: String },
    cards: { type: []}
});

module.exports = {
    ListCard: mongoose.model('ListCard', ListCard)
};

var models = require('../models/cards'),
    md5 = require('MD5');

module.exports = {
    index: function(req, res) {
        models.Card.find({}, function(err, data) {
            res.json(data);
        });
    },
    add: function(req, res) {
        var newCard = new models.Card(req.body);
        newCard.save(function(err, card) {
            if (err) {
                res.json({error: '数据库新增有误！'});
            } else {
                res.json(card);
            }
        });
    },
    update: function(req, res) {
        console.log(req.body);
        models.Card.findByIdAndUpdate(req.body._id, {content:req.body.content}, function(err, updated) {
            if (err) {
                res.json({error: '数据库更新有误！'});
            } else {
                res.json(updated);
            }
        })
    },
    delete: function(req, res) {
        models.Card.findOneAndRemove(req.body._id, function(err, card) {
            if (err) {
                res.json({error: '数据库删除有误！'});
            } else {
                res.json(200, {status: 'Success'});
            }
        });
    }
};
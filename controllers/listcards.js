var models = require('../models/listcards'),
    md5 = require('MD5');

module.exports = {
    index: function(req, res) {
        models.ListCard.find({}, {},{sort:{idShort:1}},function(err, data) {
            res.json(data);
        });
    },
    add: function(req, res) {
        var newCard = new models.ListCard(req.body);
        newCard.save(function(err, listCard) {
            if (err) {
                res.json({error: '数据库新增有误！'});
            } else {
                res.json(listCard);
            }
        });
    },
    update: function(req, res) {
        console.log(req.body);
        models.ListCard.findByIdAndUpdate(req.body._id, {cards:req.body.cards}, function(err, updated) {
            if (err) {
                res.json({error: '数据库更新有误！'});
            } else {
                res.json({success:'success'});
            }
        })
    },
    delete: function(req, res) {
        models.ListCard.findOneAndRemove(req.body._id, function(err, card) {
            if (err) {
                res.json({error: '数据库删除有误！'});
            } else {
                res.json(200, {status: 'Success'});
            }
        });
    }
};
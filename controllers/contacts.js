var models = require('../models/models'),
    md5 = require('MD5');

module.exports = {
    index: function(req, res) {
        models.Contact.find({}, function(err, data) {
            res.json(data);
        });
    },
    add: function(req, res) {
        var newContact = new models.Contact(req.body);
        newContact.save(function(err, contact) {
            if (err) {
                res.json({error: '数据库新增有误！'});
            } else {
                res.json(contact);
            }
        });
    },
    update: function(req, res) {
        console.log(req.body);
        models.Contact.findByIdAndUpdate(req.body._id, {username:req.body.username,age:req.body.age}, function(err, updated) {
            if (err) {
                res.json({error: '数据库更新有误！'});
            } else {
                res.json(updated);
            }
        })
    },
    delete: function(req, res) {
        models.Contact.findOneAndRemove({username:req.params.username}, function(err, contact) {
            if (err) {
                res.json({error: '数据库删除有误！'});
            } else {
                res.json(200, {status: 'Success'});
            }
        });
    }
};
var contacts = require('../controllers/contacts');

module.exports.initialize = function(app) {
	app.get('/', function(req, res) {
		res.render('board',{name:'wyj',boardName:'first',layout:false})
	});

    app.get('/api/contacts', contacts.index);
    app.post('/api/contacts', contacts.add);
    app.put('/api/contacts/:username', contacts.update);
    app.delete('/api/contacts/:username', contacts.delete);
};
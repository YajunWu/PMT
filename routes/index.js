var contacts = require('../controllers/contacts');
var cards = require('../controllers/cards');
var listcards = require('../controllers/listcards');

module.exports.initialize = function(app) {
	app.get('/', function(req, res) {
		res.render('board',{name:'wyj',boardName:'first',users:{name:'wuyajun',nameShort:'wyj'},layout:false})
	});
	app.get('/cards', cards.index);
    app.post('/cards', cards.add);
    app.get('/listcards', listcards.index);
    app.post('/listcards', listcards.add);
    app.put('/listcards/:id', listcards.update);
    app.get('/api/contacts', contacts.index);
    app.post('/api/contacts', contacts.add);
    app.put('/api/contacts/:username', contacts.update);
    app.delete('/api/contacts/:username', contacts.delete);
};
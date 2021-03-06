const mongoose = require ('mongoose');
const requireLogin = require ('../middleware/requireLogin');
const validUrl = require ('../middleware/validUrl')
const SecretLinks_Model = mongoose.model ('SecretLinks_Model');
const Users_Model = mongoose.model ('Users_Model');

module.exports = (app) => {
	app.post ('/api/secretLinks/generateLink', requireLogin, validUrl, async (req, res, next) => {
		const {origionalUrl, userId, token, goPublic} = req.body;
		let displayName = '', avatar = '', dateCreated = new Date ();
		await Users_Model.findOne ({_id : userId}, (err, user) => {
			console.log ('get user', user.local);
			displayName = user.local.displayName;
			avatar = user.local.avatar;
		});
		const link = new SecretLinks_Model ({
			userId,
			origionalUrl,
			goPublic,
			dateCreated,
			token,
			avatar,
			displayName,
		});
		await link.save ((err) => {
			if (err) {
				console.log ('db err =>', err);
			}
		});
		console.log ('new link saved', link);
		res.json (link);
		next ();
	});

	app.get ('/api/secretLinks/publicLinksList', (req, res) => {
		SecretLinks_Model.find ({goPublic : true}, (err, docs) => {
			res.send (docs);
		});
	});
	app.post ('/api/secretLinks/privateLinksList',requireLogin, (req, res) => {
		SecretLinks_Model.find ({userId : req.user._id}, (err, docs) => {
			res.send (docs);
		});
	});
	app.get ('/l/:token', (req, res) => {
		SecretLinks_Model.findOneAndUpdate ({token : req.params.token}, {$inc : {clickCounter : 1}}, (err, doc) => {
			if (err) {
				console.log (err);
			}
			console.log (doc.origionalUrl);
			res.redirect (doc.origionalUrl);
		});
	});

};

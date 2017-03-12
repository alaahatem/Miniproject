var express = require('express');
var router = express.Router();
var projectController = require('../controllers/projectController/projectController.js');

// Get Homepage
router.get('/', function(req, res){
	res.render('index');
});
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');
});

router.get('/project', projectController.getAllProjects);
router.post('/project', projectController.createProject);
function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;

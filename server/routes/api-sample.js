const express =  require('express');
const router = express.Router();
const mongoose = require('mongoose');
const article = require('../models/article');
					  
const db = "mongodb://<dbuser>:<dbpassword>@ds151355.mlab.com:51355/blogapp";

mongoose.Promise = global.Promise;
mongoose.connect(db, function(err){
	if(err){
		console.log("Error Connecting");
	}
});

router.get('/all', function(req,res){
	
	article.find({})
		.exec(function(err, articles){
			if(err){
				console.log("Error getting the articles");
			}else{
				console.log(articles);
				res.json(articles);
			}
		})
});

router.get('/articles/:id', function(req,res){
	
	article.findById(req.params.id)
		.exec(function(err, article){
			if(err){
				console.log("Error getting the articles");
			}else{
				console.log(article);
				res.json(article);
			}
		})
});

router.post('/create', function(req,res){
	var newArticle = new article();
	newArticle.title = req.body.title;
	newArticle.content = req.body.content;

	newArticle.save(function(err,article){
		if(err){
			console.log("error searching");
		}else{
			res.json(article);
		}
	});
})

module.exports = router;
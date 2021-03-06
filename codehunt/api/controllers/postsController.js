//require models
var Post = require('../models/post');
var User = require('../models/user');

//get all posts
function postsIndex(req, res) {
	Post.find().populate('user').exec(function(err, posts) {
		if (err) return res.status(400).json({message: "Error"});
		res.status(200).json({posts: posts});
	});
}

//show individual post
function showPost(req, res) {
	User.findById({_id: global.currentUser.$__.scope._id}, function(err, user) {
		if (err) return res.status(500).json({message: "Error"});
		if (!user) return res.status(400).json({message: "User does not exist"});

		Post.findById({_id: req.params.postid}, function(err, post) {
			if (err) return res.status(500).json({message: "Error"});
			if (!post) return res.status(400).json({message: "Post does not exist"});

			res.status(200).json({post: post});
		});

	});
}

//create new post
function addPost(req, res) {
	//console.log("currentuser" global.currentUser.$__.scope._id)

	User.findById({_id: global.currentUser.$__.scope._id}, function(err, user) {

		if (err) return res.status(400).json({message: "Error"});

		var post = new Post({
			title: req.body.title,
			description: req.body.description,
			url: req.body.url,
			category: req.body.category,
			language: req.body.language,
			user: user._id
		});

		var prefix = 'http://';
		if (post.url.substr(0, prefix.length) !== prefix)
		{
		    post.url = prefix + post.url;
		}

		user.posts.push(post);

		post.save(function(err) {if (err) return res.status(400).json({message: "Error"})});
		user.save(function(err) {if (err) return res.status(400).json({message: "Error"})});

		res.status(200).json({post: post});
	});
}



//update post
function updatePost(req, res) {

	Post.findById({_id: req.params.postid}).populate('user').exec(function(err, post) {
		if (err) return res.status(500).json({message: "Error"});
		if (!post) return res.status(400).json({message: "Post does not exist"});

		if (req.body.title) post.title = req.body.title;
		if (req.body.description) post.description = req.body.description;
		if (req.body.url) post.url = req.body.url;
		if (req.body.category) post.category = req.body.category;
		if (req.body.language) post.language = req.body.language;

		var prefix = 'http://';
		if (post.url.substr(0, prefix.length) !== prefix)
		{
		    post.url = prefix + post.url;
		} 

		post.save(function(err, updatedPost) {
			if (err) return res.status(500).json({message: "Error"});
			res.status(201).json({post: updatedPost});
		});

	});
}

//delete post
function deletePost(req, res) {
	var postid = req.params.postid;
	console.log(postid);
	//delete post reference from user
	User.findById({_id: global.currentUser.$__.scope._id}).populate('posts').exec(function(err, user) {
		user.posts.remove({_id: postid});
		user.save(function(err) {if (err) return res.status(400).json({message: "Error"})});
	});

	//delete post
	Post.findById({_id: postid}, function(err, post) {
		if (err) return res.status(400).json({message: "Error"});
		
		Post.remove(post, function(err) {
		  if (err) return res.status(500).send(err);
		  res.status(200).json({message: "Post Deleted"});
		});
	});
}

//like post
function likePost(req, res) {
	var userId = global.currentUser.$__.scope._id
	var postId = req.params.postid

	 Post.update({ _id: postId },
	     { $addToSet: {userLikes: userId} }, function(err) {
	         if(err){
	           res.status(400).send("Error");
	         } else {
	         	Post.findById({_id: postId}, function(err, updatedPost) {
	         		if (err) return res.status(400).json({message: "Error"});
	         		res.status(200).json({post: updatedPost});
	         	});
	        }
	 });

}

//unlike post
function dislikePost(req, res) {
 	  var postId = req.params.postid
 	   var userId = global.currentUser.$__.scope._id

 	   Post.update( { _id: postId }, { $pull: { userLikes: userId } }, function(err) {
 	   	if(err){
 	   	  res.status(400).send("Error");
 	   	} else {
 	   		Post.findById({_id: postId}, function(err, updatedPost) {
 	   			if (err) return res.status(400).json({message: "Error"});
 	   			res.status(200).json({post: updatedPost});
 	   		});
 	   }});
}

//show posts for one category
function categoryShow(req, res) {
	Post.find({category: req.params.category}).populate('user').exec(function(err, posts) {
		if (err) return res.status(400).json({message: "Error"});
		res.status(200).json({posts: posts});
	});
}

//show posts for one language
function languageShow(req, res) {
	Post.find({language: req.params.language}).populate('user').exec(function(err, posts) {
		if (err) return res.status(400).json({message: "Error"});
		res.status(200).json({posts: posts});
	});
}

//exports
module.exports = {
	postsIndex: postsIndex,
	addPost: addPost,
	updatePost: updatePost,
	deletePost: deletePost,
	showPost: showPost,
	likePost: likePost,
	dislikePost: dislikePost,
	categoryShow: categoryShow,
	languageShow: languageShow
}
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
	User.findById({_id: req.params.userid}, function(err, user) {
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
	User.findById({_id: req.params.userid}, function(err, user) {
		if (err) return res.status(400).json({message: "Error"});

		var post = new Post({
			title: req.body.title,
			description: req.body.description,
			url: req.body.url,
			user: user._id
		});

		user.posts.push(post);

		post.save(function(err) {if (err) return res.status(400).json({message: "Error"})});
		user.save(function(err) {if (err) return res.status(400).json({message: "Error"})});

		res.status(200).json({post: post});
	});
}

//update post
function updatePost(req, res) {
	Post.findById({_id: req.params.postid}, function(err, post) {
		if (err) return res.status(500).json({message: "Error"});
		if (!post) return res.status(400).json({message: "Post does not exist"});

		if (req.body.title) post.title = req.body.title;
		if (req.body.description) post.description = req.body.description;
		if (req.body.url) post.url = req.body.url;

		post.save(function(err) {
			if (err) return res.status(500).json({message: "Error"});
			res.status(201).json({post: post});
		});
	});
}

//delete post
function deletePost(req, res) {
	var userid = req.params.userid;
	var postid = req.params.postid;

	//delete post reference from user
	User.findById({_id: userid}).populate('posts').exec(function(err, user) {
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
 
//exports
module.exports = {
	postsIndex: postsIndex,
	addPost: addPost,
	updatePost: updatePost,
	deletePost: deletePost,
	showPost: showPost
}
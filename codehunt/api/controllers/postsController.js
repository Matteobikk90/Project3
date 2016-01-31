var Post   = require('../models/post');

function postsIndex(req, res) {
  Post.find(function(err, posts){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ posts: posts });
  });
}

function postsShow(req, res){
  Post.findById(req.params.id, function(err, post){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ post: post });
  });
}

function postsUpdate(req, res){
  Post.findById(req.params.id,  function(err, post) {
    if (err) return res.status(500).json({message: "Something went wrong!"});
    if (!post) return res.status(404).json({message: 'No post found.'});

    if (req.body.email) user.local.email = req.body.name;
    if (req.body.password) user.local.password = req.body.password;

    post.save(function(err) {
     if (err) return res.status(500).json({message: "Something went wrong!"});

      res.status(201).json({message: 'Post successfully updated.', post: post});
    });
  });
}

function postsDelete(req, res){
  Post.findByIdAndRemove({_id: req.params.id}, function(err){
   if (err) return res.status(404).json({message: 'Something went wrong.'});
   res.status(200).json({message: 'Post has been successfully deleted'});
  });
}

module.exports = {
  postsIndex:  postsIndex,
  postsShow:   postsShow,
  postsUpdate: postsUpdate,
  postsDelete: postsDelete
}
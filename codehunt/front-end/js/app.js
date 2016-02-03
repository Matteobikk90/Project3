$(init);

function init(){
 $("form").on("submit", submitForm);
 $(".logout-link").on("click", logout); 
 $(".login-link").on("click", signin);
 $(".register-link").on("click", signup);
 $("body").on("click", ".delete", removeItem);
 $('body').on('click', '.edit', editPost);
 $('body').on('click', '.profile', setProfile);
 $('#user-form-button').on('click', newPost);
 $("body").on("click", ".likePost", likePost);
 $("body").on("click", ".dislikePost", dislikePost);
 $('body').on('cancel', hideForm());

 hideErrors();
 checkLoginState();
}

function hideForm() {
  $("section").hide();
  $("#posts").show();
}

function checkLoginState(){
 if (getToken()) {
   return loggedInState();
 } else {
   return loggedOutState();
 }
}

function signin() {
  event.preventDefault();
  $("section").hide();
  $('#signinsection').fadeToggle();
  $('#signupsection').fadeOut();
}

function signup() {
  event.preventDefault();
  $("section").hide();
  $('#signupsection').fadeToggle();
  $('#signinsection').fadeOut();
}

function newPost() {
  clearForms();
  $('#new-post').slideToggle();
  $('#edit-post').slideUp();
}

function submitForm(){
 event.preventDefault();
 
 var method = $(this).attr("method");
 var url    = "http://localhost:3000" + $(this).attr("action");
 var data   = $(this).serialize();
 
 return ajaxRequest(method, url, data, authenticationSuccessful);
}

// REMOVE item - post or user
function removeItem(){
  event.preventDefault();
  var itemToRemove = $(this).parent();
  $.ajax({
    url:'http://localhost:3000/'+$(this).data().id,
    type:'delete',
    beforeSend: setRequestHeader
  }).done(function() {
    itemToRemove.remove();
  });
}

// SET userID in local storage to be the id of the user whose profile you want to see
function setProfile(post){
  console.log($(this).data("id"))
  console.log("setProfile")
  localStorage.setItem("userID", $(this).data("id"))
};

// EDIT post
function editPost(){
  $.ajax({
    type: 'get',
    url: 'http://localhost:3000/'+$(this).data().id,
    beforeSend: setRequestHeader
  }).done(function(post){
    $("#edit-title").val(post.post.title),
    $("#edit-description").val(post.post.description),
    $("#edit-url").val(post.post.url),
    $("#edit-category").val(post.post.category),
    $("#edit-language").val(post.post.language),
    $('#edit-post').slideDown(),
    $('#new-post').slideUp()
  });
  $('.edit-post').on('submit', updatePost.bind(this));
}

var updatePost = function(){
  event.preventDefault();
  var postDiv = $(this).parent().parent()
  var post = {
    post:{
      title: $("#edit-title").val(),
      description: $("#edit-description").val(),
      url: $("#edit-url").val(),
      category: $("#edit-category").val(),
      language: $("#edit-language").val()
    }
  };
  $.ajax({
    type: 'patch',
    url: 'http://localhost:3000/'+$(this).data().id,
    data: post.post,
    beforeSend: setRequestHeader
  }).done(function(post){
    postDiv.empty();
    postDiv.prepend("<div class='col-md-10 mainPostDiv'><h5>" + post.post.category + "</h5><h5>" + post.post.language + "</h5>" + "<h2><a href='//" + encodeURI(post.post.url) + "'>" + post.post.title + "</a></h2><p>" + post.post.description + "</p>" + "</div><div class='col-md-2 subPostDiv'><a data-id='"+post.post._id+"' class='delete' href='#'>Delete</a> | <a href='#' class='edit' data-id='"+post._id+"'>Edit</a><br>" + "<a href='/profile.html'>" + post.post.user.local.username + "</a>" + "</div>");
    $('#edit-post').slideUp();
  });
}

function posts(){
 event.preventDefault();
 return getPosts();
}

function logout(){
 event.preventDefault();
 removeToken();
 return loggedOutState();
}

function getPosts(){
 return ajaxRequest("get", "http://localhost:3000", null, displayPosts)
}

function displayPosts(data){
 hideErrors();
 hidePosts();
 console.log(data)
 return $.each(data.posts, function(index, post) {

  console.log(post);

   var n=Date.now();
   var d=new Date(Date.now())
   var c=new Date(post.created_at)
   
   var i = (d-c)/24/60/60/1000

   var uri = ". Check this out: " + post.title + ". url:" + post.url
   var text = encodeURI(uri)

   if (i<7) {
    $(".weekposts").prepend("<div class='post-tile'><div class='row'><div class='col-md-10 mainPostDiv'><h5>" + post.category + "</h5><h5>" + post.language + "</h5>" + "<h2><a href='//" + encodeURI(post.url) + "' target='_blank'>" + post.title + "</a></h2><p>" + post.description + "</p>" + "</div><div class='col-md-2 subPostDiv'><a data-id='"+post._id+"' class='delete' href='#'>Delete</a> | <a href='#' class='edit' data-id='"+post._id+"'>Edit</a><br><a class='likePost' id='" + post._id + "likeButton' href='#'data-id='"+post._id+"'>Like</a> <a class='dislikePost' href='#' id='" + post._id + "dislikeButton' data-id='"+post._id+"'>Dislike</a><br>" + "<a class='profile' data-id='" + post.user._id + "' href='/profile.html'>" + post.user.local.username + "</a><br><a href='https://twitter.com/intent/tweet?via=CodeHunt" + text + "'>Tweet this page with a Pop-Up</a><p id='" + post._id + "likeCount'>" +  post.userLikes.length +  "</p></div></div></div>");
   } 
   else if (i>28) {
    $(".earlierposts").prepend("<div class='post-tile'><div class='row'><div class='col-md-10 mainPostDiv'><h5>" + post.category + "</h5><h5>" + post.language + "</h5>" + "<h2><a href='//" + encodeURI(post.url) + "' target='_blank'>" + post.title + "</a></h2><p>" + post.description + "</p>" + "</div><div class='col-md-2 subPostDiv'><a data-id='"+post._id+"' class='delete' href='#'>Delete</a> | <a href='#' class='edit' data-id='"+post._id+"'>Edit</a><br><a class='likePost' href='#' id='" + post._id + "likeButton' data-id='"+post._id+"'>Like</a> <a class='dislikePost' id='" + post._id + "dislikeButton' href='#' data-id='"+post._id+"'>Dislike</a><br>" + "<a class='profile' data-id='" + post.user._id + "' href='/profile.html'>" + post.user.local.username + "</a><br><a href='https://twitter.com/intent/tweet?via=CodeHunt" + text + "'>Tweet this page with a Pop-Up</a><p id='" + post._id + "likeCount'>" + post.userLikes.length +  "</p></div></div></div>");

   } else {
    $(".monthposts").prepend("<div class='post-tile'><div class='row'><div class='col-md-10 mainPostDiv'><h5>" + post.category + "</h5><h5>" + post.language + "</h5>" + "<h2><a href='//" + encodeURI(post.url) + "' target='_blank'>" + post.title + "</a></h2><p>" + post.description + "</p>" + "</div><div class='col-md-2 subPostDiv'><a data-id='"+post._id+"' class='delete' href='#'>Delete</a> | <a href='#' class='edit' data-id='"+post._id+"'>Edit</a><br><a class='likePost' href='#' id='" + post._id + "likeButton' data-id='"+post._id+"'>Like</a> <a class='dislikePost' href='#' id='" + post._id + "dislikeButton' data-id='"+post._id+"'>Dislike</a><br>" + "<a class='profile' data-id='" + post.user._id + "' href='/profile.html'>" + post.user.local.username + "</a><br><a href='https://twitter.com/intent/tweet?via=CodeHunt" + text + "'>Tweet this page with a Pop-Up</a><p id='" + post._id + "likeCount'>" + post.userLikes.length +  "</p></div></div></div>");}
 })
};

function likePost() {
  var id = $(this).data().id;
 $.ajax({
   url:'http://localhost:3000/'+$(this).data().id+"/like",
   type:'get',
   beforeSend: setRequestHeader
 }).done(function(post) {
   $("#" + id + "likeCount").empty();
   $("#" + id + "likeCount").html(post.post.userLikes.length);
   $("#" + id + "dislikeButton").show();
   $("#" + id + "likeButton").hide();
 });
}

function dislikePost() {
  var id = $(this).data().id;
 $.ajax({
   url:'http://localhost:3000/'+$(this).data().id+"/dislike",
   type:'get',
   beforeSend: setRequestHeader
 }).done(function(post) {
   $("#" + id + "likeCount").empty()
   $("#" + id + "likeCount").html(post.post.userLikes.length); 
   $("#" + id + "dislikeButton").hide();
   $("#" + id + "likeButton").show();
 });
}

function clearForms() {
  $('form').trigger('reset');
}

function hidePosts(){
 return $(".posts").empty();
}

function hideErrors(){
 return $(".alert").removeClass("show").addClass("hide");
}

function displayErrors(data){
 return $(".alert").text(data).removeClass("hide").addClass("show");
}

function loggedInState(){
 $("section, .logged-out").hide();
 $("#posts, #user-form-button, #new-post, .logged-in, .profileDropDown").show();
 $('#new-post').hide();
 hideErrors();
 return getPosts();
}

function loggedOutState(){
 $("section, .logged-in").hide();
 $("#posts, #signup, #signin, .logged-out").show();
 $('#new-post, #user-form-button, .profileDropDown').hide();
 return getPosts();
}

function authenticationSuccessful(data) {
 if (data.token) setToken(data);
 return checkLoginState();
}

function setToken(data) {
  localStorage.setItem("userID", data.user._id )
  localStorage.setItem("token", data.token)
}

function getToken() {
 return localStorage.getItem("token");
}

function removeToken() {
 return localStorage.clear();
}

function setRequestHeader(xhr, settings) {
 var token = getToken();
 if (token) return xhr.setRequestHeader('Authorization','Bearer ' + token);
}

function ajaxRequest(method, url, data, callback) {
 return $.ajax({
   method: method,
   url: url,
   data: data,
   beforeSend: setRequestHeader,
 }).done(function(data){
   if (callback) return callback(data);
 }).fail(function(data) {
   displayErrors(data.responseJSON.message);
 });
}
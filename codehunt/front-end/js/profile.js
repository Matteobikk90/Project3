$(init);

function init(){
 $("form").on("submit", submitForm);
 $(".logout-link").on("click", logout); 
 $(".login-link").on("click", signin);
 $(".register-link").on("click", signup);
 $("body").on("click", ".delete", removeItem);
 $('body').on('click', '.editUser', editUser);
 $('.edit-user').on('cancel', hideForm());
 // $('body').on('click', '.editPost', editPost);
 // $('#user-form-button').on('click', newPost);
 $("body").on("click", ".likePost", likePost);
 $("body").on("click", ".dislikePost", dislikePost);
 getName();
 hideErrors();
 checkLoginState(); 
}

function hideForm() {
  $("section").hide();
  $("#posts").show();
}

function getName(){
	var url = "http://localhost:3000/profile/" + localStorage.getItem("userID")
 return ajaxRequest("get", url, null, displayUser)
}

function displayUser(data){
  $("#newTitle").prepend("<div class='user-tile'><div class='row'><div class='col-md-12'><img src='" + data.user.image + "' height='200'>" + "<h2>" + data.user.local.firstName + " " + data.user.local.lastName + "</h2><h4>" + data.user.local.username  + "</h4><p>" + data.user.bio + "</p>" + "<a data-id='"+data.user._id+"' class='delete' href='#'>Delete</a> | <a href='#' class='editUser' data-id='"+data.user._id+"'>Edit</a><br>" + "</div></div>"); 
 };

function checkLoginState(){
 if (getToken()) {
   return loggedInState();
 } else {
   return loggedOutState();
 }
}

function signin() {
  event.preventDefault();
  $('#signinsection').slideToggle();
  $('#signupsection').slideUp();
}

function signup() {
  event.preventDefault();
  $('#signupsection').slideToggle();
  $('#signinsection').slideUp();
}

function newPost() {
  $('#new-post').slideDown();
  $('#edit-post').slideUp();
}

function submitForm(){
 event.preventDefault();

 var method = $(this).attr("method");
 var url    = "http://localhost:3000/profile/" + localStorage.getItem("userID") ;
 var data   = $(this).serialize();

 console.log(method);
 console.log(url);
 console.log(data);

 return ajaxRequest(method, url, data, authenticationSuccessful);
}

// REMOVE item - post or user
function removeItem(){
  event.preventDefault();
  var itemToRemove = $(this).parent();
  $.ajax({
    url:'http://localhost:3000/profile/'+$(this).data().id,
    type:'delete',
    beforeSend: setRequestHeader
  }).done(function() {
    itemToRemove.remove();
  });
}

// EDIT user
function editUser(){

  $("section, #profileDiv").hide();
  $('#edit-user').fadeToggle();

  $.ajax({
    type: 'get',
    url: 'http://localhost:3000/profile/' + localStorage.getItem("userID"),
    beforeSend: setRequestHeader
  }).done(function(user){
    console.log(user.user.local)
    $("input#edit-username").val(user.user.local.username),
    $("input#edit-firstName").val(user.user.local.firstName),
    $("input#edit-lastName").val(user.user.local.lastName),
    $("input#edit-email").val(user.user.local.email),
    $("input#edit-password").val(user.user.local.password),
    $("input#edit-image").val(user.user.image),
    $("input#edit-bio").val(user.user.bio),
    $('#edit-user').slideDown()
    // $('form#edit-post').slideDown()
  });
  // Bind the clicked element to our updateUser function so that the updateUser function knows what "this" refers to when the updateUser function runs
  $('.edit-user').on('submit', updateUser.bind(this));
}

var updateUser = function(){
  event.preventDefault();
  console.log(this)
  // Get the parent element of the clicked edit anchor tag
  var userDiv = $(this).parent()
  console.log(userDiv);
  var user = {
    //is this correct????
    user:{
    local:{
      username: $("input#edit-username").val(),
      firstName: $("input#edit-firstName").val(),
      lastName: $("input#edit-lastName").val(),
      email: $("input#edit-email").val(),
      password: $("input#edit-password").val()
      },
      image: $("input#edit-image").val(),
      bio: $("input#edit-bio").val()
    
  }
  };
  $.ajax({
    type: 'patch',
    url: 'http://localhost:3000/profile/'+localStorage.getItem("userID"),
    data: user.user,
    beforeSend: setRequestHeader
  }).done(function(data){
    // Empty the specific user div and rewrite the html with the updated user that gets returned from our server
    userDiv.empty();
    console.log(user);
    userDiv.prepend("<div class='user-tile'><div class='row'><div class='col-md-12'><img src='" + data.user.image + "' height='200'>" + "<h2>" + data.user.local.firstName + " " + data.user.local.lastName + "</h2><h4>" + data.user.local.username  + "</h4><p>" + data.user.bio + "</p>" + "<a data-id='"+data.user._id+"' class='delete' href='#'>Delete</a> | <a href='#' class='editUser' data-id='"+data.user._id+"'>Edit</a><br>" + "</div></div>"); 
    $("#profileDiv").show();
    $('#edit-user').fadeOut();
  });
}

/////////////////////////////////////////////////////////

function loggedInState(){
 $("section, .logged-out").hide();
 $("#posts, .logged-in").show();
 return getPosts();
}

function loggedOutState(){
 $("section, .logged-in").hide();
 $("#signup, #signin, .logged-out").show();
 return hidePosts();
}

function logout(){
 event.preventDefault();
 removeToken();
 return loggedOutState();
}

function getPosts(){
	var url = "http://localhost:3000/profile/" + localStorage.getItem("userID")
	// console.log(url)
 return ajaxRequest("get", url, null, displayUserPosts)
}

function displayUserPosts(data){
  console.log(data)
  console.log('hello displayuserposts')
 hideErrors();
 hidePosts();
 return $.each(data.user.posts, function(index, post) {
   // $(".posts").prepend("<div class='post-tile'><h2>" + post.title + "</h2><p> " + post.description + "</p>"+ post.url + "| <br><a data-id='"+post._id+"' class='delete' href='#'>Delete</a> | <a href='#' class='edit' data-id='"+post._id+"'>Edit</a></div>"); 
   var n=Date.now();
   var d=new Date(Date.now())
   var c=new Date(post.created_at)
   /////////////////////////////////////////////////
   // TAKE OFF THE *10 FOR THE DATE TO BE CORRECT //
   /////////////////////////////////////////////////   
   var i = (d-c)/24/60/60/1000*10
   console.log(i)
   var uri = ". Check this out: " + post.title + ". url:" + post.url
   var text = encodeURI(uri)
   console.log(text)

   if (i<7) {
    $(".weekposts").prepend("<div class='post-tile'><div class='row'><div class='col-md-10 mainPostDiv'><h5>" + post.category + "</h5><h5>" + post.language + "</h5>" + "<h2><a href='//" + post.url + "'>" + post.title + "</a></h2><p>" + post.description + "</p>" + "</div><div class='col-md-2 subPostDiv'><br><br><a href='https://twitter.com/intent/tweet?via=CodeHunt" + text + "'>Tweet this page with a Pop-Up</a><p id='" + post._id + "likeCount'>" +  post.userLikes.length +  "</p></div></div></div>");

    // PUT THE CORRENT HREF IN
   } 
   else if (i>28) {
    $(".earlierposts").prepend("<div class='post-tile'><div class='row'><div class='col-md-10 mainPostDiv'><h5>" + post.category + "</h5><h5>" + post.language + "</h5>" + "<h2><a href='//" + post.url + "'>" + post.title + "</a></h2><p>" + post.description + "</p>" + "</div><div class='col-md-2 subPostDiv'><br><br><a href='https://twitter.com/intent/tweet?via=CodeHunt" + text + "'>Tweet this page with a Pop-Up</a><p id='" + post._id + "likeCount'>" +  post.userLikes.length +  "</p></div></div></div>");

   } else {
    $(".monthposts").prepend("<div class='post-tile'><div class='row'><div class='col-md-10 mainPostDiv'><h5>" + post.category + "</h5><h5>" + post.language + "</h5>" + "<h2><a href='//" + post.url + "'>" + post.title + "</a></h2><p>" + post.description + "</p>" + "</div><div class='col-md-2 subPostDiv'><a data-id='"+post._id+"' class='delete' href='#'>Delete</a> | <a href='#' class='edit' data-id='"+post._id+"'>Edit</a><br><a class='likePost' href='#' id='" + post._id + "likeButton' data-id='"+post._id+"'>Like</a> <a class='dislikePost' href='#' id='" + post._id + "dislikeButton' data-id='"+post._id+"'>Dislike</a><br><br><a href='https://twitter.com/intent/tweet?via=CodeHunt" + text + "'>Tweet this page with a Pop-Up</a><p id='" + post._id + "likeCount'>" + post.userLikes.length +  "</p></div></div></div>");
   } 
 });
}

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
  console.log(id)
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

function hidePosts(){
 return $(".posts").empty();
}

function hideErrors(){
 return $(".alert").removeClass("show").addClass("hide");
}

function authenticationSuccessful(data) {
 if (data.token) setToken(data);
 return checkLoginState();
}

function setToken(data) {
  debugger;
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
 // console.log(token)
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
 	// console.log(token)
   displayErrors(data.responseJSON.message);
 });
}
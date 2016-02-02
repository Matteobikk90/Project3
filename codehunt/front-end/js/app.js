$(init);

function init(){
 $("form").on("submit", submitForm);
 $(".logout-link").on("click", logout); 
 $(".login-link").on("click", signin);
 $(".register-link").on("click", signup);
 $("body").on("click", ".delete", removeItem);
 $('body').on('click', '.edit', editPost);
 $('#user-form-button').on('click', newPost);
 hideErrors();
 checkLoginState();  
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
  $('#new-post').slideToggle();
  $('#edit-post').slideUp();
}

function submitForm(){
 event.preventDefault();
 $("form").trigger("reset");

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

// EDIT post
function editPost(){
  $.ajax({
    type: 'get',
    url: 'http://localhost:3000/'+$(this).data().id,
    beforeSend: setRequestHeader
  }).done(function(post){
    console.log(post)
    $("#edit-title").val(post.post.title),
    $("#edit-description").val(post.post.description),
    $("#edit-url").val(post.post.url),
    $("#edit-category").val(post.post.category),
    $("#edit-language").val(post.post.language),
    $('#edit-post').slideDown(),
    $('#new-post').slideUp()
  });
  // Bind the clicked element to our updateUser function so that the updateUser function knows what "this" refers to when the updateUser function runs
  $('.edit-post').on('submit', updatePost.bind(this));
}

var updatePost = function(){
  event.preventDefault();
  // Get the parent element of the clicked edit anchor tag
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
    // Empty the specific user div and rewrite the html with the updated user that gets returned from our server
    postDiv.empty();
    postDiv.prepend("<div class='col-md-10 mainPostDiv'><h5>" + post.post.category + "</h5><h5>" + post.post.language + "</h5>" + "<h2><a href='//" + post.post.url + "'>" + post.post.title + "</a></h2><p>" + post.post.description + "</p>" + "</div><div class='col-md-2 subPostDiv'><a data-id='"+post.post._id+"' class='delete' href='#'>Delete</a> | <a href='#' class='edit' data-id='"+post._id+"'>Edit</a><br>" + "<a href='/profile.html'>" + post.post.user.local.username + "</a>" + "</div>");
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
   $(".posts").prepend("<div class='post-tile'><div class='row'><div class='col-md-10 mainPostDiv'><h5>" + post.category + "</h5><h5>" + post.language + "</h5>" + "<h2><a href='//" + post.url + "'>" + post.title + "</a></h2><p>" + post.description + "</p>" + "</div><div class='col-md-2 subPostDiv'><a data-id='"+post._id+"' class='delete' href='#'>Delete</a> | <a href='#' class='edit' data-id='"+post._id+"'>Edit</a><br>" + "<a href='/profile.html'>" + post.user.local.username + "</a>" + "</div></div></div>");
   console.log(post);
 });
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
  console.log('loggedOutState')
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
  // debugger;
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
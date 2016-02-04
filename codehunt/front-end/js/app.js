$(init);

function init(){
 $("form").on("submit", submitForm);
 $(".logout-link").on("click", logout); 
 $(".login-link").on("click", signin);
 $(".register-link").on("click", signup);
 $("body").on("click", ".delete", removeItem);
 $('body').on('click', '.edit', editPost);
 $('body').on('click', '.profile', setProfile);
 $('body').on('click', '.category', setCategory);
 $('body').on('click', '.language', setLanguage);
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
  var itemToRemove = $(this).parent().parent().parent();
  var urldata = $(this).data().id;

  swal({   title: "Are you sure you want to delete this post?",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "Delete",   cancelButtonText: "Cancel",   closeOnConfirm: true,   closeOnCancel: true }, function(isConfirm){   if (isConfirm) {     
    
    $.ajax({
      url:'http://localhost:3000/'+urldata,
      type:'delete',
      beforeSend: setRequestHeader
    }).done(function() {
      itemToRemove.remove();
    });  

  }})   

}

// SET userID in local storage to be the id of the user whose profile you want to see
function setProfile(post){
  console.log($(this).data("id"))
  console.log("setProfile")
  localStorage.setItem("userID", $(this).data("id"))
};

function setCategory(post){
  localStorage.setItem("category", $(this).data("id"))
};

function setLanguage(post){
  localStorage.setItem("language", $(this).data("id"))
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
  var postDiv = $(this).parent().parent();
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

    var uri = ". Check this out: " + post.post.title + ". url:" + post.post.url
    var text = encodeURI(uri)

    postDiv.prepend("<div class='row'><div class='col-md-10 mainPostDiv'><h5><a class='category' data-id='" + post.post.category + "' href='/category.html'>" + post.post.category + "</a></h5> <h5><a class='language' data-id='" + post.post.language + "' href='/language.html'>" + post.post.language + "</a><h5>" + "<h2><a href='//" + encodeURI(post.post.url) + "' target='_blank'>" + post.post.title + "</a></h2><p>" + post.post.description + "</p>" + "</div><div class='col-md-2 subPostDiv'><a data-id='"+post.post._id+"' id='" + post.post._id + "deleteToggle' class='delete' href='#'>Delete</a> <a href='#' class='edit' id='" + post.post._id + "editToggle' data-id='"+post.post._id+"'>Edit</a><br><a class='likePost' id='" + post.post._id + "likeButton' href='#'data-id='"+post.post._id+"'>Like</a> <a class='dislikePost' href='#' id='" + post.post._id + "dislikeButton' data-id='"+post.post._id+"'>Dislike</a><br><a href='https://twitter.com/intent/tweet?via=CodeHunt" + text + "'>Tweet this page with a Pop-Up</a>" + "<a class='profile' data-id='" + post.post.user._id + "' href='/profile.html'>" + post.post.user.local.username + "</a><br><p id='" + post.post._id + "likeCount'>" +  post.post.userLikes.length +  "</p></div></div>");
    togglePostButtons(post.post);
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

function togglePostButtons(post) {
  if (localStorage.getItem('loggedInUserID') == post.user._id) {
    //get ids
    var id = post._id;
    $("#" + id + "deleteToggle").show();
    $("#" + id + "editToggle").show();
    // $('.likePost, .dislikePost').show();
  } else if (localStorage.getItem('loggedInUserID')) {
    $('.edit, .delete').hide()
    // $('.likePost, .dislikePost').show();
  } else {
    $('.delete, .edit, .likePost, .dislikePost').hide();
  }
}

function toggleLike(post) {
    // console.log(post.userLikes)
    // console.log(localStorage.getItem('loggedInUserID')) 
    var a = post.userLikes
    var id = post._id;

    if (post.userLikes.length == 0) {
      $("#" + id + "dislikeButton").hide();
      $("#" + id + "likeButton").show();
    } else {
    a.forEach(function(user) {
        console.log(user);
        if (user == localStorage.getItem('loggedInUserID')) {
          console.log('liked this post')
          $("#" + id + "dislikeButton").show();
          $("#" + id + "likeButton").hide();
        } else {
          console.log('user hasnt liked this post')
          $("#" + id + "dislikeButton").hide();
          $("#" + id + "likeButton").show();
        }
    });
  }
}

function displayPosts(data){
 hideErrors();
 hidePosts();
 console.log(data)
 return $.each(data.posts, function(index, post) {


   var n=Date.now();
   var d=new Date(Date.now())
   var c=new Date(post.created_at)
   
   var i = (d-c)/24/60/60/1000
   var uri = post.title + " - " + post.url + " via @Codehunt - codehunt.com "  
   var text = encodeURI(uri)

   if (i<7) {
    $(".weekposts").prepend("<div class='post-tile'><div class='row'><div class='col-md-10 mainPostDiv'><h5><a class='category' data-id='" + post.category + "' href='/category.html'>" + post.category + "</a></h5> <h5><a class='language' data-id='" + post.language + "' href='/language.html'>" + post.language + "</a></h5>" + "<h2><a href='//" + encodeURI(post.url) + "' target='_blank'>" + post.title + "</a></h2><p>" + post.description + "</p>" + "</div><div class='col-md-2 subPostDiv'><a data-id='"+post._id+"' id='" + post._id + "deleteToggle' class='delete' href='#'>Delete</a> <a href='#' class='edit' id='" + post._id + "editToggle' data-id='"+post._id+"'>Edit</a><br><a class='likePost' id='" + post._id + "likeButton' href='#'data-id='"+post._id+"'>Like</a> <a class='dislikePost' href='#' id='" + post._id + "dislikeButton' data-id='"+post._id+"'>Dislike</a><br><a class='profile' data-id='" + post.user._id + "' href='/profile.html'>" + post.user.local.username + "</a><br><a href='https://twitter.com/intent/tweet?text=" + text + "'>Tweet this post</a>" + "<p id='" + post._id + "likeCount'>" +  post.userLikes.length +  "</p></div></div></div>");
    togglePostButtons(post);
    toggleLike(post);
   } 
   else if (i>28) {
    $(".earlierposts").prepend("<div class='post-tile'><div class='row'><div class='col-md-10 mainPostDiv'><h5><a class='category' data-id='" + post.category + "' href='/category.html'>" + post.category + "</a></h5> <h5><a class='language' data-id='" + post.language + "' href='/language.html'>" + post.language + "</a></h5>" + "<h2><a href='//" + encodeURI(post.url) + "' target='_blank'>" + post.title + "</a></h2><p>" + post.description + "</p>" + "</div><div class='col-md-2 subPostDiv'><a data-id='"+post._id+"' id='" + post._id + "deleteToggle' class='delete' href='#'>Delete</a> <a href='#' class='edit' id='" + post._id + "editToggle' data-id='"+post._id+"'>Edit</a><br><a class='likePost' href='#' id='" + post._id + "likeButton' data-id='"+post._id+"'>Like</a> <a class='dislikePost' id='" + post._id + "dislikeButton' href='#' data-id='"+post._id+"'>Dislike</a><br><a class='profile' data-id='" + post.user._id + "' href='/profile.html'>" + post.user.local.username + "</a><br><a href='https://twitter.com/intent/tweet?text=" + text + "'>Tweet this post</a>" + "<p id='" + post._id + "likeCount'>" + post.userLikes.length +  "</p></div></div></div>");
    togglePostButtons(post);
    toggleLike(post);
   } else {
    $(".monthposts").prepend("<div class='post-tile'><div class='row'><div class='col-md-10 mainPostDiv'><h5><a class='category' data-id='" + post.category + "' href='/category.html'>" + post.category + "</a></h5> <h5><a class='language' data-id='" + post.language + "' href='/language.html'>" + post.language + "</a></h5>" + "<h2><a href='//" + encodeURI(post.url) + "' target='_blank'>" + post.title + "</a></h2><p>" + post.description + "</p>" + "</div><div class='col-md-2 subPostDiv'><a data-id='"+post._id+"' id='" + post._id + "deleteToggle' class='delete' href='#'>Delete</a> <a href='#' class='edit' id='" + post._id + "editToggle' data-id='"+post._id+"'>Edit</a><br><a class='likePost' href='#' id='" + post._id + "likeButton' data-id='"+post._id+"'>Like</a> <a class='dislikePost' href='#' id='" + post._id + "dislikeButton' data-id='"+post._id+"'>Dislike</a><br>" + "<a class='profile' data-id='" + post.user._id + "' href='/profile.html'>" + post.user.local.username + "</a><br><p id='" + post._id + "likeCount'><a href='https://twitter.com/intent/tweet?text=" + text + "'>Tweet this post</a>" + post.userLikes.length +  "</p></div></div></div>");
    togglePostButtons(post);
    toggleLike(post);
  }
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
  localStorage.setItem("loggedInUserID", data.user._id)
  // // localStorage.setItem("category", data.post.category )
  // localStorage.setItem("language", data.post.language )
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
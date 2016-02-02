

$(init);


function init(){
 $("form").on("submit", submitForm);
 $(".logout-link").on("click", logout);
 // $(".login-link, .register-link, .users-link").on("click", showPage);
 $("body").on("click", ".delete", removeItem);
 $('body').on('click', '.edit', editUser);
 // console.log("hello")
 console.log(localStorage.getItem("userID"));
 getName();
 // hideErrors();
 checkLoginState();  
}


function getName(){
	var url = "http://localhost:3000/profile/" + localStorage.getItem("userID")
	console.log(url)
 return ajaxRequest("get", url, null, displayUserName)
}

function displayUserName(data){
	// console.log(data)
	// console.log(data.user.local.firstName)
   $("#newTitle").prepend(data.user.local.firstName + "'s CodeHunt <br>Last name: " + data.user.local.lastName + "<br>username: " + data.user.local.username + "<br>email: " + data.user.local.email + "<br>bio: " + data.user.bio + "<br>image: " + data.user.image + "<br><a data-id='"+ data.user._id+"' class='delete' href='#'>Delete</a> | <a href='#' class='edit' data-id='"+data.user._id+"'>Edit</a>"); 
 };


function checkLoginState(){
 if (getToken()) {
   return loggedInState();
 } else {
   return loggedOutState();
 }
}

function loggedInState(){
 $("section, .logged-out").hide();
 $("#posts, #new-post, .logged-in").show();
 return getPosts();
}

function loggedOutState(){
 $("section, .logged-in").hide();
 $("#signup, #signin, .logged-out").show();
 return hidePosts();
}

function hideErrors(){
 return $(".alert").removeClass("show").addClass("hide");
}

function hidePosts(){
 return $(".posts").empty();
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
  // 
}

///////////////////////////////////////////////////////////////
// EDIT post
function editUser(){
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
  console.log(this)
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
  console.log(user)
  // console.log(this)
  $.ajax({
    type: 'patch',
    url: 'http://localhost:3000/profile/'+localStorage.getItem("userID"),
    data: user.user,
    beforeSend: setRequestHeader
  }).done(function(user){
    // Empty the specific user div and rewrite the html with the updated user that gets returned from our server
    userDiv.empty();
    console.log(user);
    userDiv.prepend(user.user.local.firstName + "'s CodeHunt <br>Last name: " + user.user.local.lastName + "<br>username: " + user.user.local.username + "<br>email: " + user.user.local.email + "<br>bio: " + user.user.bio + "<br>image: " + user.user.image + "<br><a data-id='"+ user.user._id+"' class='delete' href='#'>Delete</a> | <a href='#' class='edit' data-id='"+user.user._id+"'>Edit</a>"); 
  });
}




/////////////////////////////////////////////////////////

function getPosts(){
	var url = "http://localhost:3000/profile/" + localStorage.getItem("userID")
	// console.log(url)
 return ajaxRequest("get", url, null, displayUserPosts)
}


function displayUserPosts(data){
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

   if (i<7) {
    $(".weekposts").prepend("<div class='post-tile'><h2><a href='" + post.url + "'>" + post.title + "</a></h2><p>" + post.description + "</p>" + "<p>" + post.category + "</p>" + "<p>" + post.language + "</p>" + "<br><a data-id='"+post._id+"' class='delete' href='#'>Delete</a> | <a href='#' class='edit' data-id='"+post._id+"'>Edit</a><br></div>");
   } 
   else if (i>28) {
    $(".earlierposts").prepend("<div class='post-tile'><h2><a href='" + post.url + "'>" + post.title + "</a></h2><p>" + post.description + "</p>" + "<p>" + post.category + "</p>" + "<p>" + post.language + "</p>" + "<br><a data-id='"+post._id+"' class='delete' href='#'>Delete</a> | <a href='#' class='edit' data-id='"+post._id+"'>Edit</a></div>");
   } else {
    $(".monthposts").prepend("<div class='post-tile'><h2><a href='" + post.url + "'>" + post.title + "</a></h2><p>" + post.description + "</p>" + "<p>" + post.category + "</p>" + "<p>" + post.language + "</p>" + "<br><a data-id='"+post._id+"' class='delete' href='#'>Delete</a> | <a href='#' class='edit' data-id='"+post._id+"'>Edit</a></div>");
   }
 });
}


function displayPosts(data){
 hideErrors();
 hidePosts();
 return $.each(data.posts, function(index, post) {
   $(".posts").prepend("<div class='post-tile'><h2>" + post.title + "</h2><p> " + post.description + "</p>"+ post.url + "| <br><a data-id='"+post._id+"' class='delete' href='#'>Delete</a> | <a href='#' class='edit' data-id='"+post._id+"'>Edit</a><br><a href='profile.html/" + post.user._id + "'>" + post.user.local.username + "</a></div>");
   console.log(post);
 });
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

function setRequestHeader(xhr, settings) {
 var token = getToken();
 // console.log(token)
 if (token) return xhr.setRequestHeader('Authorization','Bearer ' + token);
}


function logout(){
 event.preventDefault();
 // removeToken();
 return loggedOutState();
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


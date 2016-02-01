
$(init);

function init(){
 $("form").on("submit", submitForm);
 $(".logout-link").on("click", logout);
 $(".login-link, .register-link, .users-link").on("click", showPage);
 $("body").on("click", ".delete", removeItem);
 $('body').on('click', '.edit', editPost);
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

function showPage() {
 event.preventDefault();
 var linkClass = $(this).attr("class").split("-")[0]
 // $("section").hide();
 hideErrors();
 return $("#" + linkClass).show();
}

function submitForm(){
 event.preventDefault();

 var method = $(this).attr("method");
 var url    = "http://localhost:3000" + $(this).attr("action");
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
    url:'http://localhost:3000/'+$(this).data().id,
    type:'delete',
    beforeSend: setRequestHeader
  }).done(function() {
    itemToRemove.remove();
  });
  // 
}


///////////////////////////////////////////////////////////////
// EDIT post
function editPost(){
  $.ajax({
    type: 'get',
    url: 'http://localhost:3000/'+$(this).data().id,
    beforeSend: setRequestHeader
  }).done(function(post){
    console.log(post)
    $("input#edit-title").val(post.post.title),
    $("input#edit-description").val(post.post.description),
    $("input#edit-url").val(post.post.url),
    $('#edit-post').slideDown()
    // $('form#edit-post').slideDown()
  });
  // Bind the clicked element to our updateUser function so that the updateUser function knows what "this" refers to when the updateUser function runs
  $('.edit-post').on('submit', updatePost.bind(this));
}

var updatePost = function(){
  event.preventDefault();
  console.log(this)
  // Get the parent element of the clicked edit anchor tag
  var postDiv = $(this).parent()
  console.log(postDiv);
  var post = {
    post:{
      title: $("input#edit-title").val(),
      description: $("input#edit-description").val(),
      url: $("input#edit-url").val()
    }
  };
  console.log(post.post)
  console.log(this)
  $.ajax({
    type: 'patch',
    url: 'http://localhost:3000/'+$(this).data().id,
    data: post.post,
    beforeSend: setRequestHeader
  }).done(function(post){
    // Empty the specific user div and rewrite the html with the updated user that gets returned from our server
    postDiv.empty();
    postDiv.prepend("<div class='post-tile'><h2>" + post.post.title + "</h2><p> " + post.post.description + "</p>"+ post.post.url + "| <br><a data-id='"+post.post._id+"' class='delete' href='#'>Delete</a> | <a href='#' class='edit' data-id='"+post.post._id+"'>Edit</a><br>" + post.post._id + "</div>");
    $('#edit-post').slideUp()
  });

}

//////////////////////////////
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
 return $.each(data.posts, function(index, post) {
   $(".posts").prepend("<div class='post-tile'><h2>" + post.title + "</h2><p> " + post.description + "</p>"+ post.url + "| <br><a data-id='"+post._id+"' class='delete' href='#'>Delete</a> | <a href='#' class='edit' data-id='"+post._id+"'>Edit</a><br>" + post._id + "</div>");
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
 $("#posts, #new-post, .logged-in").show();
 return getPosts();
}

function loggedOutState(){
 $("section, .logged-in").hide();
 $("#signup, #signin, .logged-out").show();
 return hidePosts();
}

function authenticationSuccessful(data) {
 if (data.token) setToken(data.token);
 return checkLoginState();
}

function setToken(token) {
 return localStorage.setItem("token", token)
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




/*$(init);

function init() {
  // Set up our event listeners
  $("form").on("submit", submitForm);
  // $("form#new-project").on("submit", createProject);
  //$("#user-form-button" ).on("click", toggleUserForm);
  //$("#user-index-button" ).on("click", toggleShowUsers);
  // Use event delegation to allow for dynamically created elements
  //$("body").on("click", ".delete", removeUser);
  //$('body').on('click', '.show', showUserProfile)
  //$('body').on('click', '.edit', editUser);

}

// GENERIC FUNCTION TO SEND THE FORM INPUT

function submitForm(){
 event.preventDefault();

 var method = $(this).attr("method");
 var url    = "http://localhost:3000" + $(this).attr("action");
 var data   = $(this).serialize();
  
  console.log(method + url + data);

 return ajaxRequest(method, url, data, authentcationSuccessful);
}

//

function authenticationSuccessful(data) {
 if (data.token) setToken(data.token);
 return checkLoginState();
}

// 

function setRequestHeader(xhr, settings) {
 var token = getToken();
 if (token) return xhr.setRequestHeader('Authorization','Bearer ' + token);
}

// GENERIC FORM SUBMISSION AJAX FUNCTION

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

// Use JQuery animation functions to hide/show elements 
// TOGGLE INDEX PAGE

 function toggleShowUsers(){
  $("#show").slideUp("slow");
  $("#projects").slideUp("slow");
  setTimeout(function(){
    $("#show").html(" ");
    $("#projects").html(" ");
    $('#users').slideDown()
  }, 600);
}

/*

// GET ALL USERS

function getUsers(){
  var ajax = $.get('http://localhost:3000')
  .done(function(data){
    console.log(data)
    $.each(data, function(index, user){
      addUser(user);
    });
  });
}



// CREATE USER

function toggleUserForm(){
  $("form#new-post").slideToggle("slow");
}

function createUser(){
  event.preventDefault();

  $.ajax({
    url:'http://localhost:3000',
    type:'post',
    data: { user: {
      "name": $("input#name").val(),
      "github": $("input#github").val(),
      "image": $("input#image").val(),
      "bio": $("input#bio").val(),
      "portfolio": $("input#portfolio").val()
    }}
  }).done(function(data) {
    addUser(data);
    toggleUserForm();
    $("input#name").val(null),
    $("input#github").val(null),
    $("input#image").val(null),
    $("input#bio").val(null),
    $("input#portfolio").val(null)
  });
}

// ADD A USER TO PAGE

//function addUser(user){
//  $("#users").prepend("<div class='user-tile'><h2>" + user.name + "</h2><p> " + user.bio + "</p><a href='https://github.com/"+ user.github +"'>Github</a> | <a href='"+ user.portfolio +"'>Portfolio</a><a data-id='"+user._id+"' class='delete' href='#'>Delete</a> | <a data-id='"+user._id+"' class='show' href='#'>Show</a> | <a href='#' class='edit' data-id='"+user._id+"'>Edit</a></div>");
//}

// REMOVE USER

function removeUser(){
  event.preventDefault();
  var itemToRemove = $(this).parent();
  $.ajax({
    url:'http://localhost:3000/'+$(this).data().id,
    type:'delete'
  }).done(function() {
    itemToRemove.remove();
  });
  // 
}

// SHOW USER

function showUserProfile(){
  $('#users').slideUp();
  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/'+$(this).data().id
  }).done(function(user){
    $('#show').prepend("<div class='user-tile' data-id="+ user._id +"><h2 id='username'>" + user.name + "</h2><p> " + user.bio + "</p><a href='https://github.com/"+ user.github +"'>Github</a> | <a href='"+ user.portfolio +"'>Portfolio</a></div>");
    $.each(user.projects, function(index, project){
      addProject(project)
    })
    $("#projects").append("<div class='project-tile'><h2><a id='addProject' href='#'>Add a project +</a></h2></div>")
    setTimeout(function(){
      $('#show').slideDown()
      $('#projects').slideDown()
    }, 600);
  });
}

// EDIT USER

function editUser(){
  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/'+$(this).data().id
  }).done(function(user){
    $("input#edit-title").val(user.title),
    $("input#edit-description").val(user.description),
    $("input#edit-url").val(user.title),
    $('form#edit-post').slideDown()
  });
  // Bind the clicked element to our updateUser function so that the updateUser function knows what "this" refers to when the updateUser function runs
  $('#edit-post').on('submit', updateUser.bind(this));
}

var updateUser = function(){
  event.preventDefault();
  // Get the parent element of the clicked edit anchor tag
  var userDiv = $(this).parent()
  var user = {
    user:{
      name: $("input#edit-title").val(),
      bio: $("input#edit-description").val(),
      github: $("input#edit-url").val(),
    }
  };
  $.ajax({
    method: 'patch',
    url: 'http://localhost:3000/'+$(this).data().id,
    data: user
  }).done(function(updatedUser){
    // Empty the specific user div and rewrite the html with the updated user that gets returned from our server
    userDiv.empty();
    userDiv.prepend("<h2>" + updatedUser.name + "</h2><p> " + updatedUser.bio + "</p><a href='https://github.com/"+ updatedUser.github +"'>Github</a> | <a href='"+ updatedUser.portfolio +"'>Portfolio</a><br><a data-id='"+updatedUser._id+"' class='delete' href='#'>Delete</a> | <a data-id='"+updatedUser._id+"' class='show' href='#'>Show</a> | <a href='#' class='edit' data-id='"+updatedUser._id+"'>Edit</a>");
  });
}

// ADD PROJECT

function toggleAddProject(){
  $("form#new-project").slideToggle("slow");
}

function createProject(){
  event.preventDefault();
  $.ajax({
    url:'http://localhost:3000/projects',
    type:'post',
    data: { project: {
      "title": $("input#project-title").val(),
      "description": $("input#project-description").val(),
      "github": $("input#project-github").val(),
      "website": $("input#project-website").val(),
      "user" : $('#username').html()
    }
  }
  }).done(function(project) {
    addProject(project)
    toggleAddProject();
    $("input#project-title").val(null),
    $("input#project-description").val(null),
    $("input#project-github").val(null),
    $("input#project-website").val(null)
  });
}

function addProject(project){
  $('#projects').prepend("<div class='project-tile'><h2>"+ project.title +"</h2><p>"+ project.description +"</p><a href='https://github.com/"+ project.github +"'>Github</a> | <a href='"+ project.website +"'>Website</a></div>")
}
*/
$(document).ready(function(){
  getUsers();
  // Set up our event listeners
  $("form#new-user").on("submit", createUser);
  $("form#new-project").on("submit", createProject);
  $("#user-form-button" ).on("click", toggleUserForm);
  $("#user-index-button" ).on("click", toggleShowUsers);
  // Use event delegation to allow for dynamically created elements
  $("body").on("click", ".delete", removeUser);
  $('body').on('click', '.show', showUserProfile)
  $('body').on('click', '.edit', editUser);
  $('body').on('click', '#addProject', toggleAddProject);
});

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

// GET ALL USERS

function getUsers(){
  var ajax = $.get('http://localhost:3000/users')
  .done(function(data){
    console.log(data)
    $.each(data, function(index, user){
      addUser(user);
    });
  });
}

// CREATE USER

function toggleUserForm(){
  $("form#new-user").slideToggle("slow");
}

function createUser(){
  event.preventDefault();

  $.ajax({
    url:'http://localhost:3000/users',
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

function addUser(user){
  $("#users").prepend("<div class='user-tile'><h2>" + user.name + "</h2><p> " + user.bio + "</p><a href='https://github.com/"+ user.github +"'>Github</a> | <a href='"+ user.portfolio +"'>Portfolio</a><a data-id='"+user._id+"' class='delete' href='#'>Delete</a> | <a data-id='"+user._id+"' class='show' href='#'>Show</a> | <a href='#' class='edit' data-id='"+user._id+"'>Edit</a></div>");
}

// REMOVE USER

function removeUser(){
  event.preventDefault();
  var itemToRemove = $(this).parent();
  $.ajax({
    url:'http://localhost:3000/users/'+$(this).data().id,
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
    url: 'http://localhost:3000/users/'+$(this).data().id
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
    url: 'http://localhost:3000/users/'+$(this).data().id
  }).done(function(user){
    $("input#edit-name").val(user.name),
    $("input#edit-github").val(user.github),
    $("input#edit-bio").val(user.bio),
    $("input#edit-portfolio").val(user.portfolio)
    $('form#edit-user').slideDown()
  });
  // Bind the clicked element to our updateUser function so that the updateUser function knows what "this" refers to when the updateUser function runs
  $('#edit-user').on('submit', updateUser.bind(this));
}

var updateUser = function(){
  event.preventDefault();
  // Get the parent element of the clicked edit anchor tag
  var userDiv = $(this).parent()
  var user = {
    user:{
      name: $("input#edit-name").val(),
      bio: $("input#edit-bio").val(),
      github: $("input#edit-github").val(),
      portfolio: $("input#edit-portfolio").val()
    }
  };
  $.ajax({
    method: 'patch',
    url: 'http://localhost:3000/users/'+$(this).data().id,
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
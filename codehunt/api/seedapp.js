var mongoose = require("mongoose");

var databaseURL = 'mongodb://localhost/codehunt';
mongoose.connect(databaseURL);

var Post = require("./models/post"); 
var User    = require("./models/user");

var user1 = new User({
  userName: "Matteobikk90",
  firstName: "Matteo",
  lastName: "Soresini",
  email: "matteo.soresini@hotmail.it",
  password:"ccc"
})

user1.save(function(err, user) {
 if (err) return console.log(err);
 console.log("User saved! ", user);
})

/* var user1 = new User({
  userName: "Matteobikk90",
  firstName: "Matteo",
  lastName: "Soresini",
  email: "matteo.soresini@hotmail.it",
  password:"ccc"
})

user1.save(function(err, user) {
 if (err) return console.log(err);
 console.log("User saved! ", user);
})

var user1 = new User({
  userName: "Matteobikk90",
  firstName: "Matteo",
  lastName: "Soresini",
  email: "matteo.soresini@hotmail.it",
  password:"ccc"
})

user1.save(function(err, user) {
 if (err) return console.log(err);
 console.log("User saved! ", user);
})*/

var post1 = new Post({
  title: "Create PDF Files With JavaScript – jsPDF",
  description: "PDF files that are created online usually make use of the server-side languages (and their extensions/libraries for PDF). jsPDF, a free JavaScript library, doesn't need any server-side script and can create PDF files on the client-side.",
  url: "http://webresourcesdepot.com/create-pdf-files-with-javascript-jspdf/",
  category: "",
  language: ""
})

post1.save(function(err, post) {
 if (err) return console.log(err);
 console.log("Post saved! ", post);
})

var post2 = new Post({
  title: "20 Companies to Help You Start a Website in 2016",
  description: "A website has become a necessity rather than a luxury these days. No matter how big or small your business, it should have a solid online presence. Before dealing with any company or trying its services, a smart user commonly does a bit of research on the web with the purpose of learning more about your business, products and services. Providing people with easy-to-reach online marketing material is the key to creating and developing long-lasting relationships with new customers.",
  url: "http://webresourcesdepot.com/20-companies-to-help-you-start-a-website-in-2016/",
  category: "",
  language: ""
})

post2.save(function(err, post) {
 if (err) return console.log(err);
 console.log("Post saved! ", post);
})

var post3 = new Post({
  title: "Codester: Buy & Sell High-Quality Project Assets",
  description: "As designers and developers, we know how important high-quality project assets are to ensuring that our work is top-notch. After all, nothing sets a project apart from the rest better than the perfect theme, graphic, script or plugin.
The problem is, it’s often hard to find a place you can trust that offers the tools we need to succeed. That’s where Codester comes in for the win.",
  url: "http://speckyboy.com/2016/02/01/codester/",
  category: "",
  language: ""
})

post3.save(function(err, post) {
 if (err) return console.log(err);
 console.log("Post saved! ", post);
})

var post4 = new Post({
  title: "Spectacle",
  description: "Ken Wheeler sent in Spectacle (GitHub: FormidableLabs/spectacle, License: MIT, spectacle), a React-powered presentation library.
With Spectacle you can write slides with JSX. It supports tags like <Deck>, <Slide>, and there are even layout tags for making text appear in the right place without too much fiddling about with CSS.",
  url: "http://stack.formidable.com/spectacle/#/?_k=ejw6b8",
  category: "",
  language: ""
})

post4.save(function(err, post) {
 if (err) return console.log(err);
 console.log("Post saved! ", post);
})

var post5= new Post({
 title: "Writing Next Generation Reusable JavaScript Modules in ECMAScript 6",
  description: "Are you excited to take advantage of new JavaScript language features but not sure where to start, or how? You're not alone! I've spent the better part of the last year and a half trying to ease this pain. During that time there have been some amazing quantum leaps in JavaScript tooling.",
  url: "https://www.smashingmagazine.com/",
  category: "",
  language: ""
})

post5.save(function(err, post) {
 if (err) return console.log(err);
 console.log("Post saved! ", post);
})

var post6 = new Post({
  title: "Is The Internet Killing Creativity?",
  description: "The internet is a wonderful place (mostly). An unprecedented revolution in communication, it continues to empower more people to publish and share their knowledge than any other phenomenon in history. It is a limitless playground of ideas and unbridled creativity.
Or is it?",
  url: "https://www.smashingmagazine.com/2016/01/is-the-internet-killing-creativity/",
  category: "",
  language: ""
})

post6.save(function(err, post) {
 if (err) return console.log(err);
 console.log("Post saved! ", post);
})

var post7 = new Post({
 title: "Extending Native Prototypes in Node.js",
  description: "As someone who was on the legendary MooTools JavaScript team, I have some affection for extending the prototypes of native objects.  Of course the practice of extending prototypes is taboo these days as browser vendors are iterating and implementing new specs more quickly than the IE6 era, but extending natives in Node.js could be considered safer as, in theory, we have more control over the environment (Node.js version).",
  url: "https://davidwalsh.name/extend-prototypes",
  category: "",
  language: ""
})

post7.save(function(err, post) {
 if (err) return console.log(err);
 console.log("Post saved! ", post);
})

var post8 = new Post({
 title: "How GitHub Can Help You To Improve As A Web Developer",
  description: "Just like everybody else at some point, I knew GitHub was a way to gain access to open source projects. It was the place which allowed me to grab the necessary files for my websites, read the documentations or raise issues. During the past 2 years I have discovered it is in fact a fantastic tool to learn and keep growing as a developer.",
  url: "http://www.onextrapixel.com/2016/01/26/how-github-can-help-you-to-improve-as-a-web-developer/",
  category: "",
  language: ""
})

post8.save(function(err, post) {
 if (err) return console.log(err);
 console.log("Post saved! ", post);
})

/*var post9 = new Post({
 title: "",
  description: "",
  url: "",
  category: "",
  language: ""
})

post9.save(function(err, post) {
 if (err) return console.log(err);
 console.log("Post saved! ", post);
})

var post10 = new Post({
 title: "",
  description: "",
  url: "",
  category: "",
  language: ""
})

post10.save(function(err, post) {
 if (err) return console.log(err);
 console.log("Post saved! ", post);
})*/
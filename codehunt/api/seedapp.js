var mongoose = require("mongoose");
var databaseURL = 'mongodb://localhost/codehunt';
mongoose.connect(databaseURL);
var Post = require("./models/post"); 
var User    = require("./models/user");

var user1 = new User({
  local: {
    username: "Matteobikk90",
    firstName: "Matteo",
    lastName: "Soresini",
    email: "matteo.soresini@hotmail.it",
    password:"$2a$08$FEIhGwsox0sjkwOwu9ASDu7yJ.5fis14Sh2ekFHZMclkA1UW6nzoq"
  },
image:"http://i.imgur.com/DrMccBI.jpg"
})

user1.save(function(err, user) {
 if (err) return console.log(err);
 console.log("User saved! ", user);
var post1 = new Post({
  title: "Create PDF Files With JavaScript – jsPDF",
  description: "PDF files that are created online usually make use of the server-side languages (and their extensions/libraries for PDF). jsPDF, a free JavaScript library, doesn't need any server-side script and can create PDF files on the client-side.",
  url: "http://webresourcesdepot.com/create-pdf-files-with-javascript-jspdf/",
  category: "Tutorial",
  language: "JavaScript",
  user: user._id
})
post1.save(function(err, post) {
 if (err) return console.log(err);
 console.log("Post saved! ", post);
 user.posts.push(post._id)
 user1.save()
})
var post2 = new Post({
  title: "20 Companies to Help You Start a Website in 2016",
  description: "A website has become a necessity rather than a luxury these days. No matter how big or small your business, it should have a solid online presence. Before dealing with any company or trying its services, a smart user commonly does a bit of research on the web with the purpose of learning more about your business, products and services. Providing people with easy-to-reach online marketing material is the key to creating and developing long-lasting relationships with new customers.",
  url: "http://webresourcesdepot.com/20-companies-to-help-you-start-a-website-in-2016/",
  category: "Article",
  language: "Other",
  user: user._id
})
post2.save(function(err, post) {
 if (err) return console.log(err);
 console.log("Post saved! ", post);
 user.posts.push(post._id)
 user1.save()
})
var post3 = new Post({
  title: "Codester: Buy & Sell High-Quality Project Assets",
  description: "As designers and developers, we know how important high-quality project assets are to ensuring that our work is top-notch. After all, nothing sets a project apart from the rest better than the perfect theme, graphic, script or plugin. The problem is, it’s often hard to find a place you can trust that offers the tools we need to succeed. That’s where Codester comes in for the win.",
  url: "http://speckyboy.com/2016/02/01/codester/",
  category: "Article",
  language: "Other",
  user: user._id
})
post3.save(function(err, post) {
 if (err) return console.log(err);
 console.log("Post saved! ", post);
 user.posts.push(post._id)
 user1.save()
})
var post4 = new Post({
  title: "Spectacle",
  description: "Ken Wheeler sent in Spectacle (GitHub: FormidableLabs/spectacle, License: MIT, spectacle), a React-powered presentation library. With Spectacle you can write slides with JSX. It supports tags like <Deck>, <Slide>, and there are even layout tags for making text appear in the right place without too much fiddling about with CSS.",
  url: "http://stack.formidable.com/spectacle/#/?_k=ejw6b8",
  category: "Article",
  language: "Other",
  user: user._id
})
post4.save(function(err, post) {
 if (err) return console.log(err);
 console.log("Post saved! ", post);
 user.posts.push(post._id)
 user1.save()
})
})

var user2 = new User({
    local: {
  username: "EmmaJ",
  firstName: "Emma",
  lastName: "Jones",
  email: "hi@emmajonesy.com",
  password:"$2a$08$FEIhGwsox0sjkwOwu9ASDu7yJ.5fis14Sh2ekFHZMclkA1UW6nzoq"
},
  image:"http://i.imgur.com/ku784Hd.jpg"
})
user2.save(function(err, user) {
 if (err) return console.log(err);
 console.log("User saved! ", user);
var post5= new Post({
  title: "Writing Next Generation Reusable JavaScript Modules in ECMAScript 6",
  description: "Are you excited to take advantage of new JavaScript language features but not sure where to start, or how? You're not alone! I've spent the better part of the last year and a half trying to ease this pain. During that time there have been some amazing quantum leaps in JavaScript tooling.",
  url: "https://www.smashingmagazine.com/",
  category: "Article",
  language: "JavaScript",
  user: user._id
})
post5.save(function(err, post) {
 if (err) return console.log(err);
 console.log("Post saved! ", post);
 user.posts.push(post._id)
 user2.save()
})
var post6 = new Post({
  title: "Is The Internet Killing Creativity?",
  description: "The internet is a wonderful place (mostly). An unprecedented revolution in communication, it continues to empower more people to publish and share their knowledge than any other phenomenon in history. It is a limitless playground of ideas and unbridled creativity. Or is it?",
  url: "https://www.smashingmagazine.com/2016/01/is-the-internet-killing-creativity/",
  category: "Article",
  language: "Other",
  user: user._id
})
post6.save(function(err, post) {
 if (err) return console.log(err);
 console.log("Post saved! ", post);
 user.posts.push(post._id)
 user2.save()
})
var post7 = new Post({
 title: "Extending Native Prototypes in Node.js",
  description: "As someone who was on the legendary MooTools JavaScript team, I have some affection for extending the prototypes of native objects.  Of course the practice of extending prototypes is taboo these days as browser vendors are iterating and implementing new specs more quickly than the IE6 era, but extending natives in Node.js could be considered safer as, in theory, we have more control over the environment (Node.js version).",
  url: "https://davidwalsh.name/extend-prototypes",
  category: "Article",
  language: "JavaScript",
  user: user._id
})
post7.save(function(err, post) {
 if (err) return console.log(err);
 console.log("Post saved! ", post);
 user.posts.push(post._id)
 user2.save()
})
var post8 = new Post({
 title: "How GitHub Can Help You To Improve As A Web Developer",
  description: "Just like everybody else at some point, I knew GitHub was a way to gain access to open source projects. It was the place which allowed me to grab the necessary files for my websites, read the documentations or raise issues. During the past 2 years I have discovered it is in fact a fantastic tool to learn and keep growing as a developer.",
  url: "http://www.onextrapixel.com/2016/01/26/how-github-can-help-you-to-improve-as-a-web-developer/",
  category: "Article",
  language: "Other",
  user: user._id
})
post8.save(function(err, post) {
 if (err) return console.log(err);
 console.log("Post saved! ", post);
 user.posts.push(post._id)
 user2.save()
})
var post9 = new Post({
 title: "Workshop: Responsive Design – Front-End Tips, Tricks & Techniques",
  description: "In this full-day workshop, Vitaly Friedman (editor-in-chief of Smashing Magazine), will present practical front-end techniques, clever tricks and useful strategies you need to be aware of when working on any responsive design project. Most techniques are borrowed from mid-size and large-scale real-life projects, such as large eCommerce projects, online magazines and Web applications.",
  url: "http://lanyrd.com/2016/workshop-responsive-design-front-end-tips-tricks-2/",
  category: "event",
  language: "HTML",
  user: user._id
})
post9.save(function(err, post) {
 if (err) return console.log(err);
 console.log("Post saved! ", post);
 user.posts.push(post._id)
 user2.save()
})
var post10 = new Post({
 title: "HTML",
  description: "The language for building web pages",
  url: "http://www.w3schools.com/",
  category: "Tutorial",
  language: "HTML",
  user: user._id
})
post10.save(function(err, post) {
 if (err) return console.log(err);
 console.log("Post saved! ", post);
 user.posts.push(post._id)
 user2.save() 
})
var post11 = new Post({
 title: "Workshop: Smart eCommerce Checkout Design Patterns",
  description: "In the end, it’s all about check-outs and conversion rates, isn’t it? In this workshop, we’ll look closely into practical techniques and strategies on improving conversion with better form design — using modern technologies and innovative examples. The workshop will be based on case-studies and real data derived from studies and actual projects: no fluff, no theory, just what worked (or failed, and why) in real-life projects.",
  url: "http://lanyrd.com/2016/workshop-smart-ecommerce-checkout-design-patterns/",
  category: "Event",
  language: "HTML",
  user: user._id
})
post11.save(function(err, post) {
 if (err) return console.log(err);
 console.log("Post saved! ", post);
 user.posts.push(post._id)
 user2.save()
})
var post12 = new Post({
 title: "Future of Web Design London",
  description: "We proudly bring you the 10th annual Future of Web Design, London. #FOWD is THE conference for web designers and developers who want to be on top of their game in UX, usability, responsive design, CSS and front-end development. With a healthy blend of inspirational sessions and practical advice, #FOWD is the the design and developer event to take your skills to the next level and meet like-minded individuals ready to make the web awesome together. Tickets for Future of Web Design, London go on sale in a few months! Fill in the form below to get notified.",
  url: "http://lanyrd.com/2016/fowd/",
  category: "Event",
  language: "CSS",
  user: user._id
})
post12.save(function(err, post) {
 if (err) return console.log(err);
 console.log("Post saved! ", post);
 user.posts.push(post._id)
 user2.save() 
})
})
var user3 = new User({
  local: {
  username: "vmadlani",
  firstName: "Vivek",
  lastName: "Madlani",
  email: "vivek.madlani@gmail.com",
  password:"$2a$08$FEIhGwsox0sjkwOwu9ASDu7yJ.5fis14Sh2ekFHZMclkA1UW6nzoq"
},
  image:"http://i.imgur.com/Lmw8wwF.jpg"
})
user3.save(function(err, user) {
 if (err) return console.log(err);
 console.log("User saved! ", user);
var post13 = new Post({
 title: "PSD2HTML",
  description: " Responsive Website Development. We build responsive websites that look beautiful and perform flawlessly across multiple devices.",
  url: "https://www.psd2html.com/",
  category: "Product",
  language: "CSS",
  user: user._id
})
post13.save(function(err, post) {
 if (err) return console.log(err);
 console.log("Post saved! ", post);
 user.posts.push(post._id)
 user3.save() 
})
var post14 = new Post({
 title: "Samsung",
  description: "We can make music which you can both laugh and cry to at the same time.",
  url: "http://www.samsung.com/se/circleofsound/",
  category: "Product",
  language: "Other",
  user: user._id
})
post14.save(function(err, post) {
 if (err) return console.log(err);
 console.log("Post saved! ", post);
 user.posts.push(post._id)
 user3.save() 
})
var post15 = new Post({
 title: "Generate New York 2016: an amazing day for web designers.",
  description: "Generate is the conference for web designers and developers, presented by net magazine and Creative Bloq. The next amazing Generate event will take place on 22 April 2016, at the New World Stages in New York. And we are delighted to announce that tickets for Generate New York are on sale now! ",
  url: "http://www.creativebloq.com/generate-new-york-2016-amazing-day-web-designers",
  category: "Article",
  language: "HTML",
  user: user._id
})
post15.save(function(err, post) {
 if (err) return console.log(err);
 console.log("Post saved! ", post);
 user.posts.push(post._id)
 user3.save()
})
var post16 = new Post({
 title: "How to organize a conference",
  description: "Here are seven things you have to prepare if you want to start your own design event.",
  url: "http://www.creativebloq.com/business/how-organize-conference-21619080",
  category: "Article",
  language: "Other",
  user: user._id
})
post16.save(function(err, post) {
 if (err) return console.log(err);
 console.log("Post saved! ", post);
 user.posts.push(post._id)
 user3.save()
})
var post17 = new Post({
 title: "30 brilliantly designed 404 error pages",
  description: "Clicking on a broken link is a pain, but a witty and well-designed error page at least sweetens the pill. Here are some designs to inspire you.",
  url: "http://www.creativebloq.com/web-design/best-404-pages-812505",
  category: "Article",
  language: "HTML",
  user: user._id
})
post17.save(function(err, post) {
 if (err) return console.log(err);
 console.log("Post saved! ", post);
 user.posts.push(post._id)
 user3.save()
})
var post18 = new Post({
 title: "WEB DESIGN TIPS The web designer's guide to flexbox.",
  description: "Wes Bos explains how to create better CSS grid systems to easily centre, align, scale and reorder elements on your web page.",
  url: "http://www.creativebloq.com/web-design/solve-layout-problems-flexbox-21619093",
  category: "Article",
  language: "CSS",
  user: user._id
})
post18.save(function(err, post) {
 if (err) return console.log(err);
 console.log("Post saved! ", post);
 user.posts.push(post._id)
 user3.save()
})
var post19 = new Post({
 title: "Master HTML typography in email",
  description: "How to implement HTML typography that will render across email and webmail clients.",
  url: "http://www.creativebloq.com/web-design/master-html-typography-email-21619081",
  category: "Tutorial",
  language: "HTML",
  user: user._id
})
post19.save(function(err, post) {
 if (err) return console.log(err);
 console.log("Post saved! ", post);
 user.posts.push(post._id)
 user3.save()
})
var post20 = new Post({
 title: "Dive into the world of coding with this interactive bootcamp",
  description: "This 12-week crash course in coding will cost you under $40.",
  url: "http://www.creativebloq.com/web-design/dive-world-coding-interactive-bootcamp-21619055",
  category: "Article",
  language: "Other",
  user: user._id
})
post20.save(function(err, post) {
 if (err) return console.log(err);
 console.log("Post saved! ", post);
 user.posts.push(post._id)
 user3.save()
})
})

var user4 = new User({
  local: {
    username: "WDI-17",
    firstName: "WDI London 17",
    lastName: "Team Console",
    email: "wdi17@mail.com",
    password:"$2a$08$FEIhGwsox0sjkwOwu9ASDu7yJ.5fis14Sh2ekFHZMclkA1UW6nzoq"
  },
image:"http://i.imgur.com/DrMccBI.jpg"
})

user4.save(function(err, user) {
 if (err) return console.log(err);
 console.log("User saved! ", user);
var post21 = new Post({
  title: "Ruby Array methods cheat sheet",
  description: "from tutorials point",
  url: "http://www.tutorialspoint.com/ruby/ruby_arrays.html",
  category: "Tutorial",
  language: "Ruby",
  user: user._id
})
post21.save(function(err, post) {
 if (err) return console.log(err);
 console.log("Post saved! ", post);
 user.posts.push(post._id)
 user4.save()
})
var post22 = new Post({
  title: "Handy Sublime Packages",
  description: "AutoSpell, ColorPiker, BracketHighlighter, CSSFontFamily, To see all possible CSS attributes, use ctrl+space",
  url: "https://packagecontrol.io/",
  category: "Product",
  language: "Other",
  user: user._id
})
post22.save(function(err, post) {
 if (err) return console.log(err);
 console.log("Post saved! ", post);
 user.posts.push(post._id)
 user4.save()
})
var post23 = new Post({
  title: "Good tutorial on mongoose",
  description: "step by ste guide with a great worked example",
  url: "http://mongoosejs.com/docs/populate.html",
  category: "Tutorial",
  language: "Other",
  user: user._id
})
post23.save(function(err, post) {
 if (err) return console.log(err);
 console.log("Post saved! ", post);
 user.posts.push(post._id)
 user4.save()
})
var post24 = new Post({
  title: "Basic tutorial on devise here",
  description: "step by step guide to installing the gem and embedding it into a rails app",
  url: "http://guides.railsgirls.com/devise/",
  category: "Tutorial",
  language: "Ruby",
  user: user._id
})
post24.save(function(err, post) {
 if (err) return console.log(err);
 console.log("Post saved! ", post);
 user.posts.push(post._id)
 user4.save()
})
})

# Project 3: Building Your Own API

### Technologies Used
- [Mongo](https://www.mongodb.org/)
- [Express](http://expressjs.com/)
- [Passport](http://passportjs.org/)
- [Node](https://nodejs.org/en/)
- JavaScript
- jQuery
- HTML
- CSS
- [Bootstrap](http://getbootstrap.com/)
- AJAX

### Approach
The project was split into a seperate app for the front-end and the api. Within the front end we had four pages for home, profile, categories and languages. Each page required authentication logic as well as AJAX to communicate with the Node.js API. Forms were used to add and edit data for both users and posts to the MongoDB database. The API was set up using Node.js and express. We used two models, user and post which were linked using referencing. Additional complexity was introduced with liking posts which needed to be added to the post model, and reference the user model. The front end was styling to be clean and simple, using bootstrap and AJAX/jQuery to hide and show elements. As part of the styling we wanted to restrict visibility of the edit/delete buttons and like/dislike buttons depending on whether the user was logged in or if the post/profile belonged to the user.   

We spent a lot of time planning and carefully assigining scores to each user story using pivotal before diving the user stories between team members. We chose to map specific user stories to the areas of development each team member was weakest at. By tuesday afternoon we had met our MVP and were then in a position to identify and fix bugs, and begin working on the nice to haves and styling. 

### User Stories
- [Pivotal](https://www.pivotaltracker.com/n/projects/1525639)

### Wireframes
![img_9753_1024](https://cloud.githubusercontent.com/assets/15804594/12819270/5c8201d4-cb52-11e5-85d4-23edde26baae.jpg)
![img_9754_1024](https://cloud.githubusercontent.com/assets/15804594/12819285/668b18aa-cb52-11e5-8fec-0ec2a7481db6.jpg)

### Major Hurdles and Unsolved Problems
The first major hurdle was splitting the app into seperate front end and back end up. This created many challenges with authentication, identifying what had been clicked and storing information to be passed between pages in the front end. This was solved by using localStorage to pass tokens, user information and post information between different pages. The other major hurdle was working with code written by different people for a single application for the first time. 









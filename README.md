# imgapp2
Practise project using Node/Express/PostgreSQL/Sequelize/Angular/Heroku/S3/JSON/REST

deployed to Heroku: https://imgapp2.herokuapp.com/

This is a simple imageboard full stack single page application. Not meant to be actually used, developed while learning different technologies and how they work together. App structure doesn't follow (all) best practises. For example most of Angular app logic is in controllers instead of using a service/factory.

In this app you can for example:
- register a user account/login to your existing account
- post an image file to the server (the image is saved to Amazon S3 and linked to your user account in app's database)
- see all your images on your user account page
- add a comment to any image, either when logged in or without login (comment added then as 'Anon')
- see all users images starting from the newest on app frontpage (currently six images per page, limit parameter in url can be changed, browse through next/prev links)

You can not:
- delete an image or posted comment


Backend:
- Node.js/Express web server, mostly REST practises followed
- App is running in Heroku using its PostgreSQL database for user/image/comment data
- Posted images are saved to a bucket in Amazon S3 where they are visible for everyone. (First they were saved to local filesystem through Multer (https://www.npmjs.com/package/multer) DiskStorage, but this was changed when app was changed to use Heroku)
- Sequelize ORM is used with PostgreSQL database

Frontend:
- Angular.js is used for browser routing and views
- Bootstrap for layout with a little custom CSS
- views for frontpage, user, image and login/register forms

# my-picture-uploader
Form that allow the suer to upload a picture and enter basic profile information, and allow the user to upload a photo. 
The backend should then validate (using an API such as http://apicloud.me/apis/facerect/demo/) that the photo contains a face, and that the user's IP is in the UK (using an API https://freegeoip.net/?q=104.59.124.28)
If it is valid, the server send an email to the user confirming their account is created, otherwise display an error message

## Run
    npm install
    npm start
    
## Test
### Server side (mocha)
    grunt test:server
    
### Functional    
Run the app in on terminal

    SENDGRID_USERNAME=XXX@heroku.com SENDGRID_PASSWORD=XXX npm start

Then

#### e2e (protractor)

    npm run e2e-test 
    
First time run

    npm run update-webdriver && npm run start-webdriver
    
#### casperjs 
    npm run func-test
  

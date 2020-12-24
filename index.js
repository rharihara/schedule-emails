var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Mail = require('./api/models/mail.model'), //model loading
  bodyParser = require('body-parser');
  let cron = require('node-cron');
  
// DB connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/scheduledemail'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/mail.route'); // created route import here
routes(app); //register the route

const nodemailer = require("nodemailer");




let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'example@gmail.com',
      pass: '******'
    }
});


cron.schedule('6 17 * * *', () => {
    Mail.find({},function(err,data){
        if(err){
            console.log(err);
        }else if(data.length == 0){
            console.log("There no scheduled mail available")
        }else{
            data.filter(result=>{
                let mailOptions = {
                    from: result.from,
                    to: result.to,
                    subject: result.subject,
                    text: result.text
                };
                sendinmail(mailOptions)
          
            })
        }
    })
  });

 const sendinmail = (maildata) =>{
    transporter.sendMail(maildata, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
    
        }
    })
 }
app.listen(port);


console.log('todo list RESTful API server started on: ' + port);
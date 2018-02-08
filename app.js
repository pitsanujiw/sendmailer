const http=require('http');
const express=require('express');
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser')
const app=express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
  extended: true
}));
 
// Home page
app.get('/',function(req,res){
    res.sendfile('index.html');
        console.log('NodeMailer reading console log...' + req.url);

});
 
// sending mail function
app.post('/send', function(req, res){
if(req.body.email == "" || req.body.subject == "") {
  res.send("Error: Email & Subject should not blank");
  return false;
}

   // Sending Emails with SMTP, Configuring SMTP settings

    var smtpTransport = nodemailer.createTransport("SMTP",{
             host: "host", // hostname
    secureConnection: true, // use SSL
    port: port, // port for secure SMTP
            auth: {
                 user: 'user',
                 pass: 'password'
            }
        });
        var mailOptions = {
            from: "Auto Send mail <user@user.com>", // sender address
            to: req.body.email, // email receivers
            subject: req.body.subject+" Hi!", // Subject line
            html: "<b>"+req.body.description+"</b>" // html descristion
        }
        smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
             res.send("Email could not sent due to error: "+error);
        }else{
             res.send("Email has been sent successfully");
        } 
    }); 
});
 
// Starting server
const server = http.createServer(app).listen(3000, function() {
console.log("Server is Running on 127.0.0.1:" + port);

});
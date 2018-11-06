require('dotenv/config');
const express      = require('express'),
      app          = express(),
      PORT         = 8081,
      errorHandler = require('./handlers/errors'),
      randomPuppy  = require('random-puppy'),
      bodyParser   = require('body-parser'),
      sgMail = require('@sendgrid/mail');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(bodyParser.urlencoded({extended: true}));

// Email Route
app.post('/', async (req, res, next) => {
  try{
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const message = `
    <h2>Hello, Swetha.</h2>
    <h4>You've received an email from your website.</h4>
    <h5>From: ${req.body.email}</h5>
    <h5>Message:</h5>
    <p>${req.body.message}</p>
    `

    const email = {
      to: 'brokensyn779@gmail.com',
      from: 'mail@kranahandmade.com',
      subject: 'Message from Website',
      html: message,
    };
    sgMail.send(email);
    res.redirect('/')
  } catch(e) {
    next(e);
  }
});

// Index Route
app.get('/', async (req, res, next) => {
  const getPuppies = async () => {
    const puppies = []
    for(i = 0; i < 30; i++) {
      const puppy = await randomPuppy();
      puppies.push(puppy);
    }
    return puppies
  }

  const puppyList = await getPuppies();

  res.render('landing', {
    images: puppyList
  });
});

// 404 Error Generator
app.use((req, res, next) => {
  const err = new Error('Page could not be found');
  err.status = 404;
  next(err);
});

// Error Handler
app.use(errorHandler);

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
})
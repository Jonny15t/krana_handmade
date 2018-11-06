const express      = require('express'),
      app          = express(),
      PORT         = 8081,
      errorHandler = require('./handlers/errors'),
      coolImages   = require('cool-images'),
      randomPuppy  = require('random-puppy');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));

// Index Route
app.get('/', async (req, res, next) => {
  // const images = coolImages.many(400, 400, 30);

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
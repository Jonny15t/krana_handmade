const express      = require('express'),
      app          = express(),
      PORT         = 8081,
      errorHandler = require('./handlers/errors');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));

// Index Route
app.get('/', (req, res, next) => {
  res.render('landing');
});

// 404 Error Generator
app.use((req, res, next) => {
  const err = new Error('Page could not be found');
  err.status = 404;
  next(err);
});

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
})
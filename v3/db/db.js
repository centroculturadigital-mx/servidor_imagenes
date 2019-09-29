const mongoose = require('mongoose');


mongoose.connect(`mongodb://mongo:27017/jcf`, {
  useNewUrlParser: true
});

mongoose.connect(`mongodb://mongo:27017/jcf`, {
  useNewUrlParser: true
});

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Database connected. App running.'));


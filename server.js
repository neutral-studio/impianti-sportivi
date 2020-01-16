const app = require('./app');

const mongoose = require('mongoose');

const keys = require('./config/keys');


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`IMPIANTI SPORTIVI | Server started on port ${PORT}`);
})


let db = keys.MongoURI;
mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true });
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('IMPIANTI SPORTIVI | MongoDB Connected');
});
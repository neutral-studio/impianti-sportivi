const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const app = express();

const basicRouter = require('./routes/basicRouter');
const userRouter = require('./routes/userRouter');
const groupRouter = require('./routes/groupRouter');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(express.json());

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('_method'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(
    methodOverride((req, res) => {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            var method = req.body._method;
            delete req.body._method;
            return method;
        }
    })
);

app.use('/admin/groups', groupRouter);
app.use('/admin/users', userRouter);
app.use('/', basicRouter);

module.exports = app;

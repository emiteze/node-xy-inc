var express    = require('express'),
    app        = express(),
    port       = process.env.PORT || 8080,
    mongoose   = require('mongoose'),
    Task       = require('./api/models/pointsModel'),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Pointsdb', {useMongoClient: true});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/pointsRoutes');
routes(app);

app.listen(port);

console.log('points RESTful API server started on: ' + port);

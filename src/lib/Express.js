const http = require('http');
const express = require('express');
const session = require('express-session')
const auth = require('./Passport');
const passport = auth.passport;
// var routes = require('../routes/Twitter');
var app = express();
var server = http.createServer(app);
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
    secret: 'XXX'
}));

app.use(express.static(__dirname + '/public'));
// routes.configRoutes(app, server, passport);

module.exports = express => {
    // ルート（http://localhost/）にアクセスしてきたときに「Hello」を返す
    app.get('/', (req, res) => res.send('Hello'));
    app.listen(3000, () => console.log('Listening on port 3000'));
}
// http://passportjs.org/guide/twitter/
var CONSUMER_KEY = process.env.CONSUMER_KEY;
var CONSUMER_SECRET = process.env.CONSUMER_SECRET;
var passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy;

// Sessionの設定
// http://passportjs.org/guide/configure/
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(new TwitterStrategy({
        consumerKey: CONSUMER_KEY,
        consumerSecret: CONSUMER_SECRET,
        callbackURL: "http://localhost:3000/auth/twitter/callback"
    },
    function (token, tokenSecret, profile, done) {
        passport.session.id = profile.id;

        // tokenとtoken_secretをセット
        profile.twitter_token = token;
        profile.twitter_token_secret = tokenSecret;

        process.nextTick(function () {
            return done(null, profile);
        });
    }
));

module.exports = {
    passport: passport
};
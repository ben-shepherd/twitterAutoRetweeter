// Twitter credentials
var config = require('./config/config');

// Twitt API
var Twit = require('twit');
var T = new Twit(config.twitter_credentials);
// Twitter Helper
var twitterHelper = require('./libs/twitter-helper');


var queryStr = twitterHelper.createORQueryStringFromArray(config.hashtags);
var Retweeter = require('./libs/retweeter');
var retweeter = new Retweeter();
retweeter.setTwitt(T);
retweeter.setQueryString(queryStr);
retweeter.setCount(config.tweets_count);
retweeter.setIntervalMinutes(config.interval_minutes);
retweeter.setBlacklist(config.blacklist);
retweeter.init();

// Follow followers
if(config.auto_follower.enabled) {
    var twitterAutofollowBot = require('twitter-autofollow-bot');
    twitterAutofollowBot.FETCH_INTERVAL = config.auto_follower.fetch_interval;
    twitterAutofollowBot.RETRY_INTERVAL = config.auto_follower.retry_interval;
    twitterAutofollowBot.UNFOLLOW_NON_FOLLOWERS = config.auto_follower.unfollow_non_followers;
    twitterAutofollowBot.run({
        accessToken: config.twitter_credentials.access_token,
        accessTokenSecret: config.twitter_credentials.access_token_secret,
        consumerKey: config.twitter_credentials.consumer_key,
        consumerSecret: config.twitter_credentials.consumer_secret
    });
}

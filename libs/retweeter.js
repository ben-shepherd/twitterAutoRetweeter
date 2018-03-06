module.exports = function () {

    this.T;
    this.query;
    this.count;
    this.interval = 300000; // 5 minutes
    this.blacklist = [];
    this.twitterHelper;
    this.config;

    this.setTwitt = function (T) {
        this.T = T;
    };
    this.setQueryString = function (q) {
        this.query = q;
    };
    this.setCount = function (c) {
        this.count = c;
    };
    this.setIntervalMinutes = function (i) {
        this.interval = i * 60000;
    };
    this.setBlacklist = function (bl) {
        this.blacklist = bl;
    };
    this.setConfig = function (c) {
        this.config = c;
    };

    /**
     * begin retweeter
     */
    this.init = function () {

        if (typeof this.T === 'undefined') {
            throw 'Twitt API is not set';
        }
        if (typeof this.query === 'undefined') {
            throw 'query string is not set';
        }
        if (typeof this.count === 'undefined') {
            throw 'count is not set';
        }
        if (typeof this.config === 'undefined') {
            throw 'config is not set';
        }

        console.log('retweeter starting');

        this.twitterHelper = require('./twitter-helper');
        this.twitterHelper.T = this.T;
        var retweet = this.retweet;
        var self = this;


        // Begin interval
        setInterval(function () {
            retweet(self);
        }, this.interval);

        // Explicitly run once
        retweet(self);
    };

    /**
     * Search and Retweet
     * @param T
     * @param q
     * @param count
     * @param twitterHelper
     */
    this.retweet = function (self) {

        var params = {
            q: self.query,
            count: self.count,
            lang: self.language,
            result_type: self.result_type
        };

        // Search tweets
        self.twitterHelper.searchTweets(params, function (err, data, response) {

            var tweets = data.statuses;

            // Remove black list users
            tweets = self.twitterHelper.getStatusesWithTheseUsers(self.config.blacklist_users, tweets);
            console.log('Found ' + tweets.length + ' tweets after user blacklist filter');

            // Media only check
            if (self.config.media_only) {
                tweets = self.twitterHelper.getMediaStatuses(tweets);
            }

            // Filter out blacklisted words
            mediaTweets = self.twitterHelper.getStatusesWithoutTheseWords(self.blacklist, tweets);
            console.log('Found ' + tweets.length + ' tweets after blacklist filter');

            for (var i in tweets) {

                var tweet = tweets[i];

                // Follow retweeted
                if (self.config.follow_retweeted_user) {
                    self.twitterHelper.follow(tweet.user.id_str);
                }
                // Like retweeted
                if (self.config.like_retweets) {
                    self.twitterHelper.like(tweet.id_str);
                }

                // Retweet
                if (self.config.retweet) {
                    self.twitterHelper.retweet(tweet.id_str, function (err, data) {

                        if (err) {
                            console.log('Failed to retweet (' + tweet.id + '): ', err.message);
                        }
                        else {
                            console.log('Retweeted (' + tweet.id + ') Text:', tweets[i].text);
                        }
                    });
                }
            }
        });
    };
};
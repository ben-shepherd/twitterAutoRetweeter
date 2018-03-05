module.exports = function () {

    this.T,
        this.query,
        this.count,
        this.interval = 300000, // 5 minutes
        this.blacklist = [],
        this.twitterHelper,
        this.autoFollow = false,
        this.config;

        this.setTwitt = function(T) {
            this.T = T;
        },
        this.setQueryString = function(q) {
            this.query = q;
        },
        this.setCount = function(c) {
            this.count = c;
        },
        this.setIntervalMinutes = function(i) {
            this.interval = i * 60000;
        },
        this.setBlacklist = function(bl) {
            this.blacklist = bl;
        },
        this.setAutoFollow = function(af) {
            this.autoFollow = af;
        },
        this.setConfig = function(c) {
            this.config = c;
        },

        /**
         * begin retweeter
         */
        this.init = function() {

            if(typeof this.T === 'undefined') {
                throw 'Twitt API is not set';
            }
            if(typeof this.query === 'undefined') {
                throw 'query string is not set';
            }
            if(typeof this.count === 'undefined') {
                throw 'count is not set';
            }
            if(typeof this.config === 'undefined') {
                throw 'config is not set';
            }

            console.log('retweeter starting with config: ', this.config);

            this.twitterHelper = require('./twitter-helper');
            this.twitterHelper.T = this.T;
            var retweet = this.retweet;
            var self = this;


            // Begin interval
            setInterval(function() {
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
    this.retweet = function(self) {

        var params = {
            q: self.query,
            count: self.count,
            lang: self.language,
            result_type: self.result_type
        };

        self.twitterHelper.searchTweets(params, function(err, data, response) {

            var tweets;

            if(self.config.media_only) {
                tweets = twitterHelper.getMediaStatuses(data.statuses);
            }
            else {
                tweets = data.statuses;
            }
            console.log('Found ' + tweets.length + ' tweets');

            mediaTweets = self.twitterHelper.getStatusesWithoutTheseWords(self.blacklist, tweets);
            console.log('Found ' + tweets.length + ' tweets after blacklist filter');


            for (var i in tweets) {

                var tweet = tweets[i];

                self.twitterHelper.retweet(tweet.id_str, function (err, data) {

                    if(self.autoFollow) {
                        self.twitterHelper.follow(tweet.user.id_str);
                    }

                    if (err) {
                        console.log('Failed to retweet (' + tweet.id + '): ', err.message);
                    }
                    else {
                        console.log('Retweeted (' + tweet.id + ') Text:', tweets[i].text);
                    }
                });
            }
        });
    };
};
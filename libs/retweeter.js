module.exports = function () {

    this.T,
    this.query,
    this.count,
    this.interval = 300000, // 5 minutes
    this.blacklist = [],
    this.twitterHelper,

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

        var twitterHelper = require('./twitter-helper');
        twitterHelper.T = this.T;

        var retweet = this.retweet,
            T = this.T,
            query = this.query,
            count = this.count,
            blacklist = this.blacklist;


        // Begin interval
        setInterval(function() {
            retweet(T, query, count, blacklist, twitterHelper);
        }, this.interval);

        // Explicitly run once
        retweet(T, query, count, blacklist, twitterHelper);
    };

    /**
     * Search and Retweet
     * @param T
     * @param q
     * @param count
     * @param twitterHelper
     */
    this.retweet = function(T, q, count, blacklist, twitterHelper) {

        twitterHelper.searchTweets(q, count, function(err, data, response) {

            var mediaTweets = twitterHelper.getMediaStatuses(data.statuses);
            console.log('Found ' + mediaTweets.length + ' tweets with media');
                mediaTweets = twitterHelper.getStatusesWithoutTheseWords(blacklist, mediaTweets);
            console.log('Found ' + mediaTweets.length + ' tweets after blacklist filter');

            for (var i in mediaTweets) {

                var tweet = mediaTweets[i];

                twitterHelper.retweet(tweet.id_str, function (err, data) {
                twitterHelper.follow(tweet.user.id_str);

                    if (err) {
                        console.log('Failed to retweet (' + tweet.id + '): ', err.message);
                    }
                    else {
                        console.log('Retweeted (' + tweet.id + '): URL: ' + mediaTweets[i].entities.media[0].media_url, 'Text:', mediaTweets[i].text);
                    }
                });
            }
        });
    };
};
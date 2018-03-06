/**
 * Twitt API
 * @type {null}
 */
module.exports.T = null;

/**
 * Filter statuses with media only
 * @param statuses
 * @returns {Array}
 */
module.exports.getMediaStatuses = function(statuses) {

    var tweets = [];

    for(i in statuses) {
        var tweet = statuses[i];

        if(module.exports.tweetContainsMedia(tweet)) {
            tweets.push(tweet);
        }
    }

    return tweets;
};

/**
 * Get tweets without these words
 * @param textsArray
 * @param statuses
 * @returns {Array}
 */
module.exports.getStatusesWithoutTheseWords = function(textsArray, statuses) {

    if(typeof textsArray === 'string') {
        textsArray = [textsArray];
    }

    var tweets = [];

    for(i in statuses) {
        var tweet = statuses[i];

        if(module.exports.tweetContainsTexts(textsArray, statuses[i]) == false) {
            tweets.push(tweet);
        }
    }

    return tweets;
};

module.exports.getStatusesWithTheseUsers = function(usersArray, statuses) {

    if(typeof usersArray === 'string') {
        usersArray = [usersArray];
    }

    var tweets = [];

    for(i in statuses) {
        var tweet = statuses[i];

        if(usersArray.includes(tweet.user.id) == false &&
            usersArray.includes(tweet.user.id_str) == false &&
            usersArray.includes(tweet.user.screen_name) == false) {

            tweets.push(tweet);
        }
    }

    return tweets;
};

/**
 * Check if a tweet contains media
 * @param status
 * @returns {boolean}
 */
module.exports.tweetContainsMedia = function(status) {
    return status.entities.hasOwnProperty('media');
};

/**
 * Check if a tweet contains any of the words in textsArray
 * @param textsArray array or string
 * @param status
 * @returns {boolean}
 */
module.exports.tweetContainsTexts = function(textsArray, status) {
    if(typeof textsArray === 'string') {
        textsArray = [textsArray];
    }

    for(i in textsArray) {
        if(status.text.indexOf(textsArray[i]) !== -1) {
            return true;
        }
    }

    return false;
};
/**
 * Create OR query string from array
 * Example: #hashtag1 OR #hashtag2 OR #hashtag3
 * @param dataArray
 * @returns {string|*}
 */
module.exports.createORQueryStringFromArray = function(dataArray) {
    return dataArray.join(' OR ');
};

/**
 * Search tweets
 * @param search
 * @param count
 * @param callback
 */
module.exports.searchTweets = function(params, callback) {

    module.exports.T.get('search/tweets', params, function (err, data, response) {
        callback(err, data, response);
    });
};

/**
 * Retweet a tweet
 * @param tweetId
 * @param callback
 */
module.exports.retweet = function(tweetId, callback) {
    module.exports.T.post('statuses/retweet/:id', { id: tweetId }, function (err, data, response) {
        callback(err, data, response);
    })
};

/**
 * Follow a user
 * @param userId
 * @param callback
 */
module.exports.follow = function(userId, callback) {

    console.log('Following ', userId);
    module.exports.T.post('friendships/create', {
        'user_id': userId,
        'follow': true
    }, callback);
}

/**
 * Like a tweet
 * @param tweetId
 * @param callback
 */
module.exports.like = function(tweetId, callback) {

    console.log('Liking tweet', tweetId);
    module.exports.T.post('favorites/create', {
        id: tweetId
    },callback );

}


module.exports = {

    /**
     * Twitter API credentials
     */
    twitter_credentials: {
        consumer_key:         '',
        consumer_secret:      '',
        access_token:         '',
        access_token_secret:  '',
        timeout_ms:           60*1000
    },

    /**
     * Interval between searching and retweeting
     */
    interval_minutes: 5,

    /**
     * Amount of posts to search
     */
    tweets_count: 5,

    /**
     * Hashtags to find
     */
    hashtags: [
        '#hashtag1',
        '#hashtag2'
    ],

    /**
     * Tweets containing these words will not be tweeted
     */
    blacklist: [
        'badword',
        'another bad word'
    ],

    /**
     * Configuration for auto follower
     */
    auto_follower: {
        enabled: true,
        fetch_interval: 6000,
        retry_interval: 1000,
        unfollow_non_followers: false
    }
};
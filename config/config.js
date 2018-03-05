module.exports = {

    /**
     * Twitter API credentials
     */
    twitter_credentials: {
        consumer_key:         '',
        consumer_secret:      '',
        access_token:         '',
        access_token_secret:  '',
        timeout_ms:           60*1000  // optional HTTP request timeout to apply to all requests.
    },

    /**
     * Restricts tweets to the given language, given by an ISO 639-1 code. Language detection is best-effort.
     * https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
     */
    language: 'en',

    /**
     * mixed : Include both popular and real time results in the response.
     * recent : return only the most recent results in the response
     * popular : return only the most popular results in the response.
     */
    result_type: 'recent',

    /**
     * Interval between searching and retweeting
     */
    interval_minutes: 5,

    /**
     * Amount of posts to search
     */
    tweets_count: 5,

    /**
     * Media posts only
     */
    media_only: false,

    /**
     * Search terms
     */
    search_terms: [
        'interesting topic',
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
        fetch_interval: 60000 * 10,
        retry_interval: 10000,
        unfollow_non_followers: false
    }
};
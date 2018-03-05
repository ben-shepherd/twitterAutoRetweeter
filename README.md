# Twitter Auto Retweeter
A auto retweeter and auto follower for Node.js 

## Author
Benjamin Shepherd
www.benshepherd.me

This is my first real Node.js project

## Requirements
Node.js and npm

## Installation
Clone project and run `npm install`

## Configuration

Register an application and enter your credentials below. [My Apps](https://apps.twitter.com/)

    twitter_credentials: {  
        consumer_key:         '',  
        consumer_secret:      '',  
        access_token:         '',  
        access\_token\_secret:  '',  
        timeout_ms:           60*1000  
    },

Interval in minutes for searching and retweeting

    interval_minutes: 5,

How many tweets to find. The bot will only retweet media posts from these 5 posts

    tweets_count: 5,

Search terms, doesn't necessarily need to be hashtags

    hashtags: [  
        '#hashtag1',  
        '#hashtag2'  
    ],
Tweets containing these terms will not be retweeted

    blacklist: [  
        'badword',  
        'another bad word'  
    ],

The bot includes an auto follower which will follow anyone who follows you. This can be configured and disabled below
For more information about this see the package by pilwon. [Click here](https://github.com/pilwon/node-twitter-autofollow-bot)

    auto_follower: {  
        enabled: true,  
        fetch_interval: 6000,  
        retry_interval: 1000,  
        unfollow\_non\_followers: false  
    }

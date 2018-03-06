
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
        access_token_secret:  '',    
        timeout_ms:           60*1000    
    },  


Automatically follow the user you retweeted

    follow_retweeted_user: true,  

Restricts tweets to the given language, given by an [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) code. Language detection is best-effort.  

    language: 'en',

mixed : Include both popular and real time results in the response.  
recent : return only the most recent results in the response  
popular : return only the most popular results in the response.

    result_type: 'recent',

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

Tweets containing these users will not be retweeted
Matches: id, id_str, screen_name

    blacklist_users: [

    ],

The bot includes an auto follower which will follow anyone who follows you. This can be configured and disabled below.

Package by @pilwon [Click here for more information](https://github.com/pilwon/node-twitter-autofollow-bot) 
  
    auto_follower: {    
        enabled: true,    
        fetch_interval: 6000,    
        retry_interval: 1000,    
        unfollow_non_followers: false    
    }
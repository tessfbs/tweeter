/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const $tweet = $(`<article class="tweet">Hello world</article>`);

$(document).ready(function() {
  console.log("Client.js test")
});

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const daysAgo = (date) => {
  const today = new Date();
  const postDate = new Date(date);
  console.log(postDate)
  const diffTime = Math.abs(today - postDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

const createTweetElement = function(tweet) {
let $tweet = (`
<article>
<header class="posted-tweet-header">
  <img src=${tweet.user.avatars}">
  <p>${tweet.user.name}</p>
  <p class="username-tweet">${tweet.user.handle}</p>
</header>
<p class="posted-tweet">${tweet.content.text}</p> 
<footer class="posted-tweet-footer">
  <p>${daysAgo(tweet.created_at)} ago</p> 
  <div class="tweet-icons">
    <i class="fa-solid fa-flag"></i>
    <i class="fa-solid fa-retweet"></i>
    <i class="fa-solid fa-heart"></i>
  </div>
</article>`
)
return $tweet;
}

const renderTweets = (tweets) => {
    for(let item in tweets){
  $('.all-tweets').append(createTweetElement(tweets[item])
)
}}

renderTweets(data);





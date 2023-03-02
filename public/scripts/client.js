/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const $tweet = $(`<article class="tweet">Hello world</article>`);

$(document).ready(function() { //Specify a function to execute when the DOM is fully loaded.
  console.log("Client.js test")

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
    const diffTime = Math.abs(today - postDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }
  
  const createTweetElement = function(tweet) {
    // const $article = $("<article>");
    // const $header = $("<header>");
    // const $footer = $("<footer>");
    
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

  let $tweet = (`
  <article>
  <header class="posted-tweet-header">
    <img src=${escape(tweet.user.avatars)}">
    <p>${escape(tweet.user.name)}</p>
    <p class="username-tweet">${escape(tweet.user.handle)}</p>
  </header>
  <p class="posted-tweet">${escape(tweet.content.text)}</p> 
  <footer class="posted-tweet-footer">
    <p>${escape(timeago.format('${daysAgo(tweet.created_at)}','en_US'))}</p>
  <div class="tweet-icons">
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
    $('.all-tweets').empty()
      for(let item in tweets){
    $('.all-tweets').append(createTweetElement(tweets[item])
  )
  }}
  // renderTweets(data);

  //Add a new Tweer
    $("form").on("submit", function(event) {
      event.preventDefault() // Prevent default behavior of form submission

      const data = $(this).serialize();  // converts data to query string
      console.log(data, data.length)

      //create new element with jQuery for error-messages
      let newDiv = $("<div>");
      newDiv.attr("class","error-message");
      let newIcon = $("<i>")
      newIcon.attr("class","fa-solid fa-circle-exclamation")
      let newIcon2 = $("<i>");
      newIcon2.attr("class", "fa-solid fa-circle-exclamation");
      newDiv.prepend(newIcon)
      
      if(data.length < 6){
        $(".error-message").hide()
        newDiv.append("Please enter text before submitting!")
        newDiv.append(newIcon2)
        $("form").prepend(newDiv)
        return
      }
      else if(data.length > 145){
        $(".error-message").hide()
        newDiv.append("Tweet content is too long!")
        newDiv.append(newIcon2)
        return $("form").prepend(newDiv)
      }
  
      // Send form data to the server using AJAX POST request
      $.ajax({
        url: "/tweets/",
        method: "POST",
        data: data
      })
      .then( (newTweet) => {
        console.log('Data sent successfully');
        console.log(newTweet);
        $(".error-message").hide()
        // renderTweets(newTweet);
        loadTweets();
      })
      .catch((error) => {
        console.log('Error occurred while sending data');
        console.log(error);
      });

    });
  
  // Fetch all Tweets
  const loadTweets = () => {
    $.ajax({
      url: "/tweets/",
      method: "GET",
    })
    .then( (response) => {
      console.log('Data sent successfully');
      console.log(response);
      renderTweets(response.reverse());
    })
    .catch((error) => {
      console.log('Error occurred while sending data');
      console.log(error);
    });
  }
  loadTweets();

});










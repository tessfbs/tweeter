/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const $tweet = $(`<article class="tweet">Hello world</article>`);

$(document).ready(function() { //Specify a function to execute when the DOM is fully loaded.
  console.log("Client.js test");
  
  //create a new element for posted tweets
  const createTweetElement = function(tweet) {
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    let $tweet = (`
  <article>
  <header class="posted-tweet-header">
  <div class="name-avatar">
  <img src=${escape(tweet.user.avatars)}">
  <p class="user-name">${escape(tweet.user.name)}</p>
  </div>
    <p class="username-tweet">${escape(tweet.user.handle)}</p>
  </header>
  <p class="posted-tweet">${escape(tweet.content.text)}</p> 
  <footer class="posted-tweet-footer">
    <p>${escape(timeago.format('${daysAgo(tweet.created_at)}','en_US'))}</p>
    <div class="tweet-icons">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </article>`
  )
  return $tweet;
  }
  
  //Render all tweets
  const renderTweets = (tweets) => {
    $('.all-tweets').empty();
      for (let item in tweets) {
    $('.all-tweets').append(createTweetElement(tweets[item]));
  }}

  //Add a new Tweer
    $("form").on("submit", function(event) {
      event.preventDefault() // Prevent default behavior of form submission

      const data = $(this).serialize();  // converts data to query string
      console.log(data, data.length, $("#tweet-text").val().length);

      //create new element with jQuery for error-messages
      let newDiv = $("<div>");
      newDiv.attr("class","error-message");
      let newIcon = $("<i>");
      newIcon.attr("class","fa-solid fa-circle-exclamation")
      let newIcon2 = $("<i>");
      newIcon2.attr("class", "fa-solid fa-circle-exclamation");
      newDiv.prepend(newIcon);
      
      if ($("#tweet-text").val().length < 6) {
        $(".error-message").hide();
        newDiv.append("Please enter text before submitting!");
        newDiv.append(newIcon2);
        $("form").prepend(newDiv);
        return
      }
      else if ($("#tweet-text").val().length > 140) {
        $(".error-message").hide();
        newDiv.append("Tweet content is too long!");
        newDiv.append(newIcon2);
        return $("form").prepend(newDiv);
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
        $(".error-message").hide();
        $('textarea').val("");
        $("#counter").text(140);
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

  //hide text-box when click on the arrow
  $("#pointer").click(() => {
    console.log("pointer clicked");
    $("form").slideToggle( "slow", function() {
    });
    $("#tweet-text").focus();
  });

  //create a scroll button
  let scrollbutton = $("<button>");
  let scrollIcon = $("<i>");
  scrollIcon.attr("class","fa-solid fa-circle-up fa-4x");
  scrollbutton.addClass("scroll-button") //layout.css
  scrollbutton.append(scrollIcon);
  $("body").append(scrollbutton);

  // Show or hide the button based on the scroll position
  $(window).scroll(() => {
    if ($(this).scrollTop() > 150) {
      $(".scroll-button").fadeIn();
    } else {
      $(".scroll-button").fadeOut();
    }
  });

  // Scroll to the top when the button is clicked
  $(".scroll-button").click(() => {
    $("html, body").animate({scrollTop: 0}, 1000);
    return false;
    })
});










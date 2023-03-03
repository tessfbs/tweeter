$(document).ready(function() {
  console.log('DOM is ready to be manipulated with jQuery')
});

let counterOutput = $("#counter");
let text = $("#tweet-text")
counterOutput.text(140)


$("#tweet-text").on('input', function() {
    counterOutput.text(140 - this.value.length);
    if(counterOutput.text() < 0){
      counterOutput.css("color", "red");
    } else {
      counterOutput.css("color", ""); // reset to default color if not less than 0
    }
    // console.log("Number of characters", this.value.length);
});

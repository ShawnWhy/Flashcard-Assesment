$(document).ready(function () {
  $.ajax({
    type: "get",
    url: "/api/scores",

    success: function (response) {
      console.log(response);
      setupHistory(response);
    },
  });

  function setupHistory(response) {
    console.log("setup history");
    response.forEach((score) => {
      var scorediv = $("<div>");

      scorediv.html("user: " + score.username + " score: " + score.score);
      $("#scoreBoard").append(scorediv);
    });
  }

  var questions = [
    { question: "is java the same as javascript?", answer: "no" },
    { question: "what do you use to initialize a constant?", answer: "const" },
    {
      question: "what is the identifier used by Jquery for elements' ids?",
      answer: "#",
    },
    {
      question: "what is the function to call when setting up a interval?",
      answer: "setInterval",
    },
    { question: "what is the symbol to use when calling Jquery?", answer: "$" },
  ];

  var selection = [
    ["yes", "maybe", "no", "what do I know I am a robot"],
    ["var", "let", "constant", "const"],
    ["$", "%", "&", "#"],
    ["beginInterval", "setTimeout", "setInt", "setInterval"],
    ["$", "%", "&", "#"],
  ];

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  var score = 0;
  var questionCount = 0;
  var count = 5;
  var interval;
  var rightAnswer;

  function questionSetup() {
    console.log(questionCount);
    rightAnswer = questions[questionCount].answer;

    $("#showCard").html(questions[questionCount].question);
    var newArray = shuffle(selection[questionCount]);
    $("#optionsContainer").html("");
    for (i = 0; i < newArray.length; i++) {
      let selection = $("<div>");
      selection.addClass("selection");
      selection.attr("value", newArray[i]);
      selection.html(newArray[i]);
      $("#optionsContainer").append(selection);
    }
  }

  interval = setInterval(() => {
    count--;
    $("#count").html("countdown: " + count);

    if (count <= 0) {
      count = 5;
      questionCount++;
      if (questionCount < questions.length) {
        questionSetup();
      }
      if (questionCount >= questions.length) {
        $("#submission").css("display", "block");
        clearInterval(interval);
      }
    }
  }, 1000);

  $("#submission").submit((e) => {
    $.ajax({
      type: "post",
      url: "/api/scores",
      data: { user: $("#username").val(), score: score },
      success: function (response) {
        console.log(response);
        alert("success");
      },
    });
  });

  questionSetup();

  console.log(questions);
  $(document).on("click", ".selection", (e) => {
    console.log(questions);
    console.log($(e.target).attr("value"));
    console.log(questions[questionCount].answer);
    console.log(questions[questionCount]);
    console.log(rightAnswer);
    if ($(e.target).attr("value") == rightAnswer) {
      score++;
      $("#score").html("score: " + score);

      questionCount++;
      if (questionCount < questions.length) {
        count = 5;
        questionSetup();
      }
    }
  });


});